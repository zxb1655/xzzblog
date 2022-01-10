const NavService = require("../service/NavService");

class Nav {
  static async create(ctx) {
    let { name, order } = ctx.request.body;
    let params = {
      name,
      order,
    };
    try {
      await NavService.create(params);
      ctx.success("创建导航成功");
    } catch (err) {
      ctx.fail(500, "创建导航失败", err);
    }
  }

  static async list(ctx) {
    let data = await NavService.list();
    ctx.success("查询导航成功", data);
  }

  static async weblist(ctx) {
    let data = await NavService.weblist();
    ctx.success("查询导航成功", data);
    ctx.response.status = 200;
  }

  static async update(ctx) {
    let { id } = ctx.params;

    // 检测是否传入ID
    if (!id || isNaN(id)) {
      ctx.fail(412, "请传入正确的用户ID");
      return false;
    }
    let { name, order } = ctx.request.body;
    let params = {
      name,
      order,
    };

    try {
      await NavService.update(id, params);
      ctx.success("更新导航成功");
    } catch (err) {
      ctx.fail(500, "更新导航失败", err);
    }
  }

  static async delete(ctx) {
    let { id } = ctx.params;
    // 检测是否传入ID
    if (!id || isNaN(id)) {
      ctx.fail(412, "请传入正确的ID");
      return false;
    }

    try {
      await NavService.delete(id);
      ctx.success(200, "删除导航成功");
    } catch (err) {
      ctx.fail(500, "删除导航失败", err);
    }
  }
}
module.exports = Nav;
