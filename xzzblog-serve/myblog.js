const Koa = require("koa");
const app = new Koa();
const onerror = require("koa-onerror");
const koaBody = require("koa-body");
const path = require("path");
const cors = require("koa-cors");
const koaRequest = require("koa-http-request");

const config = require("./config");
const Routers = require("./routes");

// error handler
onerror(app);

app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
    },
  })
);

app.use(
  koaRequest({
    json: true, //automatically parsing of JSON response
    timeout: 3000, //3s timeout
  })
);

// cors
app.use(cors());

// middlewares
app.use(require("koa-static")(path.join(__dirname, "public")));

const Respon = require("./middleware/Respon");
app.use(Respon());

// token
const JWTToken = require("./middleware/JWTToken");
app.use(JWTToken());

// routes
app.use(Routers.routes(), Routers.allowedMethods());

// error
app.on("error", function (err, ctx) {
  console.log(err);
});

module.exports = app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`);
});
