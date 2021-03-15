//判断是否生产环境
const isDev = process.env.NODE_ENV === 'development';

//服务器配置，数据库配置
let SERVER_CONFIG, DB_CONFIG;

//根据生产环境不同配置
if (isDev) {
  SERVER_CONFIG = {
    port: 3000,
  };

  DB_CONFIG = {
    port: 27017,
    host: 'localhost',
    name: 'blog',
  };
} else {
  SERVER_CONFIG = {
    port: 3000,
  };

  DB_CONFIG = {
    port: 27017,
    host: 'localhost',
    name: 'blog',
  };
}

//token签名加密的私钥
const PRIVATE_KEY = 'zxbzxbzxb';

module.exports = {
  SERVER_CONFIG,
  DB_CONFIG,
  PRIVATE_KEY,
};
