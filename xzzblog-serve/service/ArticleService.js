const db = require("../config/db");
const Sequelize = db.sequelize;
const { Op, fn, col, where } = Sequelize;
const Article = Sequelize.import("../model/article.js");
const Category = Sequelize.import("../model/category");
const ArticleToCategory = Sequelize.import("../model/articleTocategory");

Category.belongsToMany(Article, {
  through: {
    model: ArticleToCategory,
  },
  foreignKey: "categoryId",
});
Article.belongsToMany(Category, {
  through: {
    model: ArticleToCategory,
  },
  foreignKey: "articleId",
});

Article.sync({ force: false });
ArticleToCategory.sync({ force: false });

class ArticleModel {
  static async create(data) {
    let params = {
      ...data,
      tag: data.tag.join(","),
    };
    try {
      let result = await Article.create(params);
      let tags = await Category.findAll({ where: { id: data.tag } });
      // setCategories  set[category]s 自动添加的方法
      await result.setCategories(tags);
      // this.associationTable(result.id, data.tag)
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  static async detail(id) {
    return await Article.findOne({
      where: id,
    });
  }

  static async timelist(query) {
    const orderStr = query.order == 1 ? "ASC" : "DESC";
    let ret = await Article.findAll({
      order: [["created_at", orderStr]],
      attributes: ["id", "title", "createdAt", "updatedAt"],
    });
    const data = {};
    ret.forEach((item) => {
      const arr = item.createdAt.split("-");
      const key = `${arr[0]}年${arr[1]}月`;
      if (!data.hasOwnProperty(key)) {
        data[key] = [];
      }
      data[key].push(item);
    });
    return data;
  }

  static async list(params) {
    let {
      author,
      pageIndex,
      pageSize,
      keyword,
      is_del = 10,
      categoryId,
    } = params;

    // 动态搜索字段
    let newWhere = {
      author,
      is_del: is_del == 10 ? [0, 1] : [`${is_del}`],
      title: {
        // 模糊查询
        [Op.like]: "%" + keyword + "%",
      },
    };
    let newInclude = [
      {
        model: Category,
        attributes: {
          exclude: ["author"],
        },
      },
    ];
    if (categoryId) {
      newInclude[0].where = {
        id: categoryId,
      };
    }
    let ret = await Article.findAndCountAll({
      limit: +pageSize,
      offset: (pageIndex - 1) * +pageSize,
      where: newWhere,
      // 关联查询
      include: newInclude,
      order: [["id", "DESC"]],
      distinct: true,
    });

    return {
      data: ret.rows,
      pageIndex: +pageIndex,
      pageSize: +pageSize,
      count: ret.count,
      totalCount: ret.count,
      totalPages: Math.ceil(ret.count / +pageSize),
    };
  }

  static async webhotlist() {
    let ret = await Article.findAndCountAll({
      include: [
        {
          model: Category,
        },
      ],
      where: {
        // author,
        is_del: 0,
        browser: {
          // 浏览量 大于 100
          [Op.gte]: 100,
        },
      },
      order: [["id", "DESC"]],
    });
    return {
      data: ret.rows,
    };
  }

  static async detail(id) {
    return await Article.findOne({
      where: {
        id,
        // is_del: 0,
      },
      include: [
        {
          model: Category,
          through: {
            // as: 'tagsId',
            attributes: [],
          },
          attributes: {
            // exclude: ['author'],
          },
        },
      ],
    });
  }

  static async updateBrowser(id, browser) {
    await Article.update(
      { browser },
      {
        where: {
          id,
        },
        fields: ["browser"],
      }
    );
    return true;
  }

  static async update(id, data) {
    await Article.update(data, {
      where: {
        id,
      },
      fields: [
        "title",
        "browser",
        "author",
        "introduction",
        "is_del",
        "tag",
        "cover",
        "content",
        "bucket",
      ],
    });

    let tagArr = data.tag ? data.tag.split(",") : [];
    this.associationTable(id, tagArr);

    return true;
  }

  // 关联表更新
  static async associationTable(id, tagid) {
    // 全删除 （速度快）
    await ArticleToCategory.destroy({
      where: {
        article_id: id,
      },
    });
    // 关联表 添加
    let result = await Article.findOne({
      where: {
        id,
      },
    });
    let tags = await Category.findAll({ where: { id: tagid } });
    result.setCategories(tags);
  }

  static async delete(id) {
    await Article.destroy({
      where: {
        id,
      },
    });
    this.associationTable(id, []);
    return true;
  }

  static async hidden(id, data) {
    return await Article.update(data, {
      where: {
        id,
      },
      fields: ["is_del"],
    });
  }
}

module.exports = ArticleModel;
