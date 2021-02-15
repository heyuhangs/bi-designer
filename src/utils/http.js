import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
// import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_IOC_API, // url = base url + request url
  // baseURL: 'http://tj.breakday.cc:7890/',
  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: function(status) {
    console.log(process.env)
    return status >= 200 && status <= 401 // 默认的
  },
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    config.headers['Authorization'] = 'Basic SU9DOmZ1Y2s='
    if (getToken()) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
      config.params = {
        access_token: getToken()
      }
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  async response => {
    // console.log(response)
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (response.status !== 200) {
      Message({
        message: res.resp_msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      if (response.status === 401) {
        // todo: jwt 错误需要处理

        // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
        if (res.code === 1 || res.code === 50008 || res.code === 50012 || res.code === 50014) {
          // to re-login
          MessageBox.confirm('您已经登出，您可以取消以停留在此页面，或再次登录!', '确认注销', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          })
        }
      }
      return Promise.reject(new Error(res.resp_msg || 'Error'))
    } else {
      // 200 也可能有业务异常
      if (res.resp_code === 401) {
        // todo: jwt 错误需要处理
        // to re-login
        MessageBox.confirm('您已经登出，您可以取消以停留在此页面，或再次登录!', '确认注销', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return res
    }
  },
  error => {
    // 这里处理 200-401 以外的错误，如：500
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
