const ArticleToCategoryService = require("../service/articleTocategoryService");

class ArticleToCategory {
  static async list(ctx) {
    let data = await ArticleToCategoryService.list();
    ctx.success("查询个人分类成功", data);
  }
}
module.exports = ArticleToCategory;
