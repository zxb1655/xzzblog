//封装返回给客户端提示成不成功的函数
function formatData({ status = 1, data = [], msg = "成功" } = {}) {
  // { status = 1, data = [], msg = '成功' } 解构默认值  {}参数默认值

  if (status === 0) {
    msg = "服务器请求失败，请检查！";
  }
  return {
    status,
    data,
    msg,
  };
}

//导出
module.exports = {
  formatData,
};
