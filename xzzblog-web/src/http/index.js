import Axios from "axios";
import Router from "../router";

export default {
  get(url, params) {
    return new Promise((resolve, reject) => {
      Axios({
        method: "get",
        url: url,
        params: {
          ...params,
          author: "admin"
        },
        validateStatus: function(status) {
          // 截获状态码范围
          return status >= 200 && status < 500;
        }
      })
        .then(response => {
          if (response.status == 200) {
            resolve(response.data);
          } else if (response.status == 401) {
            // 无权限
          } else if (response.status == 403) {
            // session 过期
            Router.push("/login");
          } else {
            reject(response.data);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  post(url, method = "post", params) {
    return new Promise((resolve, reject) => {
      Axios({
        method,
        url: url,
        data: {
          ...params,

          author: "admin"
        },
        validateStatus: function(status) {
          return status >= 200 && status < 500;
        }
      })
        .then(response => {
          if (response.status == 200) {
            resolve(response.data);
          } else if (response.status == 401) {
            // Message.error('登录信息过期，请重新登录');
            // Router.replace('/login')
            resolve({});
          } else if (response.status == 403) {
            Router.push("/login");
          } else {
            reject(response.data);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  fetch(url, params, headers = {}) {
    return new Promise((resolve, reject) => {
      Axios({
        method: "post",
        url: url,
        data: params,
        headers: {
          "Content-Type": "application/json",
          ...headers
        }
      })
        .then(response => {
          if (response.status == 200) {
            resolve(response.data);
          } else {
            reject(response.data);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
