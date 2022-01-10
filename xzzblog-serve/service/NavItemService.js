const db = require("../config/db");
const Sequelize = db.sequelize;
const Op = Sequelize.Op;

const NavItem = Sequelize.import("../model/navitem.js");
const Nav = Sequelize.import("../model/nav.js");

Nav.hasMany(NavItem, {
  foreignKey: "navId",
});
NavItem.belongsTo(Nav);

NavItem.sync({ force: false });

class NavItemModel {
  static async create(data) {
    let params = {
      ...data,
    };
    let result = await NavItem.create(params);
    return result;
  }

  static async list(params) {
    let { pageIndex, pageSize, keyword } = params;

    // 动态搜索字段
    let newWhere = {
      title: {
        // 模糊查询
        [Op.like]: "%" + keyword + "%",
      },
    };
    let ret = await NavItem.findAndCountAll({
      limit: +pageSize,
      offset: (pageIndex - 1) * +pageSize,
      where: newWhere,
      // 关联查询
      include: [
        {
          model: Nav,
          attributes: ["name", "id"],
        },
      ],
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

  static async detail(id) {
    return await NavItem.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Nav,
        },
      ],
    });
  }

  static async update(id, data) {
    await NavItem.update(data, {
      where: {
        id,
      },
    });
    return true;
  }

  static async delete(id) {
    await NavItem.destroy({
      where: {
        id,
      },
    });
    return true;
  }
}

module.exports = NavItemModel;
