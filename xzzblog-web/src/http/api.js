import Http from "src/http";
let API = process.env.API_ROOT;
export default class Api {
  // 文章列表
  static getArticleList(params = {}) {
    let url = `${API}/api/article/weblist`;
    return Http.get(url, params);
  }

  //归档文章列表
  static getArchive(params = {}) {
    let url = `${API}/api/article/webtimelist`;
    return Http.get(url, params);
  }

  static getnavList(params = {}) {
    let url = `${API}/api/nav/webnavlist`;
    return Http.get(url, params);
  }

  // 文章详情
  static getArticleDetail(params) {
    let url = `${API}/api/article/webdetail`;
    return Http.get(url, params);
  }

  // 热门文章
  static getHotArticleList(params = {}) {
    let url = `${API}/api/article/webhotlist`;
    return Http.get(url, params);
  }

  // 个人分类
  static getAllCategory(params = {}) {
    let url = `${API}/api/category/list`;
    return Http.get(url, params);
  }

  // 分类列表
  static getCategory(params = {}) {
    let url = `${API}/api/category/weblist`;
    return Http.get(url, params);
  }

  // 评论列表
  static getMessageList(params = {}) {
    let url = `${API}/api/message/weblist`;
    return Http.get(url, params);
  }

  // 文章评论列表
  static getArticleCommentList(params = {}) {
    let url = `${API}/api/articlecomment/weblist`;
    return Http.get(url, params);
  }

  // 文章评论列表
  static createArticleComment(params = {}) {
    let url = `${API}/api/articlecomment/webcreate`;
    return Http.post(url, "post", params);
  }

  // 创建留言
  static createMessage(params = {}) {
    let url = `${API}/api/message/webcreate`;
    return Http.post(url, "post", params);
  }

  /**
   * github
   */
  static async getGithubToken(params = {}) {
    let url = `${API}/api/github`;
    return Http.post(url, "post", params);
  }

  static async getGithubUserInfo(params = {}) {
    let url = `${API}/api/githubUserInfo`;
    return Http.post(url, "post", params);
  }
}
