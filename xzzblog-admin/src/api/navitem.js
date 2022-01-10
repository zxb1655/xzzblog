import request from '@/utils/request/index'

export default {
  getNavitemList(data) {
    return request.get('/api/navitem/list', data)
  },
  getNavitemDeatil(id) {
    return request.get(`/api/navitem/detail/${id}`)
  },
  createNavitem(data) {
    return request.post('/api/navitem/create', data)
  },
  updateNavitem(id, data) {
    return request.put(`/api/navitem/update/${id}`, data)
  },
  deleteNavitem(id) {
    return request.delete(`/api/navitem/delete/${id}`)
  }
}
