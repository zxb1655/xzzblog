const db = require("../config/db");
const Sequelize = db.sequelize;
const Op = Sequelize.Op;
const ArticleComment = Sequelize.import("../model/articleComment");

ArticleComment.hasMany(ArticleComment, { foreignKey: "pid", through: null });
ArticleComment.sync({ force: false });

class ArticleCommentModel {
  static async create(data) {
    return await ArticleComment.create(data);
  }

  static async list(params) {
    const { pageIndex, pageSize, keyword, author, status, aid } = params;
    let ret = await ArticleComment.findAndCountAll({
      limit: +pageSize,
      offset: (pageIndex - 1) * +pageSize,
      where: {
        aid,
        content: {
          [Op.like]: "%" + keyword + "%",
        },
        status: !status ? [1, 2, 3] : [`${status}`], // 1 通过 2 拒绝  3 待审核  '' 全部
      },

      order: [["id", "DESC"]],
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

  static async weblist(params) {
    const { id } = params;
    const data = await ArticleComment.findAll({
      include: {
        model: ArticleComment,
      },
      distinct: true,
      where: {
        status: 1, // 1 通过 2 拒绝  3 待审核  '' 全部
        pid: 0,
        aid: +id,
      },
      order: [["createdAt", "asc"]],
    });
    return data;
  }

  static async update(id, data) {
    return await ArticleComment.update(data, {
      where: {
        id,
        aid: data.aid,
      },
      fields: ["username", "avatar", "email", "content"],
    });
  }

  static async delete(id) {
    await ArticleComment.destroy({
      where: {
        id,
      },
    });
    return true;
  }

  static async detail(id) {
    return await ArticleComment.findOne({
      raw: true,
      where: {
        id,
      },
    });
  }

  static async hidden(id, data) {
    return await ArticleComment.update(data, {
      where: {
        id,
      },
      fields: ["status"],
    });
  }
}

module.exports = ArticleCommentModel;
