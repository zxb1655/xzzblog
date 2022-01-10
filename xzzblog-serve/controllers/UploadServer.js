const fs = require("fs");
const path = require("path");
const OSS = require("ali-oss");
const { timeFormat } = require("../utils");
const { url, oss } = require("../config/index");
const client = new OSS(oss);

// 递归创建目录 同步方法
function checkDirExist(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (checkDirExist(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}
// 生成新的文件名称
function getUploadFileExt(name) {
  let ext = name.split(".");
  let first = name.replace(ext[ext.length - 1], "");
  let last = timeFormat(new Date(), "yyyy-mm-dd-HH-mm-ss");
  return `${first}${last}.${ext[ext.length - 1]}`;
}
class UploadServer {
  static async upload(ctx) {
    try {
      // 上传单个文件
      const file = ctx.request.files.file; // 获取上传文件
      const { bucket } = ctx.request.body;
      // 创建可读流
      const reader = fs.createReadStream(file.path);

      //上传到阿里云oss
      let newName = getUploadFileExt(file.name);
      client.putStream(`/${bucket}/` + newName, reader);
      ctx.success("上传成功！", {
        url: `http://oss.zxb66.top/${bucket}/${newName}`,
        createTime: +new Date(),
      });

      // 上传到本地
      // let dir = path.join(__dirname, `../public/upload/${bucket}`);
      // checkDirExist(dir);
      // let filePath;
      // let newName = getUploadFileExt(file.name);
      // // 本地
      // if (ctx.request.host.indexOf("localhost") > -1) {
      //   filePath = dir + `/${newName}`;
      // } else {
      //   // 线上
      //   filePath = `${dir}/${newName}`;
      // }
      // // 创建可写流
      // const upStream = fs.createWriteStream(filePath);
      // // 可读流通过管道写入可写流
      // reader.pipe(upStream);
      // ctx.success("上传成功！", {
      //   url: `${url}/upload/${bucket}/${newName}`,
      //   createTime: +new Date(),
      // });
    } catch (err) {
      ctx.fail(500, "上传失败", err);
    }
  }
}

module.exports = UploadServer;
