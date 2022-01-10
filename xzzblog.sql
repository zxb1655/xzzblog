DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `author` varchar(30) NOT NULL,
  `introduction` varchar(255) NOT NULL,
  `tag` varchar(100) NOT NULL,
  `cover` varchar(255) NOT NULL,
  `bucket` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `browser` int unsigned DEFAULT '0',
  `is_del` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of article
-- ----------------------------
BEGIN;
INSERT INTO `article` VALUES (10, '博客介绍', 'admin', '博客介绍', '13', 'http://blogserve.jzzz66.cn/upload/article/48ce90c459379b94fbb40918c3e23e85.2022-01-07-09-48-49.jpeg', 'article', '## 1、开发初衷\n希望把自己日常工作以及学习生活中学到的知识点或者遇到的难题，亦或是有趣的事情记录下来\n\n## 2、预览地址\n博客在线地址：[http://blog.jzzz66.cn](http://blog.jzzz66.cn)\n后台在线地址：[http://blogadmin.jzzz66.cn](http://blogadmin.jzzz66.cn)\nAndroid App下载：高速下载地址\n微信小程序： 猪猪博客\n\n后台账号: admin  后台密码：admin  \n可以进入后台查看\n\n项目还未完成，很多功能还在编写以及新增，特别是小程序及App，很多都还没实现，很多功能也还待优化中。\n\n## 3、技术介绍\n- 服务端技术栈： node，express，mongodb，\n- 前台技术栈: vue，vuex，vue-router，axios，elementUi，sass\n- 后台管理技术栈：react，react-router，react-redux，antd，axios，less\n- 移动端技术栈：uniapp，color-ui，\n- 开发工具工具: vscode', 0, 0, '2022-01-07 09:49:38', '2022-01-07 09:49:38');
INSERT INTO `article` VALUES (11, 'react中的setState机制引发的坑', 'admin', 'react中的setState机制引发的坑', '12', 'http://blogserve.jzzz66.cn/upload/article/22.2022-01-07-09-53-38.jpeg', 'article', '## 问题\n今天在做项目的过程中，在class一个组件内，因为一个函数中的逻辑有些复杂，于是拆成若干个函数，\n然后在一个函数中调用其他函数，但是运行的时候发现并不能运行出正常的结果。如以下函数，\n\n```\nsetEnterTime(time){\n  this.setState({\n    enterTime:time\n  });	\n  this.findMin()\n}\n\n```\n\n## 解决过程\n使用浏览器对变量进行排查，发现enterTime并没有成功赋值，所以导致后面的计算结果出现了错误\n发现是react的this.setState更新机制导致的。\n\nsetState 通过一个队列机制实现 state 更新。\n当执行 setState 时，会将需要更新的 state 合并后放入状态队列，而不会立刻更新 this.state，队列机制可以高效地批量更新 state。\n\n所以在使用setState更新后，并没有立即更新，而是先执行了后面的函数，所以出现了错误。\n\n## 解决方法\n使用setState的第二个参数，当setState结束并重新呈现该组件时将被调用。\n\n```\nsetEnterTime(time){\n      this.setState({\n	enterTime:time\n      },()=>{\n	this.findMin();\n      });\n}\n\n```\n\n\n另外，如果不通过setState 而直接修改 this.state 的值，那么该 state 将不会被放入状态队列中，当下次调用setState 并对状态队列进行合并时，将会忽略之前直接被修改的 state，而造成无法预知的错误。', 1, 0, '2022-01-07 09:53:40', '2022-01-07 10:01:15');
INSERT INTO `article` VALUES (12, 'Vue点击返回顶部功能', 'admin', 'Vue点击返回顶部功能', '6', 'http://blogserve.jzzz66.cn/upload/article/33.2022-01-07-09-54-10.jpeg', 'article', '一开始直接用window.scrollTo的时候，发现一瞬间就滚上去了，不是我想要的效果，后来就要定时器实现了平滑滚动。\n```\nlet timer = setInterval(() => {\n          let ispeed = Math.floor(-this.$refs.content.offsetTop / 7)\n          document.documentElement.scrollTop = this.scrollTop + ispeed\n          if (that.scrollTop === 0) {\n            clearInterval(timer)\n          }\n        }, 10)\n```\n\n后来查MDN的时候，原来scrollTo可以传另外的参数。\n```\nwindow.scrollTo(x-coord,y-coord )\nwindow.scrollTo(options)\n```\n\n- x-coord 是文档中的横轴坐标。\n- y-coord 是文档中的纵轴坐标。\n- options 是一个包含三个属性的对象。\n\n1、top  等同于  y-coord\n2、left  等同于  x-coord\n3、ehavior 类型String,表示滚动行为,支持参数 smooth(平滑滚动),instant(瞬间滚动),默认值auto\n```\nwindow.scrollTo( 0, 1000 );  // 设置滚动行为改为平滑的滚动 \nwindow.scrollTo({    top: 1000,     behavior: \"smooth\" });\n```\n所以就直接设置behavior:smooth就可以了\n```\nwindow.scrollTo({\n        top: this.$refs.content.offsetTop - 135,\n        behavior: \"smooth\",\n      });\n```', 1, 0, '2022-01-07 09:56:49', '2022-01-07 10:01:11');
INSERT INTO `article` VALUES (13, '判断是IOS系统还是android系统', 'admin', '判断是IOS系统还是android系统', '10', 'http://blogserve.jzzz66.cn/upload/article/44.2022-01-07-09-57-15.jpeg', 'article', '```\nfunction detect(){\n         var equipmentType = \"\";\n         var agent = navigator.userAgent.toLowerCase();\n         var android = agent.indexOf(\"android\");\n         var iphone = agent.indexOf(\"iphone\");\n         var ipad = agent.indexOf(\"ipad\");\n         if(android != -1){\n             equipmentType = \"android\";\n         }\n         if(iphone != -1 || ipad != -1){\n             equipmentType = \"ios\";\n         }\n         return equipmentType;\n     }\n```', 1, 0, '2022-01-07 09:57:35', '2022-01-07 10:01:06');
INSERT INTO `article` VALUES (14, '设置ui库中组件的样式无效问题', 'admin', '设置ui库中组件的样式无效问题', '6,10', 'http://blogserve.jzzz66.cn/upload/article/66.2022-01-07-09-59-21.webp', 'article', 'vue文件的样式都是写在<style lang=\"less\" scoped></style>标签中的，加scoped是为了使得样式只在当前页面有效。我们正常写的所有样式，都会被加上[data-v-23d425f8]这个属性，因此会导致修改样式无效。\n![661.jpeg](http://blogserve.jzzz66.cn/upload/article/661.2022-01-07-10-00-09.jpeg)\n第三方组件内部的标签并没有编译为附带[data-v-23d425f8]这个属性。\n所以，我们想修改组件的样式，就没辙了。怎么办呢？\n一开始我是在第三方组件写个class，然后在一个公共的css文件中或者在当前页面再写一个没有socped属性的style标签，然后直接在里面修改第三方组件的样式。\n这样不失为一个方法，但是存在全局污染和命名冲突的问题。约定特定的命名方式，可以避免命名冲突。但是还是不够优雅。\n因此需要解决这个问题，最后通过深度选择器解决了这个问题。\n例如修改上图中组件里的van-ellipsis类的样式，可以这样做：\n```\n.van-tabs /deep/ .van-ellipsis { color: blue}; \n```\n编译后的结果就是：\n![662.png](http://blogserve.jzzz66.cn/upload/article/662.2022-01-07-10-00-33.png)\n这样就不会给van-ellipsis也添加[data-v-23d425f8]属性了。\n就可以成功修改第三方组件的样式了。\n深度选择器/deep/是只能用于less/sass等的，\n如果没有用这些css编译器，可以用>>>符号。', 1, 0, '2022-01-07 10:00:40', '2022-01-07 10:01:00');
COMMIT;

-- ----------------------------
-- Table structure for articleComment
-- ----------------------------
DROP TABLE IF EXISTS `articleComment`;
CREATE TABLE `articleComment` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `pid` int unsigned NOT NULL DEFAULT '0',
  `aid` int unsigned NOT NULL,
  `username` varchar(30) NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `answer` varchar(255) DEFAULT NULL,
  `email` varchar(30) NOT NULL,
  `content` text NOT NULL,
  `status` int unsigned NOT NULL DEFAULT '3',
  `device` text,
  `location` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of articleComment
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for articleTocategory
-- ----------------------------
DROP TABLE IF EXISTS `articleTocategory`;
CREATE TABLE `articleTocategory` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int unsigned NOT NULL DEFAULT '0',
  `article_id` int unsigned NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `articleTocategory_articleId_categoryId_unique` (`category_id`,`article_id`),
  KEY `article_id` (`article_id`),
  CONSTRAINT `articletocategory_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `articletocategory_ibfk_2` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of articleTocategory
-- ----------------------------
BEGIN;
INSERT INTO `articleTocategory` VALUES (21, 13, 10, '2022-01-07 09:49:39', '2022-01-07 09:49:39');
INSERT INTO `articleTocategory` VALUES (22, 12, 11, '2022-01-07 09:53:40', '2022-01-07 09:53:40');
INSERT INTO `articleTocategory` VALUES (23, 6, 12, '2022-01-07 09:56:49', '2022-01-07 09:56:49');
INSERT INTO `articleTocategory` VALUES (24, 10, 13, '2022-01-07 09:57:35', '2022-01-07 09:57:35');
INSERT INTO `articleTocategory` VALUES (25, 6, 14, '2022-01-07 10:00:40', '2022-01-07 10:00:40');
INSERT INTO `articleTocategory` VALUES (26, 10, 14, '2022-01-07 10:00:40', '2022-01-07 10:00:40');
COMMIT;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `author` varchar(30) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of category
-- ----------------------------
BEGIN;
INSERT INTO `category` VALUES (3, 'Node', 'admin', '2021-12-06 14:15:37', '2022-01-07 09:16:13');
INSERT INTO `category` VALUES (6, 'Vue', 'admin', '2021-12-18 09:44:12', '2022-01-07 09:07:37');
INSERT INTO `category` VALUES (8, '小程序', 'admin', '2021-12-20 12:49:53', '2021-12-20 12:49:53');
INSERT INTO `category` VALUES (10, 'Js', 'admin', '2022-01-07 09:07:57', '2022-01-07 09:07:57');
INSERT INTO `category` VALUES (11, '移动端', 'admin', '2022-01-07 09:08:08', '2022-01-07 09:08:08');
INSERT INTO `category` VALUES (12, 'React', 'admin', '2022-01-07 09:08:16', '2022-01-07 09:08:16');
INSERT INTO `category` VALUES (13, '其它', 'admin', '2022-01-07 09:08:26', '2022-01-07 09:08:26');
COMMIT;

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `pid` int unsigned NOT NULL DEFAULT '0',
  `username` varchar(30) NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `content` text NOT NULL,
  `status` int unsigned NOT NULL DEFAULT '3',
  `device` text,
  `location` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of message
-- ----------------------------
BEGIN;
INSERT INTO `message` VALUES (27, 0, '小猪猪 | 前端初级菜鸟', 'https://avatars.githubusercontent.com/u/58070684?v=4', '1122334455@qq.com', '看看', 1, NULL, NULL, '2022-01-07 09:49:55', '2022-01-07 09:49:59');
INSERT INTO `message` VALUES (28, 27, '站长', 'http://blogserve.jzzz66.cn/upload/article/avatar.png', '1655244880@qq.com', '可以', 1, NULL, NULL, '2022-01-07 09:50:06', '2022-01-07 09:50:06');
COMMIT;

-- ----------------------------
-- Table structure for nav
-- ----------------------------
DROP TABLE IF EXISTS `nav`;
CREATE TABLE `nav` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `order` varchar(30) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of nav
-- ----------------------------
BEGIN;
INSERT INTO `nav` VALUES (3, 'Vue', '1', '2021-12-08 17:43:18', '2021-12-08 17:43:18');
INSERT INTO `nav` VALUES (4, 'Node', '2', '2021-12-08 17:43:24', '2021-12-08 17:43:24');
INSERT INTO `nav` VALUES (5, 'React', '3', '2021-12-08 17:43:30', '2021-12-08 17:43:30');
INSERT INTO `nav` VALUES (6, 'css', '4', '2021-12-08 17:43:36', '2021-12-08 17:43:36');
INSERT INTO `nav` VALUES (7, '可视化工具', '5', '2021-12-08 17:43:48', '2021-12-08 17:43:48');
INSERT INTO `nav` VALUES (8, '小程序', '6', '2021-12-08 17:43:54', '2021-12-08 17:43:54');
INSERT INTO `nav` VALUES (9, '编译构建', '7', '2021-12-08 17:44:10', '2021-12-08 17:44:10');
COMMIT;

-- ----------------------------
-- Table structure for navitem
-- ----------------------------
DROP TABLE IF EXISTS `navitem`;
CREATE TABLE `navitem` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `url` varchar(100) NOT NULL,
  `desc` varchar(255) NOT NULL,
  `navId` int unsigned NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `navId` (`navId`),
  CONSTRAINT `navitem_ibfk_1` FOREIGN KEY (`navId`) REFERENCES `nav` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of navitem
-- ----------------------------
BEGIN;
INSERT INTO `navitem` VALUES (5, 'Element UI', 'https://element.eleme.cn/', '基于 Vue 的组件库', 3, 'http://zxbblog.oss-cn-guangzhou.aliyuncs.com/4aa05789fd1d64fac2a209d0d1c9d65d.svg', '2021-12-08 17:45:50', '2021-12-08 17:45:50');
INSERT INTO `navitem` VALUES (6, 'Vant', 'http://vant-contrib.gitee.io/vant', '移动端Vue组件库', 3, 'http://zxbblog.oss-cn-guangzhou.aliyuncs.com/39301aab90707c990522be406e0db56e.png', '2021-12-08 17:46:09', '2021-12-08 17:46:09');
INSERT INTO `navitem` VALUES (7, 'Vuepress', 'http://vuepress.vuejs.org/zh/', '由 Vue 提供支持的静态站点生成器', 3, 'http://zxbblog.oss-cn-guangzhou.aliyuncs.com/a3625992b651971e57f5aeecbb533c73.svg', '2021-12-08 17:46:28', '2021-12-08 17:46:28');
INSERT INTO `navitem` VALUES (8, 'Vue2', 'https://cn.vuejs.org/v2/guide/', '渐进式 JavaScript 框架', 3, 'http://zxbblog.oss-cn-guangzhou.aliyuncs.com/e95390f96da5aa06ffa926b42961ab44.svg', '2021-12-08 17:46:49', '2021-12-08 17:46:49');
INSERT INTO `navitem` VALUES (9, 'Vue3', 'https://v3.vuejs.org/', '渐进式 JavaScript 框架', 3, 'http://zxbblog.oss-cn-guangzhou.aliyuncs.com/c497baed95ff62f0783a4389516d0c5c.svg', '2021-12-08 17:47:06', '2021-12-08 17:47:06');
INSERT INTO `navitem` VALUES (10, 'Node.js', 'http://nodejs.cn/', '基于 V8 引擎的 JS 运行环境', 4, 'http://zxbblog.oss-cn-guangzhou.aliyuncs.com/78be9e43fc3802c54d8f701b1aa4fe28.svg', '2021-12-08 17:47:29', '2021-12-08 17:47:29');
INSERT INTO `navitem` VALUES (11, 'Koa', 'https://koajs.docschina.org/', '新一代的 Web 后台框架', 4, 'http://zxbblog.oss-cn-guangzhou.aliyuncs.com/93400aacfae2cf8cb8532ad523a6aae0.svg', '2021-12-08 17:47:45', '2021-12-08 17:47:45');
INSERT INTO `navitem` VALUES (12, 'Egg', 'https://eggjs.org/zh-cn/', '为企业级框架和 Node.js & Koa 应用程序而生', 4, 'http://zxbblog.oss-cn-guangzhou.aliyuncs.com/55f97ebc113ce9447c2fdbaba1e725f7.png', '2021-12-08 17:48:02', '2021-12-08 17:48:02');
INSERT INTO `navitem` VALUES (13, 'Express', 'http://expressjs.com/zh-cn/', '快速极简的 Web 框架', 4, 'http://zxbblog.oss-cn-guangzhou.aliyuncs.com/caa9af6fa0b6ffa0d75b5bbd0600a764.png', '2021-12-08 17:48:18', '2021-12-08 17:48:18');
INSERT INTO `navitem` VALUES (14, 'Think.js', 'https://thinkjs.org/', '能够使用完整 ES6/7 特性进行开发的 Node.js 应用程序', 4, 'http://zxbblog.oss-cn-guangzhou.aliyuncs.com/4210eb981e1c9a38cb23a22cf4fe0fc2.png', '2021-12-08 17:48:35', '2021-12-08 17:48:35');
INSERT INTO `navitem` VALUES (15, 'npm', 'https://www.npmjs.com/', 'npm 是 JavaScript package 管理工具，在这里可以找到可复用代码，并以强大的全新方式进行聚合', 4, 'http://zxbblog.oss-cn-guangzhou.aliyuncs.com/4e3e7cfb577259af2f8bcd2140d809f6.png', '2021-12-08 17:48:50', '2021-12-08 17:48:50');
INSERT INTO `navitem` VALUES (16, 'cnpm', 'https://npm.taobao.org/', '淘宝提供的 npmjs.org 镜像', 4, 'http://zxbblog.oss-cn-guangzhou.aliyuncs.com/d06ba817c722afd9d99138158de10e13.png', '2021-12-08 17:49:11', '2021-12-08 17:49:11');
INSERT INTO `navitem` VALUES (17, 'yarn', 'https://yarn.bootcss.com/', '快速、可靠和安全的依赖管理', 4, 'http://zxbblog.oss-cn-guangzhou.aliyuncs.com/c8b8f9a34c6c543227a792faa3ef0f3b.png', '2021-12-08 17:49:27', '2021-12-08 17:49:27');
INSERT INTO `navitem` VALUES (18, 'React', 'https://react.docschina.org/', '构建用户界面的 JavaScript 库', 5, 'http://zxbblog.oss-cn-guangzhou.aliyuncs.com/ce73c2e2070693d839e85e3d59a98ccf.svg', '2021-12-08 17:49:56', '2021-12-08 17:49:56');
INSERT INTO `navitem` VALUES (19, 'Ant Design', 'https://ant-design.gitee.io/', '企业级的 UI 设计语言和 React 实现', 5, 'http://zxbblog.oss-cn-guangzhou.aliyuncs.com/e13a3d781f4fbee51cd068132ba59a2b.svg', '2021-12-08 17:50:12', '2021-12-08 17:50:12');
INSERT INTO `navitem` VALUES (20, 'Redux', 'https://cn.redux.js.org/', 'JavaScript 状态容器，提供可预测化的状态管理', 5, 'http://zxbblog.oss-cn-guangzhou.aliyuncs.com/98c37cbeeaa6f27be8a947827ba01b67.svg', '2021-12-08 17:50:28', '2021-12-08 17:50:28');
INSERT INTO `navitem` VALUES (21, 'Sass', 'https://sass-guidelin.es/zh/', 'Sass 是 CSS 的一个扩展，它使 CSS 的使用起来更加优雅和强大。', 6, 'http://zxbblog.oss-cn-guangzhou.aliyuncs.com/2648998cdcce0e1883867696caca6323.svg', '2021-12-08 17:50:52', '2021-12-08 17:50:52');
INSERT INTO `navitem` VALUES (22, 'Less', 'http://lesscss.cn/', 'Less 是 CSS 预处理语言，使 CSS 更易维护和扩展', 6, 'http://zxbblog.oss-cn-guangzhou.aliyuncs.com/7856d400f1f3de2feea5f5ae17f2c7b8.svg', '2021-12-08 17:51:08', '2021-12-08 17:51:08');
INSERT INTO `navitem` VALUES (23, 'Stylus', 'https://www.zhangxinxu.com/jq/stylus/', '富有表现力、动态、健壮的 CSS', 6, 'http://zxbblog.oss-cn-guangzhou.aliyuncs.com/6fb73a1730b4a14116febcc54be242b5.svg', '2021-12-08 17:51:21', '2021-12-08 17:51:21');
INSERT INTO `navitem` VALUES (24, 'Taro', 'https://taro.jd.com/', 'Taro 是一套遵循 React 语法规范的 多端开发 解决方案', 8, 'http://zxbblog.oss-cn-guangzhou.aliyuncs.com/ace0b555d9fbb68a3f880bcc18ae630c.png', '2021-12-08 17:51:59', '2021-12-08 17:51:59');
INSERT INTO `navitem` VALUES (25, 'mpvue', 'http://mpvue.com/', '框架基于 Vue.js 核心，mpvue 修改了 Vue.js 的 runtime 和 compiler 实现', 8, 'http://zxbblog.oss-cn-guangzhou.aliyuncs.com/6c4db5d1d90991d59e17ace0bb7e62af.png', '2021-12-08 17:52:13', '2021-12-08 17:52:13');
INSERT INTO `navitem` VALUES (26, 'uni-app', 'https://uniapp.dcloud.io/', '一套代码发布多个平台。', 8, 'http://zxbblog.oss-cn-guangzhou.aliyuncs.com/ad1ea621bdbdb2206ba4cff06083f372.png', '2021-12-08 17:52:47', '2021-12-08 17:52:47');
INSERT INTO `navitem` VALUES (27, 'Three.js', 'https://threejs.docschina.org/', 'JavaScript 3d 库', 7, 'http://zxbblog.oss-cn-guangzhou.aliyuncs.com/71eda8be248ab062521e357a26f07160.png', '2021-12-08 17:53:17', '2021-12-08 17:53:17');
INSERT INTO `navitem` VALUES (28, 'ECharts', 'https://echarts.apache.org/', '使用 JavaScript 实现的开源可视化库', 7, 'http://zxbblog.oss-cn-guangzhou.aliyuncs.com/791df48b43bf5a3eae28d3f6e133d503.png', '2021-12-08 17:53:31', '2021-12-08 17:53:31');
INSERT INTO `navitem` VALUES (29, 'V-charts', 'https://v-charts.js.org/', '基于 Vue 和 ECharts 封装的图表组件', 7, 'http://zxbblog.oss-cn-guangzhou.aliyuncs.com/41cc6412febdaef60bd254a2aabdd099.svg', '2021-12-08 17:53:47', '2021-12-08 17:53:47');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1, 'admin', 'e715b45087d1a9698fdad990b324a303', '204006387@qq.com', '2021-11-18 17:02:27', '2021-11-18 17:02:27', NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
