/**
 * 组件库入口
 * */
// 背景地图
import BgMap from './bgMap'
// 高德地图
import AMap from './aMap'
// 基础组件
import Text from './text'
import Image from './image'
import ImageCarousel from './image-carousel'
import RectangleBorder from './rectangle-border'
import Iframe from './iframe'
import Button from './button'
import Block from './block'

// 表单组件
import Input from './input'
import Textarea from './textarea'
import Time from './time'
import Date from './date'

// 功能组件
import bgMusic from './bg-music'

// 业务组件
/**
 * Datav组件
 * */
import loadingCom from './datav/loading'
import scrollRankingBoard from './datav/scrollRankingBoard'
import scrollBoard from './datav/scrollBoard'
import eventTable from './datav/table'

/**
 * Echart组件
 * */
import barChart from './echart/bar'
import pieChart from './echart/pie'
import lineChart from './echart/line'
import lineBarChart from './echart/line-bar'
import liquidFillChart from './echart/liquid-fill'
import singleLine from './echart/singleLine'
import wind from './echart/wind'
import Waterfall from './echart/waterfall'
import horizontalBar from './echart/horizontal-bar'
import horizontalBarBlue from './echart/horizontal-bar-blue'
import radar from './echart/radar'
import radarLeft from './echart/radar-left'
import newPie from './echart/new-pie'
/**
 * 自定义组件
 * */
// 一屏
import iocEwForm from './customComponents/ioc/first/iocEwForm'
import iocUsNum from './customComponents/ioc/first/iocUsNum'
import iocPmTree from './customComponents/ioc/first/iocPmTree'
import iocOmCardPanel from './customComponents/ioc/first/iocOmCardPanel'
import iocHeder from './customComponents/ioc/first/iocHeder'
import IocEwHeder from './customComponents/ioc/first/iocEwHeder'
// 所有组件列表
const components = [
  // 背景地图
  BgMap,
  // 高德地图
  AMap,
  // 基础组件
  Text,
  Image,
  Block,
  ImageCarousel,
  RectangleBorder,
  Iframe,
  Button,
  // 表单组件
  Input,
  Textarea,
  Time,
  Date,
  // 功能组件
  bgMusic,
  // 业务组件
  // datav
  loadingCom,
  scrollRankingBoard,
  scrollBoard,
  eventTable,
  // Echart
  barChart,
  pieChart,
  lineChart,
  lineBarChart,
  liquidFillChart,
  singleLine,
  wind,
  Waterfall,
  horizontalBar,
  radar,
  newPie,
  horizontalBarBlue,
  radarLeft,
  // 自定义业务组件
  iocEwForm,
  iocUsNum,
  iocHeder,
  iocPmTree,
  iocOmCardPanel
]
// 定义 install 方法，接收 Vue 作为参数
const install = function(Vue) {
  // 判断是否安装，安装过就不继续往下执行
  if (install.installed) return
  install.installed = true
  // 遍历注册所有组件
  components.map(component => Vue.component(component.name, component))
}

// 检测到 Vue 才执行，毕竟我们是基于 Vue 的
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const _qk_register_components_object = {}
components.forEach(item => {
  _qk_register_components_object[item.name] = item
})

export {
  // 自定义组件
  iocEwForm,
  iocUsNum,
  iocHeder,
  iocPmTree,
  iocOmCardPanel,
  IocEwHeder,
  // datav
  loadingCom,
  scrollRankingBoard,
  scrollBoard,
  eventTable,
  // Echart
  barChart,
  pieChart,
  lineChart,
  lineBarChart,
  liquidFillChart,
  singleLine,
  wind,
  Waterfall,
  horizontalBar,
  horizontalBarBlue,
  radar,
  newPie,
  radarLeft,
  // 地图
  BgMap,
  AMap,
  // 基础
  Text,
  Image,
  ImageCarousel,
  RectangleBorder,
  Iframe,
  Button,
  bgMusic,
  Input,
  Textarea,
  Time,
  Block,
  Date,
  _qk_register_components_object
}

export default {
  install
  // 所有组件，必须具有 install，才能使用 Vue.use()
}
