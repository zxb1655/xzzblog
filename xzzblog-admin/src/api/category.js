import request from '@/utils/request/index'

export default {
  getCategoryList(data) {
    return request.get('/api/category/list', data)
  },
  createCategory(data) {
    return request.post('/api/category/create', data)
  },
  updateCategory(id, data) {
    return request.put(`/api/category/update/${id}`, data)
  },
  deleteCategory(id) {
    return request.delete(`/api/category/delete/${id}`)
  }
}
