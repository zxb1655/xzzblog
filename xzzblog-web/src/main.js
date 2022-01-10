import Vue from "vue";
import App from "./App";
import store from "./store";
import router from "./router";
import "src/assets/styles/reset.scss";
import "src/assets/styles/styles.scss";
import "./assets/iconfont/iconfont.css";
import "./element.js";

import * as filters from "./filters";
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

import Api from "./http/api.js";
Vue.prototype.$api = Api;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
