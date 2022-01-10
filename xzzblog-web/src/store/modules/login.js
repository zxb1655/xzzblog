import Fc from "../../utils/function";

const state = {
  isNeedLogin: false, // login model 显示与否
  userInfo: {
    username: "",
    email: "",
    url: "",
    avatar: ""
  },
  hasUserInfo: false // 是否有个人信息
};

const getters = {
  isNeedLogin: state => state.isNeedLogin,
  userInfo: state => state.userInfo,
  hasUserInfo: state => state.hasUserInfo
};

const mutations = {
  setShow(state, payload) {
    state.isNeedLogin = payload;
  },
  setHide(state, payload) {
    state.isNeedLogin = payload;
  },
  logout(state) {
    state.userInfo = {
      username: "",
      email: "",
      url: "",
      avatar: ""
    };
    state.hasUserInfo = false;
    localStorage.clear();
  },
  updateUserInfo(state) {
    const { username, email, url, avatar } = Fc.getLocalStorageUserInfo();
    if (username) {
      state.hasUserInfo = true;
    } else {
      state.hasUserInfo = false;
    }
    state.userInfo = {
      username,
      email,
      url,
      avatar
    };
  },
  registerUserinfo(state, payload) {
    localStorage.setItem("zxb_blog_userinfo", JSON.stringify(payload));
  }
};

const actions = {};

export default {
  state,
  actions,
  getters,
  mutations,
  namespaced: true // 命名空间
};
