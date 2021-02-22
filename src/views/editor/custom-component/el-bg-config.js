// import $config from '../../config'

export default {
  title: '背景地图',
  isOpen: false,
  components: [
    {
      index: '1',
      isBackground: true,
      elName: 'bg-map',
      title: '高德地图',
      icon: 'iconfont iconwenben',
      // 每个组件设置props来展示哪些显示哪些编辑项
      valueType: '', // 标识数据类型，用于表单组件
      attributeTab: [{
        id: '5',
        name: '背景地图',
        elName: 'backgroundMapEdit'
      }],
      defaultStyle: {
        top: 0,
        type: 'layerBottom',
        zIndex: 0
      }
    },
    {
      index: '2',
      isBackground: true,
      elName: 'bg-b-map',
      title: '百度地图',
      icon: 'iconfont iconwenben',
      // 每个组件设置props来展示哪些显示哪些编辑项
      valueType: '', // 标识数据类型，用于表单组件
      defaultStyle: {
        top: 0,
        type: 'layerBottom',
        zIndex: 0
      }
    }
  ]
}
