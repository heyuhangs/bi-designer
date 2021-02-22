import { createUUID, deepClone } from '../../../common/uitls'
import { cloneDeep, merge } from 'lodash'
import $config from '../../../config'
import eleConfig from './ele-config'
// 元素配置信息字段
const elementConfig = {
  elName: '', // 组件名
  animations: [], // 动画
  commonStyle: {
    position: 'absolute',
    width: $config.canvasH5Width,
    height: 30,
    top: 200,
    left: 0,
    rotate: 0,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    borderWidth: 0,
    borderColor: '',
    borderStyle: 'solid',
    borderRadius: 0,
    boxShadow: '',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#000000',
    backgroundColor: '',
    backgroundImage: '',
    backgroundSize: 'cover',
    opacity: 1,
    zIndex: 1
  }, // 公共样式
  events: [], // 事件
  propsValue: {}, // 属性参数
  value: '', // 绑定值
  valueType: 'String' // 值类型
}
// 页面配置信息字段
const pageConfig = {
  name: '',
  elements: [],
  commonStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)', // SZD 改
    backgroundImage: '',
    backgroundSize: 'cover'
  },
  config: {}
}
// 项目配置信息字段
const projectConfig = {
  name: '',
  title: '未命名场景',
  description: '我用可视化编辑器做了一个超酷炫的大屏，快来看看吧。',
  coverImage: '',
  auther: '',
  script: '',
  width: $config.canvasH5Width,
  height: $config.canvasH5Height,
  pages: [],
  canvasScale: 0.2,
  // 是否开启背景
  bgMapObj: {},
  // 预览是否等比缩放
  pisProportionalScaling: false
}

const getElementConfig = function(element, extendStyle = {}) {
  const elementData = cloneDeep(element)
  const type = elementData.valueType || 'String' // 默认string类型
  const dict = {
    'Sting': '',
    'Array': [],
    'Object': {},
    'Boolean': false,
    'Number': 0
    // 待扩展数据类型
  }
  const defaultAttributeTabNavigation = [{
    label: '基础',
    value: 'componentLibs',
    elementUiIcon: 'tjIconfont tjfont-jichu'
  }]
  const defaultAttributeTab = [{
    id: '0',
    name: '属性',
    elName: 'attrEdit'
  }, {
    id: '1',
    name: '事件',
    elName: 'eventEdit'
  },
    //  {
    //   id: '2',
    //   name: '动画',
    //   elName: 'animationEdit'
    // }, {
    //   id: '3',
    //   name: 'JS脚本',
    //   elName: 'scriptEdit'
    // },
    {
      id: '4',
      name: '数据',
      elName: 'dataEdit'
    }]
  const elementConfigData = cloneDeep(elementConfig)
  const config = {
    uuid: createUUID(),
    ...elementConfigData,
    elName: elementData.elName,
    icon: elementData.icon,
    isSvg: elementData.isSvg,
    isBackground: elementData.isBackground || false,
    propsValue: deepClone(elementData.needProps || {}),
    attributeTab: elementData.attributeTab || defaultAttributeTab,
    attributeTabNavigation: elementData.attributeTabNavigation || defaultAttributeTabNavigation
  }
  // 样式
  config.commonStyle = merge(config.commonStyle, elementData.defaultStyle)
  config.commonStyle = merge(config.commonStyle, extendStyle)
  config.value = element.defaultValue || dict[type]
  config.valueType = type
  config.isForm = !!element.isForm
  return config
}
const copyElement = function(element, extendStyle = {}) {
  element = cloneDeep(element)
  element.uuid = createUUID()
  element.commonStyle = merge(element.commonStyle, extendStyle)
  // 加上一点偏移量，以作区分
  element.commonStyle.top = element.commonStyle.top + 10
  element.commonStyle.left = element.commonStyle.left + 10
  return element
}

const getPageConfig = function() {
  return {
    uuid: createUUID(),
    ...cloneDeep(pageConfig)
  }
}
const copyPage = function(data) {
  const pageData = cloneDeep(data)
  pageData.uuid = createUUID()
  pageData.elements = pageData.elements.map(element => {
    return copyElement(element)
  })
  return pageData
}

const getProjectConfig = function() {
  const project = cloneDeep(projectConfig)
  const onePage = getPageConfig()
  project.pages.push({
    ...onePage
  })
  return { ...project }
}

/**
 * 获取元素样式
 * @param styleObj
 * @param scalePoint 缩放比例
 */
const getCommonStyle = function(styleObj, scalingRatio = 1) {
  const needUnitStr = ['width', 'height', 'top', 'left', 'paddingTop', 'paddingLeft', 'paddingRight', 'paddingBottom', 'marginTop', 'marginLeft', 'marginRight', 'marginBottom', 'borderWidth', 'fontSize', 'borderRadius', 'letterSpacing']
  const style = {}

  for (const key in styleObj) {
    if (needUnitStr.includes(key)) {
      style[key] = (styleObj[key] * scalingRatio) + 'px'
    } else {
      style[key] = styleObj[key]
    }
  }
  console.log('getCommonStyle~~~~~~~~~~~~~~~~~~~~~')
  style.transform = `rotate(${style.rotate}deg)`
  style.backgroundImage = style.backgroundImage ? `url(${style.backgroundImage})` : ''
  return style
}

export function getEleByElName(elName) {
  let list = []
  eleConfig.forEach(item => {
    list = [...list, ...item.components]
  })
  return list.find(v => {
    return v.elName === elName
  })
}

export default {
  elementConfig,
  pageConfig,
  projectConfig,
  getElementConfig,
  getPageConfig,
  getProjectConfig,
  copyPage,
  copyElement,
  getCommonStyle,
  getEleByElName
}
