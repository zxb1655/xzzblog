import ax from 'axios'
import { interceptRequest, interceptResponse, getInterface } from './common'

console.log('process.env.VUE_APP_BASE_API =>', process.env.VUE_APP_BASE_API)

const axios = ax.create({
  baseURL: process.env.VUE_APP_BASE_API,
  headers: {
    'Content-Type': 'application/json'
  }
})

interceptRequest(axios)
interceptResponse(axios)

export default getInterface(axios)
