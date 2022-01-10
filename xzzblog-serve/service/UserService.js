const db = require("../config/db");
const Sequelize = db.sequelize;
const User = Sequelize.import("../model/user.js");

User.sync({ force: false }); //?

class UserModel {
  static async create(userinfo) {
    let { username, password, email } = userinfo;
    await User.create({
      username,
      password,
      email,
    });
    return true;
  }

  static async username(username) {
    return await User.findOne({
      where: {
        username,
      },
    });
  }

  static async delete(id) {
    await User.destroy({
      where: {
        id,
      },
    });
    return true;
  }

  static async findAllUserList(params) {
    return await User.findAll({
      // attributes: ['id', 'username', 'email'] // 指定返回那些字段
    });
  }
}

module.exports = UserModel;
