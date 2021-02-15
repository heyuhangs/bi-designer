'user strict'
// 部署的环境
const staging_service = {
  APPLICATION_ID: '93F7FA2F-CD5D-A155-FF8C-3EB58BD57900',
  API_KEY: '4964D6F0-C7BC-4BA8-A7DE-2E9B5607E017',
  REST_API_key: 'E64180CE-D208-4239-913A-111293A6B680',
  URL: process.env.VUE_APP_BEL_API,
  URL_HTTPS: process.env.VUE_APP_BEL_API
}
// 开发环境
const api_service = {
  APPLICATION_ID: '661656CB-02F2-573C-FF44-7B1F73487400',
  API_KEY: 'D067C451-898E-4E85-AAFD-A8B792FFCAA6',
  REST_API_key: 'FA2624C0-3921-4A5D-ABB0-23C432111AFB',
  URL: process.env.VUE_APP_BEL_API,
  URL_HTTPS: process.env.VUE_APP_BEL_API
}

const service = process.env.VUE_APP_BASE_API === '/stage-api' ? staging_service : api_service

let path = ''
if (location.protocol === 'https:') {
  path = service.URL_HTTPS
} else {
  path = service.URL
}

const uploadPath = path + '/' + service.APPLICATION_ID + '/' + service.REST_API_key + '/files'
const httpPath = path + '/' + service.APPLICATION_ID + '/' + service.REST_API_key + '/services'

module.exports = {
  service: service,
  uploadPath: uploadPath,
  httpPath: httpPath
}
