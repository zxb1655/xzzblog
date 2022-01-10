const moment = require("moment");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "nav",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true,
      },
      // 导航名字
      name: {
        type: DataTypes.STRING(30),
        field: "name",
        allowNull: false,
      },
      // 顺序
      order: {
        type: DataTypes.STRING(30),
        field: "order",
        default: 1,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        get() {
          return moment(this.getDataValue("createdAt")).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        },
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
        get() {
          return moment(this.getDataValue("updatedAt")).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        },
      },
    },
    {
      // 如果为 true 则表的名称和 model 相同，即 user
      // 为 false MySQL创建的表名称会是复数 users
      // 如果指定的表名称本就是复数形式则不变
      freezeTableName: true,
    }
  );
};
