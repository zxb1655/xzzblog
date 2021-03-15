const express = require('express');
const cors = require('cors');
const app = express();

// 设定CORS跨域
app.use(cors());
// app.use((req, res, next) => {
//   // 设置响应头
//   res.set('Access-Control-Allow-Origin', '*');
//   // OPTIONS 预检请求，当请求方式不是get和post / 请求头包含非默认参数
//   // 预检请求作用：检查当前请求是否允许跨域
//   res.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
//   res.set('Access-Control-Allow-Headers', 'content-type, authorization, accept');
//   res.set('Access-Control-Max-Age', 86400);
//   // 快速返回预检请求响应
//   if (req.method.toLowerCase() === 'options') {
//     // 命中了预检请求
//     return res.end();
//   }
//   next();
// });

app.use(express.json()); // 请求体参数是json结构: {name: tom, pwd: 123}
// app.use(express.urlencoded({extended: true})) // 请求体参数是: name=tom&pwd=123

app.use('/uploads', express.static(__dirname + '/uploads'));

require('./utils/db')(app);
require('./routes/admin/index.js')(app);
require('./routes/web/index.js')(app);

const { SERVER_CONFIG } = require('./config');
app.listen(SERVER_CONFIG.port, async (req, res) => {
  console.log(`服务器启动成功: http://localhost:${SERVER_CONFIG.port}`);
});
