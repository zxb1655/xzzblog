const crypto = require("crypto");

// 密匙
const { SECRET_KEY } = require("../utils/index");

// md5 加密
function md5(content) {
  let md5 = crypto.createHash("md5");
  return md5.update(content).digest("hex");
}

// 加密函数
function genPassword(password) {
  const str = `password=${password}&key=${SECRET_KEY}`;
  return md5(str);
}

function timeFormat(date, type) {
  var time = new Date(date);
  var year = time.getFullYear();
  var month =
    time.getMonth() < 9 ? "0" + (time.getMonth() + 1) : time.getMonth() + 1;
  var day = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
  var hour = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
  var minute =
    time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
  var second =
    time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
  if (type === "yyyy-mm-dd") {
    return [year, month, day].join("-");
  } else if (type === "mm-dd") {
    return [month, day].join("-");
  } else if (type === "MM-DD") {
    return `${month}月${day}日`;
  } else if (type === "yyyy-mm-dd-HH-mm-ss") {
    return [year, month, day, hour, minute, second].join("-");
  } else {
    return (
      [year, month, day].join("-") + " " + [hour, minute, second].join(":")
    );
  }
}

function RegExpEmail(val) {
  var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  if (!reg.test(val)) {
    return false;
  } else {
    return true;
  }
}

module.exports = {
  genPassword,
  timeFormat,
  RegExpEmail,
};
