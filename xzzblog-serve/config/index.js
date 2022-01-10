module.exports = {
  port: 5454, // 端口
  // url: "http://blogserve.jzzz66.cn",
  url: "http://localhost:5454",
  JWT_SECRET: "zxbzxb", // jwt 生成 token 的时候用的密钥
  SECRET_KEY: "zxbzxb",
  NODEMAILER: {
    email: "204006387@qq.com",
    pass: "",
    IMAP: "", // qq 授权码 不是qq密码
    POP3: "",
  },
  MYSQL: {
    HOST: "127.0.0.1",
    DATABASE: "myblog",
    USER: "root",
    PASSWORD: "",
  },

  oss: {
    region: "oss-cn-guangzhou",
    accessKeyId: "",
    accessKeySecret: "",
    bucket: "zxbblog",
  },

  // github
  client_secret: "f81479d7b37785afec4072e9783d1337a89e5c79",
  client_id: "280ef327e24a011a6f05",
};
