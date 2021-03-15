import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element.js';
import http from './http';
import './plugins/filters';
import './plugins/global';
import VueContextMenu from '@xunlei/vue-context-menu';
import 'nprogress/nprogress.css';
import './assets/scss/style.scss';
import './assets/iconfont/iconfont.css';

Vue.prototype.$http = http;
Vue.config.productionTip = false;
Vue.use(VueContextMenu);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
