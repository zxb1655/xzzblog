//token验证中间件
module.exports = (options) => {
  //作为一个函数导出的好处是可自定义配置，options是为了以后扩展使用，
  //一般中间件都写成带参返回的函数

  const assert = require('http-assert'); //断言库
  const jwt = require('jsonwebtoken');

  const { PRIVATE_KEY } = require('../config');
  const AdminUser = require('../models/AdminUser');

  return async (req, res, next) => {
    //获取前端传来的token
    const token = String(req.headers.authorization || '')
      .split(' ')
      .pop();
    assert(token, 401, '请先提供token');
    //三个参数分别是 判断条件，不满足条件的状态码，不满足条件的提示信息。

    //通过私钥解码token
    const { id } = jwt.verify(token, PRIVATE_KEY);
    assert(id, 401, 'token错误');

    //根据id找用户，验证是否为伪造的token
    req.user = await AdminUser.findById(id);
    assert(req.user, 401, '用户名不存在');
    await next();
  };
};
