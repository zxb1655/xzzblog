module.exports = (app) => {
  const router = require("express").Router();
  const mongoose = require("mongoose");
  const sendEmail = require("../../utils/sendEmail.js");
  const { formatData } = require("../../utils");
  const Article = mongoose.model("Article");
  const Category = mongoose.model("Category");
  const Nav = mongoose.model("Nav");
  const Comment = mongoose.model("Comment");
  const Message = mongoose.model("Message");
  const User = mongoose.model("User");

  // 导航列表
  router.get("/navs", async (req, res) => {
    const data = await Nav.aggregate([
      {
        $lookup: {
          from: "navitems",
          localField: "_id",
          foreignField: "navs",
          as: "navsList",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          "navsList._id": 1,
          "navsList.body": 1,
          "navsList.url": 1,
          "navsList.title": 1,
          "navsList.icon": 1,
        },
      },
    ]);
    res.send(data);
  });

  // 获得最近4条文章
  router.get("/articles/recent", async (req, res) => {
    const data = await Article.find()
      .sort({
        createdAt: -1,
      })
      .limit(4)
      .populate("categories");
    if (data.length) {
      res.send(formatData({ data }));
    } else {
      console.log(2);
      res.send(formatData({ status: 0 }));
    }
  });

  // 获取全部文章，可根据标签
  router.get("/articles/list", async (req, res) => {
    const page = req.query.page || 1;
    const value = req.query.value;
    const limit = req.query.limit - 0 || 6;
    const skip = limit * (page - 1);
    if (value && value !== "全部") {
      const result = await Category.find({ name: value });
      if (result.length) {
        const { _id } = result[0];
        const articles = await Article.find({
          categories: { $elemMatch: { $eq: _id } },
        })
          .sort({ createdAt: -1 })
          .limit(limit)
          .skip(skip)
          .populate("categories");
        const count = await Article.count({
          categories: { $elemMatch: { $eq: _id } },
        });
        res.send({
          articles,
          count,
        });
      } else {
        res.send({
          message: "请求失败",
        });
      }
    } else {
      const count = await Article.count();
      const articles = await Article.find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip)
        .populate("categories");

      res.send({
        articles,
        count,
      });
    }
  });
  //搜索
  router.get("/search", async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit - 0 || 6;
    const skip = limit * (page - 1);
    const content = req.query.title || "";
    const reg = new RegExp(content, "i");
    const articles = await Article.find({
      title: { $regex: reg },
    })
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit)
      .populate("categories");
    const count = await Article.count({
      title: { $regex: reg },
    });
    res.send({
      articles,
      count,
    });
  });

  //按照年月进行归类后的数据
  router.get("/archive", async (req, res) => {
    const data = await Article.aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categories",
          foreignField: "_id",
          as: "newList",
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: {
            $sum: 1,
          },
          list: {
            $push: {
              _id: "$_id",
              title: "$title",
              createdAt: "$createdAt",
            },
          },
        },
      },
    ]).sort({
      _id: -1,
    });
    res.send(data);
  });
  //查询总数及图表数据
  router.get("/count", async (req, res) => {
    const data = await Article.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categories",
          foreignField: "_id",
          as: "newList",
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: {
            $sum: 1,
          },
          readsum: {
            $sum: "$read",
          },
          time: {
            $first: "$createdAt",
          },
        },
      },
    ])
      .limit(12)
      .sort({
        time: 1,
      });
    const userSum = await User.find().countDocuments();
    const articleSum = await Article.find().countDocuments();
    const messageSum = await Message.find().countDocuments();
    const list = [];
    data.forEach((item) => {
      list.push({
        文章总数: item.count,
        阅读量: item.readsum,
        time: item.time,
      });
    });
    res.send({
      userSum,
      articleSum,
      list,
      messageSum,
    });
  });

  // 标签
  router.get("/tags", async (req, res) => {
    const data = await Category.find();
    res.send(data);
  });

  router.get("/info", async (req, res) => {
    res.send({ BlogName: "小猪猪毕业设计" });
  });

  // 文章详情
  router.get("/articles/detail/:id", async (req, res) => {
    const data = await Article.findByIdAndUpdate(
      { _id: req.params.id },
      { $inc: { read: 1 } },
      { new: true, upsert: true }
    ).populate("categories");
    res.send(data);
  });

  // 用户
  router.post("/users", async (req, res) => {
    const data = await User.create(req.body);
    res.send(data);
  });
  router.get("/users", async (req, res) => {
    const data = await Users.find();
    res.send(data);
  });
  router.put("/users/:id", async (req, res) => {
    const data = await User.findByIdAndUpdate(req.params.id, req.body);
    res.send(data);
  });
  router.get("/users/:id", async (req, res) => {
    const data = await User.findById(req.params.id);
    res.send(data);
  });

  //发送邮件
  router.post("/email", async (req, res) => {
    sendEmail(req.body);
    res.send({
      ok: "ok",
    });
  });

  // 评论
  router.post("/comments", async (req, res) => {
    const data = await Comment.create(req.body);
    await Article.findByIdAndUpdate(
      req.body.relateBlogId,
      // { msgs: req.body.msgs },
      {
        $inc: {
          msgs: 1,
        },
      }
    );
    res.send(data);
  });
  router.get("/comments/:blogsId", async (req, res) => {
    const comments = await Comment.find().where({
      relateBlogId: req.params.blogsId,
    });
    res.send(comments);
  });

  // 留言
  router.post("/messages", async (req, res) => {
    const data = await Message.create(req.body);
    res.send(data);
  });
  router.get("/messages", async (req, res) => {
    const messages = await Message.find();
    res.send(messages);
  });

  // 获取服务器时间
  router.get("/time", async (req, res) => {
    let time = new Date().getTime();
    res.send({
      data: time,
    });
  });

  app.use("/web/api", router);
};
