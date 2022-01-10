const db = require("../config/db");
const Sequelize = db.sequelize;
const NavItem = Sequelize.import("../model/navitem.js");
const Nav = Sequelize.import("../model/nav.js");

Nav.sync({ force: false });

class NavModel {
  static async create(data) {
    return await Nav.create(data);
  }

  static async weblist() {
    return await Nav.findAll({
      include: [
        {
          model: NavItem,
        },
      ],
      order: [["order", "asc"]],
    });
  }

  static async list() {
    return await Nav.findAll();
  }

  static async update(id, data) {
    return await Nav.update(data, {
      where: {
        id,
      },
    });
  }

  static async delete(id) {
    await Nav.destroy({
      where: {
        id,
      },
    });
    return true;
  }
}

module.exports = NavModel;
