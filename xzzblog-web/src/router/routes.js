export default [
  {
    path: "/",
    name: "home",
    component: resolve => {
      require(["src/views/home/home"], resolve);
    },
    redirect: {
      name: "index"
    },
    children: [
      {
        path: "/",
        name: "index",
        component: resolve => {
          require(["src/views/index/index"], resolve);
        }
      },
      {
        path: "/article",
        name: "article",
        component: resolve => {
          require(["src/views/article/article"], resolve);
        }
      },
      {
        path: "/article/detail",
        name: "detail",
        component: resolve => {
          require(["src/views/article/detail"], resolve);
        }
      },
      {
        path: "/message",
        name: "message",
        component: resolve => {
          require(["src/views/message/message"], resolve);
        }
      },
      {
        path: "/archive",
        name: "archive",
        component: resolve => {
          require(["src/views/archive/archive"], resolve);
        }
      },
      {
        path: "/about",
        name: "about",
        component: resolve => {
          require(["src/views/about/about"], resolve);
        }
      },
      {
        path: "/nav",
        name: "nav",
        component: resolve => {
          require(["src/views/nav/nav"], resolve);
        }
      }
    ]
  },
  {
    path: "/auth",
    name: "auth",
    component: resolve => {
      require(["src/views/auth/auth"], resolve);
    }
  }
];
