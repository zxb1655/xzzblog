const $noify = require('element-ui').Notification
import store from '@/store'
import router from '@/router'
import { getType } from '@/utils'

/**
 * 拦截请求
 */
function interceptRequest(axiosInstance) {
  axiosInstance.interceptors.request.use(
    config => {
      const token = store.state.user.token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      } else {
        // 没有token
        // router.replace({ path: '/login' })
      }
      return config
    },
    error => {
      $noify({
        type: 'error',
        message: '请求失败，请检查网络'
      })
      return Promise.reject(error)
    }
  )
}

/**
 * 响应-错误处理
 */
function interceptResponse(axios) {
  axios.interceptors.response.use(async response => {
    const body = response.data
    const bodyType = getType(body)
    if (bodyType === 'Object') {
      const { code, message, data } = body
      if (code !== 200) {
        $noify({
          type: 'error',
          message: message || '服务器错误'
        })
      }
      return data
    } else {
      return new Blob([body])
    }
  }, getResponseInterceptor())
}

function getResponseInterceptor() {
  return async error => {
    const { data, status } = error.response
    const dataType = getType(data)
    let body = data
    if (dataType === 'String') {
      body = JSON.parse(data)
    }
    const { message } = body
    // console.log('getResponseInterceptor...', status)
    // 判断状态码
    if (body.code == -1) {
      store.dispatch('user/logout')
      router.replace({ path: '/login' })
    }
    switch (status) {
      case 401:
        $noify({
          type: 'error',
          message
        })
        store.dispatch('user/logout')
        router.replace({ path: '/login' })
        break
      case 403:
        $noify({
          type: 'error'
        })
        store.dispatch('user/logout')
        router.replace({ path: '/login' })
        break
      case 500:
        $noify({
          type: 'error',
          message: message || `请求失败（${status}）`
        })
        break
      default:
        $noify({
          type: 'error',
          message: `未知错误（${status}）`
        })
        break
    }
    return Promise.reject(new Error(message))
  }
}

/**
 * 输出统一接口
 */
function getInterface(axiosInstance) {
  return {
    get(url, query) {
      return axiosInstance.get(url, {
        params: query
      })
    },
    getBlob(url, query) {
      return axiosInstance.get(url, {
        params: query,
        responseType: 'blob'
      })
    },
    postBlob(url, data) {
      const formdata = new FormData()
      formdata.append('file', data.file)
      formdata.append('bucket', data.bucket)
      return axiosInstance.post(url, formdata)
    },
    post: axiosInstance.post.bind(axiosInstance),
    put: axiosInstance.put.bind(axiosInstance),
    patch: axiosInstance.patch.bind(axiosInstance),
    delete: axiosInstance.delete.bind(axiosInstance)
  }
}

export { interceptRequest, interceptResponse, getInterface }
