const db = require("../config/db");
const Sequelize = db.sequelize;
const Category = Sequelize.import("../model/category");
const Article = Sequelize.import("../model/article.js");

Category.sync({ force: false });

class CategoryModel {
  static async create(data) {
    return await Category.create(data);
  }

  static async weblist(params) {
    const { id } = params;
    const data = await Category.findAndCountAll({
      include: [
        {
          model: Article,
        },
      ],
      where: {
        id,
      },
    });
    return data;
  }

  static async list(params) {
    const { author } = params;
    return await Category.findAll({
      where: {
        author,
      },
    });
  }

  static async update(id, data) {
    return await Category.update(data, {
      where: {
        id,
      },
      fields: ["name"],
    });
  }

  static async delete(id) {
    await Category.destroy({
      where: {
        id,
      },
    });
    return true;
  }
}

module.exports = CategoryModel;
