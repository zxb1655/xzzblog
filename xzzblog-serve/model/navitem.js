const moment = require("moment");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "navitem",
    {
      // 链接Id
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true,
      },
      // 链接标题
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "title",
      },
      // 链接地址
      url: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "url",
      },
      // 链接描述
      desc: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "desc",
      },
      // 链接导航
      navId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: "navId",
      },
      // 图标
      icon: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "icon",
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
