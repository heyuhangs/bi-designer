import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const chartReq = require.context('./svg/chart', false, /\.svg$/)
const basicComponentsReq = require.context('./svg/basicComponents', false, /\.svg$/)
const customComponentsReq = require.context('./svg/customComponents', false, /\.svg$/)
const dataVReq = require.context('./svg/dataV', false, /\.svg$/)
// lse SVG
// const lseFirse = require.context('./svg/lse/first', false, /\.svg$/)
// const newScreen = require.context('./svg/lse/newScreen', false, /\.svg$/)
// const lseSecond = require.context('./svg/lse/second', false, /\.svg$/)
// uid
// const uidSvg = require.context('./svg/UID', false, /\.svg$/)
// upload
const updateSvg = require.context('./svg/updateIcon', false, /\.svg$/)
// const meetEmergency = require.context('./meetEmergency', false, /\.svg$/)
// customComponents
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
requireAll(chartReq)
requireAll(basicComponentsReq)
requireAll(customComponentsReq)
requireAll(dataVReq)
// requireAll(lseFirse)
// requireAll(lseSecond)
// requireAll(uidSvg)
requireAll(updateSvg)
// requireAll(meetEmergency)
// requireAll(newScreen)
