const NavItemService = require("../service/NavItemService");

class NavItem {
  static async create(ctx) {
    let { title, desc, navId, icon, url } = ctx.request.body;
    let params = {
      title,
      desc,
      navId,
      icon,
      url,
    };
    try {
      // 创建链接
      await NavItemService.create(params);
      ctx.success("创建链接成功");
    } catch (err) {
      ctx.fail(500, "创建链接失败", err);
    }
  }

  static async list(ctx) {
    let params = ctx.query;
    try {
      const data = await NavItemService.list(params);
      ctx.success("查询链接列表成功", data);
    } catch (err) {
      ctx.fail(500, "查询链接列表失败", err);
    }
  }

  static async detail(ctx) {
    // 文章ID
    let { id } = ctx.params;

    // 检测是否传入ID
    if (!id || isNaN(id)) {
      ctx.fail(412, "请传入正确的用户ID");
      return false;
    }

    try {
      let data = await NavItemService.detail(id);
      ctx.success("查询链接成功", data);
    } catch (err) {
      ctx.fail(500, "查询链接失败", err);
    }
  }

  static async update(ctx) {
    let { id } = ctx.request.body;
    if (!id || isNaN(id)) {
      ctx.fail(412, "请传入正确的ID");
      return false;
    }

    // 接收参数
    let { title, desc, icon, navId, url } = ctx.request.body;
    let params = {
      title,
      desc,
      icon,
      navId,
      url,
    };

    try {
      // 更新
      await NavItemService.update(id, params);
      ctx.success("更新链接成功");
    } catch (err) {
      ctx.fail(500, "更新链接失败", err);
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
      await NavItemService.delete(id);
      ctx.success("删除链接成功");
    } catch (err) {
      ctx.fail(500, "删除失败", err);
    }
  }
}

module.exports = NavItem;
