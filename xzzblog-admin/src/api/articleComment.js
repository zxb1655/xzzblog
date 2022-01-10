import request from '@/utils/request/index'

export default {
  getArticleCommentList(data) {
    return request.get('/api/articlecomment/list', data)
  },
  hiddenArticleComment(id, data) {
    return request.put(`/api/articlecomment/hidden/${id}`, data)
  },
  createArticleComment(data) {
    return request.post('/api/articlecomment/create', data)
  },
  updateArticleComment(id, data) {
    return request.put(`/api/articlecomment/update/${id}`, data)
  },
  deleteArticleComment(id) {
    return request.delete(`/api/articlecomment/delete/${id}`)
  }
}
