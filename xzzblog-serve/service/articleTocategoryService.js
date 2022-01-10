const db = require("../config/db");
const Sequelize = db.sequelize;
const ArticleToCategory = Sequelize.import("../model/articleTocategory");

class ArticleToCategoryModel {
  static async list() {
    return await ArticleToCategory.findAll();
  }
}

module.exports = ArticleToCategoryModel;
