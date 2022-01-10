export default class Utils {
  static getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }

  static getTokenString(str) {
    let arr = str.split("&");
    let obj = {};
    arr.forEach(item => {
      obj[`${item.split("=")[0]}`] = item.split("=")[1];
    });
    return obj;
  }

  static getLocalStorageUserInfo() {
    let userinfo;
    if (
      localStorage.getItem("zxb_blog_userinfo") &&
      localStorage.getItem("zxb_blog_userinfo") != "undefined"
    ) {
      userinfo = JSON.parse(localStorage.getItem("zxb_blog_userinfo"));
    } else {
      userinfo = {};
    }
    return userinfo;
  }
}
