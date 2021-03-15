module.exports = (app) => {
  const express = require('express');
  const assert = require('http-assert');
  const jwt = require('jsonwebtoken');

  const { PRIVATE_KEY } = require('../../config');
  const AdminUser = require('../../models/AdminUser');
  const sendEmail = require('../../utils/sendEmail.js');

  const router = express.Router({
    mergeParams: true,
  });

  //由于后续对分类，文章等都具有相同的CRUD操作，因此封装出通用的CRUD,简化程序。
  //新建资源
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body);
    res.send(model);
  });
  //更新资源
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });
  //删除资源
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body);
    res.send({
      success: true,
    });
  });
  //资源列表
  router.get('/', async (req, res) => {
    const queryOptions = {};
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'; //指定关联查询属性
    }
    if (req.Model.modelName === 'Comment') {
      queryOptions.populate = 'relateBlogId';
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(100);
    res.send(items);
  });
  //资源详情
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id);
    res.send(model);
  });

  //登录校验中间件
  const authMiddleware = require('../../middleware/auth');

  //资源中间件
  const resourceMiddleware = require('../../middleware/resource');

  //这里是封装通用的CRUD,获取用户参数,决定请求资源的集合Model
  //资源路由
  app.use(
    '/admin/api/rest/:resource',
    authMiddleware(),
    resourceMiddleware(),
    router
  );

  //图片上传
  const multer = require('multer');
  const MAO = require('multer-aliyun-oss');
  const upload = multer({
    storage: MAO({
      config: {
        region: 'oss-cn-guangzhou', // // 阿里云oss的所在区域
        accessKeyId: 'LTAI4GJPjQzRS25WpBKvyuM9', // 阿里云oss的accessKeyId，要自己去创建
        accessKeySecret: 'VLv1IFwFO6PUlMq5zOXBvwaAa0DxfP', // 阿里云oss的accessKeySecret
        bucket: 'zxbblog', // 阿里云oss的bucket's name
      },
    }),
  });
  app.post(
    '/admin/api/upload',
    authMiddleware(),
    upload.single('file'),
    async (req, res) => {
      const file = req.file;
      // file.url = `http://jzxzz.cn/uploads/${file.filename}`;
      res.send(file);
    }
  );

  //登录
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body;

    //查询是否存在用户
    const user = await AdminUser.findOne({
      username,
    }).select('+password');
    assert(user, 422, '用户不存在');

    //bcrypt解密，将用户密码与数据库密码做比较
    const isValid = require('bcryptjs').compareSync(password, user.password);

    assert(isValid, 422, '密码错误');
    //签发token 指定过期时间 7 天
    const token = jwt.sign(
      {
        id: user._id,
      },
      PRIVATE_KEY,
      { expiresIn: '7 days' }
    );
    res.send({
      msg: '登陆成功',
      data: {
        user,
        token,
      },
      status: 200,
    });
  });

  app.post('/admin/api/email', async (req, res) => {
    console.log(req.body);
    sendEmail(req.body);
    res.send({
      ok: 'ok',
    });
  });

  //错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message,
    });
  });
};
