import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    map_user_info: {},
    vuex_skin_obj: {
      name: "zxb",
      chinaName: "小猪猪",
    },
    backColor: "#F4F5F7",
  },
  mutations: {
    map_set_user_info(state, data) {
      state.userInfo = data;
    },
    vuex_set_skin_obj(state, data) {
      state.vuex_skin_obj = data;
    },
  },
  actions: {},
  modules: {},
});
