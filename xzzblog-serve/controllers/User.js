const jwt = require("jsonwebtoken");

const UserService = require("../service/UserService");
const { genPassword } = require("../utils");
const { JWT_SECRET } = require("../config");

class User {
  static async create(ctx) {
    let { username, password, email } = ctx.request.body;

    let params = {
      username,
      password,
      email,
    };
    // 查询用户名是否重复
    const isExistUser = await UserService.username(params.username);
    if (isExistUser) {
      ctx.fail(403, "用户已经存在");
    } else {
      try {
        // 加密密码
        params.password = genPassword(password);
        // 创建用户
        await UserService.create(params);
        ctx.success("创建用户成功");
      } catch (err) {
        ctx.fail(500, "创建用户失败", err);
      }
    }
  }

  static async login(ctx) {
    const { username, password } = ctx.request.body;
    // 查询用户
    const userDetail = await UserService.username(username);
    if (!userDetail) {
      ctx.fail(403, "用户不存在");
      return false;
    }
    // 用户密码是否与数据库密码一致
    if (genPassword(password) == userDetail.password) {
      // 用户token
      const userToken = {
        username: userDetail.username,
        id: userDetail.id,
        email: userDetail.email,
      };
      // 签发token
      const token = jwt.sign(userToken, JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });
      ctx.success("登录成功", {
        ...userToken,
        token: token,
      });
    } else {
      ctx.fail(401, "用户名或密码错误");
    }
  }

  static async delete(ctx) {
    let { id } = ctx.params;
    // 检测ID的准确性
    if (!id || isNaN(id)) {
      ctx.fail(412, "请传入正确的用户ID");
      return false;
    }

    try {
      await UserService.delete(id);
      ctx.success("删除成功");
    } catch (err) {
      ctx.fail(500, "删除失败", err);
    }
  }

  static async list(ctx) {
    let { username, email, created_id, updated_id } = ctx;
    let params = {
      username,
      email,
      created_id,
      updated_id,
    };
    try {
      const data = await UserService.findAllUserList(params);
      ctx.success("获取成功", data);
    } catch (err) {
      ctx.fail(500, "获取失败", err);
    }
  }

  static async info(ctx) {
    // 获取jwt
    const token = ctx.header.authorization;
    if (!token) {
      ctx.fail(403, "Headers Token不能为空");
    }
    let payload;
    try {
      // 解密payload，获取用户名和ID
      payload = await verify(token.split(" ")[1], JWT_SECRET);
      const user = {
        id: payload.id,
        email: payload.email,
        username: payload.username,
      };
      ctx.success("查询成功！", user);
    } catch (err) {
      ctx.fail(500, "查询失败", err);
    }
  }
}
module.exports = User;
