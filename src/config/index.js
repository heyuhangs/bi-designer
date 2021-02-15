/**
 * 公共配置文件
 */
// import $config from '../../config'

const configDict = {
  development: {
    baseURL: 'http://47.104.247.183:4000'
  }

  // production: {
  //   baseURL: $config.baseURL
  // }
}

const currentConfigKey = process.env.NODE_ENV
const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV === 'development'

const configObj = {
  isDevelop: (isDev || isTest),
  ...configDict[currentConfigKey],
  // PC模式宽高
  canvasH5Width: 1920,
  canvasH5Height: 1080
}

export default configObj
