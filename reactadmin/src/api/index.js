import myAxios from './myAxios';
import { ADMIN_BASE_URL, WEB_BASE_URL } from '../config/index';

//登录
export const reqLogin = (username, password) =>
  myAxios.post(`${ADMIN_BASE_URL}login`, { username, password });

//请求天气
export const reqWeather = () =>
  myAxios.get('https://v1.alapi.cn/api/tianqi/now');

//分类列表
export const reqCategoryList = () =>
  myAxios.get(`${ADMIN_BASE_URL}rest/categories`);
//删除分类
export const reqDeleteCategory = (_id) =>
  myAxios.delete(`${ADMIN_BASE_URL}rest/categories/${_id}`);
//更新分类
export const reqUpdateCategory = (_id, model) =>
  myAxios.put(`${ADMIN_BASE_URL}rest/categories/${_id}`, model);
//新建分类
export const reqAddCategory = (model) =>
  myAxios.post(`${ADMIN_BASE_URL}rest/categories`, model);

//搜索文章
export const reqArticleSearch = (pageNum, title) =>
  myAxios.get(`${WEB_BASE_URL}search?page=${pageNum}&title=${title}`);
//根据分页及标签请求文章
export const reqArticleList = (pageNum, name) =>
  myAxios.get(`${WEB_BASE_URL}articles/list?page=${pageNum}&value=${name}`);
//请求文章详情
export const reqArticleContent = (_id) =>
  myAxios.get(`${WEB_BASE_URL}articles/detail/${_id}`);
//更新文章
export const reqUpdateArticle = (_id, model) =>
  myAxios.put(`${ADMIN_BASE_URL}rest/articles/${_id}`, model);
//增加文章
export const reqAddArticle = (model) =>
  myAxios.post(`${ADMIN_BASE_URL}rest/articles`, model);
//删除文章
export const reqDeleteArticle = (_id) =>
  myAxios.delete(`${ADMIN_BASE_URL}rest/articles/${_id}`);

//用户列表
export const reqUserList = () => myAxios.get(`${ADMIN_BASE_URL}rest/users`);
//删除用户
export const reqDeleteUser = (_id) =>
  myAxios.delete(`${ADMIN_BASE_URL}rest/users/${_id}`);
//发送邮件
export const reqSendEmail = (replyObj) =>
  myAxios.post(`${ADMIN_BASE_URL}email`, replyObj);
//导航栏及列表
export const reqNavList = () => myAxios.get(`${WEB_BASE_URL}navs`);
//图表数据
export const reqCount = () => myAxios.get(`${WEB_BASE_URL}count`);

//查询导航栏标题
export const reqNav = () => myAxios.get(`${ADMIN_BASE_URL}rest/navs`);
//编辑导航栏标题
export const reqUpdateNav = (_id, model) =>
  myAxios.put(`${ADMIN_BASE_URL}rest/navs/${_id}`, model);
//删除导航栏标题
export const reqDeleteNav = (_id) =>
  myAxios.delete(`${ADMIN_BASE_URL}rest/navs/${_id}`);
//新增导航栏标题
export const reqAddNav = (model) =>
  myAxios.post(`${ADMIN_BASE_URL}rest/navs`, model);
//删除导航栏列表
export const reqDeleteNavItem = (_id) =>
  myAxios.delete(`${ADMIN_BASE_URL}rest/navitems/${_id}`);
//新增导航栏列表
export const reqAddNavItem = (model) =>
  myAxios.post(`${ADMIN_BASE_URL}rest/navitems`, model);
//编辑导航栏列表
export const reqUpdateNavItem = (_id, model) =>
  myAxios.put(`${ADMIN_BASE_URL}rest/navitems/${_id}`, model);

//查看留言
export const reqMessage = () => myAxios.get(`${ADMIN_BASE_URL}rest/message`);
//删除留言
export const reqDeleteMessage = (_id) =>
  myAxios.delete(`${ADMIN_BASE_URL}rest/message/${_id}`);

//查看留言
export const reqComment = () => myAxios.get(`${ADMIN_BASE_URL}rest/comment`);
//删除留言
export const reqDeleteComment = (_id) =>
  myAxios.delete(`${ADMIN_BASE_URL}rest/comment/${_id}`);
