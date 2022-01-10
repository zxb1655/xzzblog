import Vue from "vue";
import Router from "vue-router";
import routes from "./routes";
Vue.use(Router);

const router = new Router({
  mode: "history", // ['history', 'hash']
  linkActiveClass: "active", // active class 名称
  scrollBehavior(to, from, savedPosition) {
    // 后退页面时, 保留滚动位置
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
  routes
});

export default router;
