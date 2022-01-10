const CategoryService = require("../service/CategoryService");

class Category {
  static async create(ctx) {
    let { name } = ctx.request.body;
    let params = {
      name,
      author: ctx.user.username,
    };
    try {
      await CategoryService.create(params);
      ctx.success("创建分类成功");
    } catch (err) {
      ctx.fail(500, "创建分类失败", err);
    }
  }

  static async weblist(ctx) {
    let params = ctx.query;
    let data = await CategoryService.weblist(params);
    ctx.success("查询分类成功", data);
  }

  static async list(ctx) {
    let params = ctx.query;
    let data = await CategoryService.list(params);
    ctx.success("查询分类成功", data);
  }

  static async update(ctx) {
    let { id } = ctx.params;
    if (!id || isNaN(id)) {
      ctx.fail(412, "请传入正确的用户ID");
      return false;
    }

    let { name } = ctx.request.body;
    let params = {
      name,
    };

    try {
      await CategoryService.update(id, params);
      ctx.success(200, "更新分类成功");
    } catch (err) {
      ctx.fail(500, "更新失败", err);
    }
  }

  static async delete(ctx) {
    let { id } = ctx.params;
    if (!id || isNaN(id)) {
      ctx.fail(412, "请传入正确的ID");
      return false;
    }

    try {
      await CategoryService.delete(id);
      ctx.success("删除分类成功");
    } catch (err) {
      ctx.fail(500, "", err);
    }
  }
}
module.exports = Category;
