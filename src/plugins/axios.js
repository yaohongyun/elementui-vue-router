import Vue from 'vue'
import router from '@/router'
import axios from 'axios' // 引入axios
import { baseUrl } from '../api/env'
import { clearLoginInfo } from '@/utils'

// axios 配置
axios.defaults.timeout = 30000 // 设置请求超时
axios.defaults.baseURL = baseUrl;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded' // 请求头的设置

// 请求拦截
axios.interceptors.request.use(config => { 
  config.headers['token'] = Vue.cookie.get('token') // 请求头带上token
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(response => {
  if (response.data && response.data.code === 401) { // 401, token失效
    clearLoginInfo()
    router.push({ name: 'login' })
  }
  return response
}, (error) => {
  return Promise.reject(error)
})

function createURL (url, params) {
  url += '?'
  for (var item in params) {
    url += `${item}=${params[item]}&`
  }
  return url.substr(0, url.length - 1)
}

// get方法
export const get = (url, params) => {
  url = createURL(url, params)
  return axios.get(url)
}

// post方法
export const post = (url, params) => axios.post(url, params)