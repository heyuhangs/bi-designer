
import Vue from 'vue'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import '@/common/styles/element-variables.scss'
// 主题
import '@/assets/style/theme/night-theme/night-index.scss'
import '@/common/iStyle/index.scss' // global css
import config from './config'
import VueAMap from 'vue-amap'
import App from './App'
import store from './store'
import router from './router'
import '@/common/styles/index.scss'
import '@/icons' // icon
import dataV from '@jiaminghi/data-view'

// 默认黑色主题
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  // 高德的key
  key: 'e7152df832f53aad42466f79b0630139',
  // key: 'ba7c074057365d2ce1dcf3d6be2d9281',
  viewMode: '3D',
  // 插件集合
  plugin: ['AMap.ControlBar', 'AMap.Weather', 'AMap.Geolocation', 'AMap.GltfLoader', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.PolyEditor,AMap.CircleEditor,AMap.MouseTool'],
  v: '1.4.15'
})
Vue.use(dataV)
Vue.use(Element, {
  size: 'mini' // set element-ui default size
})
/**
 * 公共配置信息
 */
Vue.prototype.$config = config

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
