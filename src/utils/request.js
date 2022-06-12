import { message } from 'antd'
import axios from 'axios'
import { getToken, hasToken, removeToken } from 'utils/storage'
import history from 'utils/history'
const instance = axios.create({
  // 基础路径
  baseURL: 'http://geek.itheima.net/v1_0/',
  // 超时时间
  timeout: 5000,
})

//配置拦截器
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    if (hasToken()) {
      config.headers.Authorization = `Bearer ${getToken()}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    console.log(error.response)
    if (error.response.status === 401) {
      //代表token过期
      //1.删除token
      removeToken()
      message.warn('登录信息过期了')
      // 在非组件中无法使用redirect也无法访问到history
      // window.location.href = '/login'
      history.push('/login')
    } else {
      return Promise.reject(error)
    }
  }
)
export default instance
