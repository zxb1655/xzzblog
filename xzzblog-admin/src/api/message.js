import request from '@/utils/request/index'

export default {
  getMessageList(data) {
    return request.get('/api/message/list', data)
  },
  hiddenMessage(id, data) {
    return request.put(`/api/message/hidden/${id}`, data)
  },
  createMessage(data) {
    return request.post('/api/message/create', data)
  },
  updateMessage(id, data) {
    return request.put(`/api/message/update/${id}`, data)
  },
  deleteMessage(id) {
    return request.delete(`/api/message/delete/${id}`)
  }
}
