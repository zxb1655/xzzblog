### 前言

这个项目主要是为了学习而写的，刚好学习了 node，然后就一直想写个自己的博客系统，可以更方便记录自己的学习知识体系。  
本项目的前后端代码都是放在这个仓库里的，后台管理 admin，服务端 serve，PC 前台 web，移动端和小程序前台 uniapp。  
部署在腾讯学生云服务上，大学自学的时候买好几年了学生云服务器和域名，平时随便折腾，学习 Linux、跑跑脚本、建站、搭博客，特别爽，能自己部署网站对于学习前端兴致也更高了。

### 主要技术栈

- 后台管理系统：vue + elementui + vuex + vue-router + mavon-editor
- 服务端：koa + mysql + sequelize + jsonwebtoken
- PC 前台：vue + elementui + vuex + vue-router
- 移动端和小程序：uniapp

### 视频预览

- B 站视频预览： https://www.bilibili.com/video/BV1Ur4y1v7ko/

### 项目预览

- PC 前台： http://blog.jzzz66.cn
- 移动 H5： http://mblog.jzzz66.cn
- 微信小程序： 猪猪博客  
  <img width="300" src="https://cdn.jzzz66.cn/weiblog.jpeg"/>

### 运行环境配置修改

- 创建数据库 myblog 并导入项目根目录下的 xzzblog.sql  
  推荐使用软件 Navicat 创建和管理数据库.
  后台初始账号：admin
  后台初始密码：123456

> 注意数据库字符编码为：utf8mb4 排序规则为：utf8mb4_unicode_ci

- 更改配置
  xzzblog-serve/config/index.js

```
// 发送邮件配置
  NODEMAILER: {
    email: "204006387@qq.com",
    pass: "",
    IMAP: "", // qq邮箱授权码
    POP3: "", // qq邮箱授权码
  },
  // 数据库配置
  MYSQL: {
    HOST: "127.0.0.1", // 数据库地址
    DATABASE: "myblog", // 数据库名
    USER: "root",  // 数据库用户名
    PASSWORD: "123456", // 数据库 密码
  },
  // 阿里云上传图片配置
  oss: {
    region: "oss-cn-guangzhou",
    accessKeyId: "",
    accessKeySecret: "",
    bucket: "",
  },
  // github登录授权配置
  client_secret: "f81479d7b37785afec4072e9783d1337a89e5c79",
  client_id: "280ef327e24a011a6f05",
```

### github OAuth 登录流程

1.  注册 OAuth APP 的应用
2.  保存 client_id client_secret
3.  访问 GET: https://github.com/login/oauth/authorize?client_id=280ef327e24a011a6f05=user
4.  跳转 http://localhost:3000/auth?code=8b309c4c403f95 保存 code 字段
5.  https://github.com/login/oauth/access_token POST 请求 body:{client_id,client_secret,code} 获取 token
6.  https://api/github.com/user POST 请求： body:{client_id,client_secret} header: {Authorization: token token}

### 最后说明

- 本项目会持续更新和维护，有问题可随时联系我，喜欢别忘了 Star 一下哦，谢谢您的关注。
