const MessageService = require("../service/MessageService");
const SendEmailServer = require("./SendEmailServer");

class Message {
  static async webcreate(ctx) {
    let {
      username,
      avatar,
      email,
      content,
      status = 3,
      pid = 0,
    } = ctx.request.body;
    let params = {
      username,
      avatar,
      email,
      content,
      status, // 1 通过 2 拒绝  3 待审核  '' 全部
      localtion: "",
      pid,
      author: username,
    };

    try {
      await MessageService.create(params);
      ctx.success("创建留言成功");
    } catch (err) {
      ctx.fail(500, "创建留言失败", err);
    }
  }

  static async create(ctx) {
    let {
      username,
      avatar,
      email,
      content,
      status = 3,
      pid = 0,
    } = ctx.request.body;

    let params = {
      username,
      avatar,
      email,
      content,
      status, // 1 通过 2 拒绝  3 待审核  '' 全部
      localtion: "",
      pid,
      author: ctx.user ? ctx.user.username : "admin",
    };

    try {
      await MessageService.create(params);
      ctx.success("创建留言成功");
    } catch (err) {
      ctx.fail(500, "创建留言失败", err);
    }
  }

  static async list(ctx) {
    let params = ctx.query;
    let data = await MessageService.list(params);
    ctx.success("查询留言成功", data);
  }

  static async weblist(ctx) {
    let params = ctx.query;
    const data = await MessageService.weblist(params);
    ctx.success("查询留言成功。", data);
  }

  static async update(ctx) {
    let { id } = ctx.params;
    if (!id || isNaN(id)) {
      ctx.fail(412, "请传入正确的用户ID");
      return false;
    }

    let { username, avatar, email, content } = ctx.request.body;

    let params = {
      username,
      avatar,
      email,
      content,
    };

    try {
      await MessageService.update(id, params);
      ctx.success("更新留言成功");
    } catch (err) {
      ctx.fail(500, "更新留言失败", err);
    }
  }

  static async delete(ctx) {
    let { id } = ctx.params;
    if (!id || isNaN(id)) {
      ctx.fail(412, "请传入正确的ID");
      return false;
    }

    try {
      await MessageService.delete(id);
      ctx.success("删除留言成功");
    } catch (err) {
      ctx.fail(500, "删除留言失败", err);
    }
  }

  static async hidden(ctx) {
    let { id } = ctx.params;
    let { status } = ctx.request.body;
    if (!id || isNaN(id)) {
      ctx.fail(412, "请传入正确的ID");
      return false;
    }

    try {
      await MessageService.hidden(id, { status });
      ctx.success("操作成功");
      // const data = await MessageService.detail(id);
      // SendEmailServer.reply(data);
    } catch (err) {
      ctx.fail(500, "修改文章失败", err);
    }
  }
}
module.exports = Message;
