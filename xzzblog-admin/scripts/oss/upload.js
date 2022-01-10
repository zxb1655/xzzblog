const fs = require('fs')
const { client } = require('./client')

function putOSS(src, dist) {
  return new Promise(async resolve => {
    try {
      await client.put(dist, src)
      resolve()
    } catch (e) {
      console.log(e)
      resolve()
    }
  })
}

function upload(src, dist) {
  var docs = fs.readdirSync(src)
  return new Promise(resolve => {
    docs.forEach(function (doc) {
      var _src = src + '/' + doc,
        _dist = dist + '/' + doc
      var st = fs.statSync(_src)
      // 判断是否为文件
      if (st.isFile() && doc !== '.DS_Store') {
        putOSS(_src, _dist)
        // console.log(_src+'是文件',_dist)
      }
      // 如果是目录则递归调用自身
      else if (st.isDirectory()) {
        // console.log(_src+'是文件夹')
        upload(_src, _dist)
      }
    })
    // console.log('上传结束');
    resolve()
  })
}

module.exports = {
  upload
}
