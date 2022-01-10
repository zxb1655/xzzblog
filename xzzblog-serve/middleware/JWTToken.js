const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const util = require("util");
const verify = util.promisify(jwt.verify);
const JWTPath = require("./JWTPath");

/**
 * 判断token是否可用
 */
module.exports = function () {
  return async function (ctx, next) {
    // 检测过滤的路由就不做解析JWT了
    let isPath = JWTPath.find((item) => {
      return item == ctx.request.url.split("?")[0];
    });
    if (isPath) {
      await next();
      return false;
    }

    try {
      // 获取jwt
      const token = ctx.header.authorization;
      if (token) {
        let payload;
        try {
          // 解密payload，获取用户名和ID
          payload = await verify(token.split(" ")[1], JWT_SECRET);
          console.info("payload", payload);
          ctx.user = {
            username: payload.username,
            email: payload.email,
            id: payload.id,
          };
          await next();
        } catch (err) {
          ctx.fail(401, "Token身份无效");
        }
      }
    } catch (err) {
      ctx.fail(401, "Token身份无效");
    }
  };
};
