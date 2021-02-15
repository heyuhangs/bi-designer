// 'use strict'
import { Message, Notification } from 'element-ui'
import { default as Backendless } from 'backendless'

export function getInStr(arr) {
  let isInit = true
  let objIdStr = ''
  for (const item in arr) {
    if (isInit) {
      objIdStr = objIdStr + `'` + arr[item].objectId + `'`
      isInit = false
    } else {
      objIdStr = objIdStr + `,'` + arr[item].objectId + `'`
    }
  }
  return objIdStr
}

export function doError(err) {
  if (err.code) {
    notifyError(err.code, err.message)
  } else if (err.statusCode) {
    notifyError(err.statusCode, err.message)
  } else if (err.message) {
    Message({
      type: 'error',
      message: err.message
    })
  } else {
    Message({
      type: 'error',
      message: err
    })
  }
  return false
}

export function doEventError(e) {
  const err = {
    message: e[0].message,
    code: e[0].statusCode
  }
  if (err.code) {
    notifyError(err.code, err.message)
  } else if (err.statusCode) {
    notifyError(err.statusCode, err.message)
  } else if (err.message) {
    Message({
      type: 'error',
      message: err.message
    })
  } else {
    Message({
      type: 'error',
      message: err
    })
  }
  return false
}

/**
 * 弹出错误提示
 * @param _this
 * @param code
 * @param message
 */
export function notifyError(code, message) {
  Backendless.Logging.getLogger(`FrontEndError`)
  Backendless.Logging.getLogger(`FrontEndError`).error(`${code}--${message}`)
  // if (code === 3064) {
  //   // to re-login
  //   MessageBox.confirm('您已经登出，您可以取消以停留在此页面，或再次登录', '确认注销', {
  //     confirmButtonText: '重新登录',
  //     cancelButtonText: '取消',
  //     type: 'warning'
  //   }).then(() => {
  //     store.dispatch('user/resetToken').then(() => {
  //       location.reload()
  //     })
  //   })
  // }
  console.error(code, message)
  Notification.error({
    title: '错误:' + code,
    dangerouslyUseHTMLString: true,
    duration: 10000,
    message: message
  })
}

/**
 * 取用户最大权限
 * @returns {number}
 */
export function getUserMaxPermission(personObject) {
  let maxPerssion = 0
  for (let x = 0; x < personObject.role.length; x++) {
    maxPerssion = maxPerssion > personObject.role[x].roleLevel ? maxPerssion : personObject.role[x].roleLevel
  }
  return maxPerssion
}
