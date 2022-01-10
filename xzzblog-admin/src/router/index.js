import Vue from 'vue'
import Router from 'vue-router'
import storage from '@/utils/storage'

Vue.use(Router)
import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', icon: 'el-icon-s-home' }
      }
    ]
  },
  {
    path: '/category',
    component: Layout,
    redirect: '/category',
    children: [
      {
        path: '',
        component: () => import('@/views/category/category'),
        name: 'category',
        meta: { title: '分类管理', icon: 'el-icon-menu' }
      }
    ]
  },
  {
    path: '/message',
    component: Layout,
    redirect: '/message',
    children: [
      {
        path: '',
        component: () => import('@/views/message/message'),
        name: 'message',
        meta: { title: '留言管理', icon: 'el-icon-s-comment' }
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article',
    children: [
      {
        path: '',
        component: () => import('@/views/article/article'),
        name: '文章管理',
        meta: { title: '文章管理', icon: 'el-icon-s-opportunity' }
      },
      {
        path: 'add',
        hidden: true,
        component: () => import('@/views/article/add'),
        name: 'articleAdd',
        meta: { title: '添加文章', icon: 'nested' }
      },
      {
        path: 'update/:id',
        hidden: true,
        component: () => import('@/views/article/update'),
        name: 'articleUpdate',
        meta: { title: '编辑文章', icon: 'nested' }
      },
      {
        path: 'comment/:id',
        hidden: true,
        component: () => import('@/views/article/comment'),
        name: 'articleComment',
        meta: { title: '文章评论', icon: 'nested' }
      }
    ]
  },
  {
    path: '/nav',
    component: Layout,
    redirect: '/nav',
    children: [
      {
        path: '',
        component: () => import('@/views/nav/nav'),
        name: 'nav',
        meta: { title: '导航管理', icon: 'el-icon-s-grid' }
      }
    ]
  },
  {
    path: '/navitem',
    component: Layout,
    redirect: '/navitem',
    children: [
      {
        path: '',
        component: () => import('@/views/navitem/navitem'),
        name: '链接管理',
        meta: { title: '链接管理', icon: 'el-icon-s-opportunity' }
      },
      {
        path: 'add',
        hidden: true,
        component: () => import('@/views/navitem/add'),
        name: 'navitemAdd',
        meta: { title: '添加链接', icon: 'nested' }
      },
      {
        path: 'update/:id',
        hidden: true,
        component: () => import('@/views/navitem/update'),
        name: 'navitemUpdate',
        meta: { title: '编辑链接', icon: 'nested' }
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://blog.jzzz66.cn',
        meta: { title: '博客前台', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    mode: 'hash',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

router.beforeEach((to, from, next) => {
  let jwt = storage.load('jwt')
  if (jwt) {
    next()
  } else {
    if (to.name == 'login') next()
    else next({ path: 'login' })
  }
  next()
})

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
