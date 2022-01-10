const moment = require("moment");
/**
 *  model: article
 *  mode:  category
 *  多对多的关系
 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "articleTocategory",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true,
      },
      categoryId: {
        type: DataTypes.STRING(30),
        field: "category_id",
        allowNull: false,
        defaultValue: 0,
      },
      articleId: {
        type: DataTypes.STRING(30),
        field: "article_id",
        allowNull: false,
        defaultValue: 0,
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
