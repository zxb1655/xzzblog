import axios from 'axios';
import NProgress from 'nprogress';
import router from './router';

NProgress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done();
});

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/web/api',
  timeout: 20 * 1000,
});

http.interceptors.request.use(
  (config) => {
    NProgress.start();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// axios响应拦截器
http.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response.status === 200
      ? Promise.resolve(response)
      : Promise.reject(response);
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
