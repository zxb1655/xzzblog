const state = {
  nav: [
    {
      name: "首页",
      path: "/",
      icon: "icon-shouye"
    },
    {
      name: "文章",
      path: "/article",
      icon: "icon-biaoqian"
    },
    {
      name: "归档",
      path: "/archive",
      icon: "icon-iconset0124"
    },
    {
      name: "留言",
      path: "/message",
      icon: "icon-liuyan"
    },
    {
      name: "导航",
      path: "/nav",
      icon: "icon-daohang"
    },
    {
      name: "关于本站",
      path: "/about",
      icon: "icon-guanyu"
    }
  ]
};

const getters = {
  nav: state => state.nav
};

const mutations = {};

const actions = {};

export default {
  state,
  actions,
  getters,
  mutations,

  namespaced: true // 命名空间
};
