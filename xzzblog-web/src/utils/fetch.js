import Api from "src/http/api";

export async function checkGithubLogin() {
  let data = localStorage.getItem("zxb_blog_github")
    ? JSON.parse(localStorage.getItem("zxb_blog_github"))
    : {};
  if (data.access_token && data.token_type) {
    return await Api.getGithubUserInfo(data);
  } else {
    return {};
  }
}

export async function checkQQLogin() {
  let data = localStorage.getItem("zxb_blog_qq")
    ? JSON.parse(localStorage.getItem("zxb_blog_qq"))
    : {};
  if (data.access_token) {
    return await Api.getQQUserInfo(data);
  } else {
    return {};
  }
}
