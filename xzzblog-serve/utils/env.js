const ENV = process.env.NODE_ENV;

module.exports = {
  isDev: ENV === "development",
  isProd: ENV === "production",
};
