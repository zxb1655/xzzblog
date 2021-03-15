module.exports = (app) => {
  const mongoose = require('mongoose');
  const { DB_CONFIG } = require('../config');
  mongoose
    .connect(`mongodb://127.0.0.1:${DB_CONFIG.port}/${DB_CONFIG.name}`, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    })
    .then(() => {
      console.log('连接数据库成功');
    });
  require('require-all')(__dirname + '/../models');
};
