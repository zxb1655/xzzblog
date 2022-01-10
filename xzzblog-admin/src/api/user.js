import request from '@/utils/request/index'

export default {
  login(data) {
    return request.post('/api/user/login', data)
  },
  upload(data) {
    return request.postBlob('/api/upload', data)
  }
}
