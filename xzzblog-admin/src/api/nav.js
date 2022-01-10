import request from '@/utils/request/index'

export default {
  getNavList(data) {
    return request.get('/api/nav/list', data)
  },
  createNav(data) {
    return request.post('/api/nav/create', data)
  },
  updateNav(id, data) {
    return request.put(`/api/nav/update/${id}`, data)
  },
  deleteNav(id) {
    return request.delete(`/api/nav/delete/${id}`)
  }
}
