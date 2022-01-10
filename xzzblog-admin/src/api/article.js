import request from '@/utils/request/index'

export default {
  getArticleList(data) {
    return request.get('/api/article/list', data)
  },
  getArticleDeatil(id) {
    return request.get(`/api/article/detail/?id=${id}`)
  },
  hiddenArticle(id, data) {
    return request.put(`/api/article/hidden/${id}`, data)
  },
  createArticle(data) {
    return request.post('/api//article/create', data)
  },
  updateArticle(id, data) {
    return request.put(`/api/article/update/${id}`, data)
  },
  deleteArticle(id) {
    return request.delete(`/api/article/delete/${id}`)
  }
}
