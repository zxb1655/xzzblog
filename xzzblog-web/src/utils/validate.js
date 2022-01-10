import reg from "./reg.js";

export const validateQQEmail = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入QQ邮箱"));
  } else if (!reg.qqEmail.test(value)) {
    callback(new Error("@qq.com"));
  } else {
    callback();
  }
};
export const validateUrl = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入网址"));
  } else if (!reg.url.test(value)) {
    callback(new Error("以http/https开头的完整正确格式"));
  } else {
    callback();
  }
};
