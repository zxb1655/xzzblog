import {
  AppstoreOutlined,
  HomeOutlined,
  ReadOutlined,
  FileAddOutlined,
  ExceptionOutlined,
  MessageOutlined,
  SoundOutlined,
  UserOutlined,
  FolderAddOutlined,
  TagsOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
//项目的菜单配置
export const menuList = [
  {
    title: '首页',
    key: 'home',
    icon: <HomeOutlined />,
    path: '/admin/home',
  },
  {
    title: '文章',
    key: 'article',
    icon: <ReadOutlined />,
    children: [
      {
        title: '新建文章',
        key: 'add_articles',
        icon: <FileAddOutlined />,
        path: '/admin/article/add_article',
      },
      {
        title: '文章列表',
        key: 'article_list',
        icon: <ExceptionOutlined />,
        path: '/admin/article/article_list',
      },
    ],
  },
  {
    title: '分类',
    key: 'category',
    icon: <AppstoreOutlined />,
    path: '/admin/category',
  },
  {
    title: '评论',
    key: 'comment',
    icon: <MessageOutlined />,
    path: '/admin/comment',
  },
  {
    title: '留言',
    key: 'message',
    icon: <SoundOutlined />,
    path: '/admin/message',
  },
  {
    title: '用户管理',
    key: 'user',
    icon: <UserOutlined />,
    path: '/admin/user',
  },
  {
    title: '导航',
    key: 'nav',
    icon: <TagsOutlined />,
    children: [
      {
        title: '导航列表',
        key: 'nav_list',
        icon: <ScheduleOutlined />,
        path: '/admin/nav/nav_list',
      },
      {
        title: '新建导航',
        key: 'write_nav',
        icon: <FolderAddOutlined />,
        path: '/admin/nav/write_nav',
      },
    ],
  },
];
