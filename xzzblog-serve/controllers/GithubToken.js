const Axios = require("axios");
const { client_secret, client_id } = require("../config");

class Github {
  // 流程
  // 1. 注册 OAuth APP的应用
  // 2. 保存client_id client_secret
  // 3. 访问GET: https://github.com/login/oauth/authorize?client_id=c4cde05e70e67a88ea&scope=user
  // 4. 跳转 http://localhost:3000/auth?code=8b309cc23b4c403f95 保存 code 字段
  // 5. https://github.com/login/oauth/access_token POST请求 body:{client_id,client_secret,code} 获取token
  // 6. https://api.github.com/user POST请求：  body:{client_id,client_secret} header: {Authorization: token token}

  static async getToken(ctx) {
    try {
      const { code } = ctx.request.body;
      let url = "https://github.com/login/oauth/access_token";
      let params = { code, client_id, client_secret };
      const { access_token, token_type } = await ctx.post(url, params, {
        "User-Agent": "koa-http-request",
      });
      ctx.success("获取token成功", {
        access_token,
        token_type,
      });
    } catch (err) {
      ctx.fail(500, "获取失败", err);
    }
  }

  static async getUserInfo(ctx) {
    const { token_type, access_token } = ctx.request.body;
    try {
      let purl = "https://api.github.com/user";
      let params = {
        client_id,
        client_secret,
      };

      const {
        html_url: url,
        avatar_url: avatar,
        name: username,
        email,
      } = await ctx.post(purl, params, {
        "User-Agent": "koa-http-request",
        Authorization: `${token_type} ${access_token}`,
        "Content-Type": "application/json",
      });

      ctx.success("获取成功", {
        avatar,
        url,
        username,
        email,
      });
    } catch (err) {
      ctx.fail(500, "获取失败", err);
    }
  }
}

module.exports = Github;
