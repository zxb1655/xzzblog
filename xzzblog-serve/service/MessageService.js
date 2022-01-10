const db = require("../config/db");
const Sequelize = db.sequelize;
const Op = Sequelize.Op;
const Message = Sequelize.import("../model/message");

Message.hasMany(Message, { foreignKey: "pid", through: null });

Message.sync({ force: false });

class MessageModel {
  static async create(data) {
    return await Message.create(data);
  }

  static async list(params) {
    const { pageIndex, pageSize, keyword, author, status } = params;
    let ret = await Message.findAndCountAll({
      limit: +pageSize,
      offset: (pageIndex - 1) * +pageSize,
      where: {
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
    const { pageIndex, pageSize } = params;
    let ret = await Message.findAndCountAll({
      limit: +pageSize,
      offset: (pageIndex - 1) * +pageSize,
      include: {
        model: Message,
      },
      distinct: true,
      where: {
        status: 1, // 1 通过 2 拒绝  3 待审核  '' 全部
        pid: 0,
      },
      order: [["id", "DESC"]],
    });

    return {
      data: ret.rows,
      pageIndex: +pageIndex,
      pageSize: +pageSize,
      totalCount: ret.count,
      totalPages: Math.ceil(ret.count / +pageSize),
    };
  }

  static async weblistTotalCount(params) {
    const { pageIndex, pageSize } = params;
    let ret = await Message.findAndCountAll({
      raw: true,
      limit: +pageSize,
      offset: (pageIndex - 1) * +pageSize,
      where: {
        status: 1, // 1 通过 2 拒绝  3 待审核  '' 全部
        pid: 0,
      },
      order: [["id", "DESC"]],
    });

    return {
      data: ret.rows,
      totalCount: ret.count,
      totalPages: Math.ceil(ret.count / +pageSize),
    };
  }

  static async webpidlist(pid) {
    let ret = await Message.findAll({
      raw: true,
      where: {
        status: 1,
        pid,
      },
    });
    return ret;
  }

  static async update(id, data) {
    return await Message.update(data, {
      where: {
        id,
      },
      fields: ["username", "avatar", "email", "content"],
    });
  }

  static async delete(id) {
    await Message.destroy({
      where: {
        id,
      },
    });
    return true;
  }

  static async detail(id) {
    return await Message.findOne({
      where: {
        id,
      },
    });
  }

  static async hidden(id, data) {
    return await Message.update(data, {
      where: {
        id,
      },
      fields: ["status"],
    });
  }
}

module.exports = MessageModel;
