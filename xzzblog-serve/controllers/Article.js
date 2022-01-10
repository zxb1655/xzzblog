const ArticleService = require("../service/ArticleService");

class Article {
  static async create(ctx) {
    let { title, author, introduction, tag, cover, content, bucket } =
      ctx.request.body;
    let params = {
      title,
      author,
      introduction,
      tag,
      cover,
      content,
      bucket,
    };

    try {
      // 创建文章
      const { id } = await ArticleService.create(params);
      ctx.success("创建文章成功", { id });
    } catch (err) {
      ctx.fail(500, "创建文章失败", err);
    }
  }

  static async timelist(ctx) {
    try {
      const data = await ArticleService.timelist(ctx.query);
      ctx.success("查询文章列表成功", data);
    } catch (err) {
      ctx.fail(500, "查询文章列表失败", err);
    }
  }

  static async list(ctx) {
    let params = ctx.query;
    try {
      const data = await ArticleService.list(params);
      ctx.success("查询文章列表成功", data);
    } catch (err) {
      ctx.fail(500, "查询文章列表失败", err);
    }
  }

  static async webhotlist(ctx) {
    try {
      const data = await ArticleService.webhotlist();
      ctx.success("查询热门文章列表成功", data);
    } catch (err) {
      ctx.fail(500, "查询热门文章列表失败", err);
    }
  }

  static async detail(ctx) {
    let { id } = ctx.query;
    if (!id || isNaN(id)) {
      ctx.fail(412, "请传入正确的用户ID");
      return false;
    }

    try {
      let data = await ArticleService.detail(id);
      if (data !== null) {
        // 浏览次数增加1
        let browser = data.browser + 1;
        await ArticleService.updateBrowser(id, browser);
      }
      ctx.success("查询文章成功", data);
    } catch (err) {
      ctx.fail(500, "查询文章失败", err);
    }
  }

  static async update(ctx) {
    let { id } = ctx.request.body;
    if (!id || isNaN(id)) {
      ctx.fail(412, "请传入正确的ID");
      return false;
    }

    // 接收参数
    let { title, author, introduction, category_id, tag, cover, content } =
      ctx.request.body;
    let params = {
      title,
      author,
      introduction,
      category_id,
      tag,
      cover,
      content,
    };

    try {
      // 更新
      await ArticleService.update(id, params);
      ctx.success("更新文章成功");
    } catch (err) {
      ctx.fail(500, "更新文章失败", err);
    }
  }

  static async delete(ctx) {
    let { id } = ctx.params;
    if (!id || isNaN(id)) {
      ctx.fail(412, "请传入正确的ID");
      return false;
    }
    try {
      await ArticleService.delete(id);
      ctx.success("删除文章成功");
    } catch (err) {
      ctx.fail(500, "删除文章失败", err);
    }
  }

  static async hidden(ctx) {
    let { id } = ctx.params;
    let { is_del } = ctx.request.body;
    if (!id || isNaN(id)) {
      ctx.fail(412, "请传入正确的ID");
      return false;
    }

    try {
      await ArticleService.hidden(id, { is_del });
      ctx.success("修改文章成功");
    } catch (err) {
      ctx.fail(500, "修改文章失败", err);
    }
  }
}

module.exports = Article;
