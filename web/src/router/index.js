import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Main,
    children: [
      {
        path: "/",
        name: "Home",
        component: () =>
          import(/* webpackChunkName: "home" */ "../views/Home.vue"),
        meta: {
          title: "首页 - 小斌博客",
        },
      },
      {
        path: "/archives",
        name: "Archive",
        component: () =>
          import(/* webpackChunkName: "archive" */ "../views/Archive.vue"),
        meta: {
          title: "归档 - 小斌博客",
        },
      },
      {
        path: "/tags",
        name: "Tag",
        component: () =>
          import(/* webpackChunkName: "tag" */ "../views/Tag.vue"),
        meta: {
          title: "标签 - 小斌博客",
        },
      },
      {
        path: "/navs",
        name: "Nav",
        component: () =>
          import(/* webpackChunkName: "tag" */ "../views/Nav.vue"),
        meta: {
          title: "导航 - 小斌博客",
        },
      },
      {
        path: "/message",
        name: "Message",
        component: () =>
          import(/* webpackChunkName: "message" */ "../views/Message.vue"),
        meta: {
          title: "留言 - 小斌博客",
        },
      },
      {
        path: "/about",
        name: "About",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
        meta: {
          title: "关于 - 小斌博客",
        },
      },
      {
        path: "/article/list/:id",
        name: "Article",
        component: () =>
          import(/* webpackChunkName: "article" */ "../views/Article.vue"),
        props: true,
        meta: {
          title: "文章详情 - 小斌博客",
        },
      },
    ],
  },
  {
    path: "/search",
    name: "Search",
    component: () =>
      import(/* webpackChunkName: "search" */ "../views/Search.vue"),
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
