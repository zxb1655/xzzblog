module.exports = (option = {}) => {
  return async (ctx, next) => {
    ctx.success = (message, data) => {
      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        message,
        data,
      };
    };
    ctx.fail = (code, message, data) => {
      ctx.response.status = code;
      ctx.body = {
        code,
        message,
        data,
      };
    };

    await next();
  };
};
