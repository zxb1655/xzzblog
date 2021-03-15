/*
能操作集合数据的Model
 */
// 1.引入mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// 2.字义Schema(描述文档结构)
const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    select: false, //默认不查出
    //存入数据库时对密码进行bcrypt加密
    set(val) {
      return bcrypt.hashSync(val, 10);
    },
  },
});
// 3. 定义Model(与集合对应, 可以操作集合)
const AdminUser = mongoose.model('AdminUser', schema);

//初始化默认管理员账户/密码
AdminUser.findOne({ username: 'admin' }).then((user) => {
  if (!user) {
    AdminUser.create({
      username: 'admin',
      password: 'admin',
    }).then((res) => {
      console.log('初始化管理员成功：账号：admin 密码：admin');
    });
  }
});
// 4. 向外暴露Model
module.exports = AdminUser;
