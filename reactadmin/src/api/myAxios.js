import axios from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { message } from 'antd';
import store from '../redux/store';

const http = axios.create({
  timeout: 4000,
});

http.interceptors.request.use(
  (config) => {
    NProgress.start();
    const { token } = store.getState().userInfo;
    if (token) config.headers.Authorization = 'Zxbzxb ' + token;
    const { method, data } = config;
    if (method.toLowerCase() === 'post') {
      if (data instanceof Object) {
        config.data = data;
      }
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response.data;
  },
  (error) => {
    NProgress.done();
    if (error.response.data.message) {
      message.warning(error.response.data.message, 1);
    }

    return Promise.reject(error);
  }
);

export default http;
