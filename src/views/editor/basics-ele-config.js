// import $config from '../../config'

export default {
  title: '基础组件',
  id: 'basicComponents',
  icon: 'jichuzujian',
  components: [{
    elName: 'a-map',
    title: '地图',
    isSvg: true,
    icon: 'basics-map',
    // 每个组件设置props来展示哪些显示哪些编辑项
    attributeTabNavigation: [
      {
        label: '基础',
        value: 'componentLibs',
        elementUiIcon: 'tjIconfont tjfont-jichu'
      },
      {
        label: '地图配置',
        value: 'mapComponentsLibs',
        elementUiIcon: 'tjIconfont tjfont-dili'
      }
    ],
    valueType: '', // 标识数据类型，用于表单组件
    defaultStyle: {
      width: 320,
      height: 280
    }
  }, {
    elName: 'qk-text',
    title: '文字',
    isSvg: true,
    icon: 'basics-word',
    // 每个组件设置props来展示哪些显示哪些编辑项
    valueType: '', // 标识数据类型，用于表单组件
    defaultStyle: {
      width: 300,
      height: 40,
      color: '#fff',
      fontSize: 32
    }
  }, {
    elName: 'qk-image',
    title: '图片',
    isSvg: true,
    icon: 'basics-img',
    valueType: '', // 标识数据类型，用于表单组件,
    defaultStyle: {
      width: 147,
      height: 91
    }
  }, {
    elName: 'qk-button',
    title: '按钮',
    isSvg: true,
    icon: 'basics-btn',
    // 每个组件设置props来展示哪些显示哪些编辑项
    valueType: '', // 标识数据类型，用于表单组件
    defaultStyle: {
      width: 111,
      height: 24,
      color: '#fff',
      borderWidth: 1
    }
  }, {
    elName: 'qk-image-carousel',
    title: '图片轮播',
    isSvg: true,
    icon: 'basics-carousel',
    valueType: '', // 标识数据类型，用于表单组件,
    defaultStyle: {
      width: 147,
      height: 91
    }
  }, {
    elName: 'qk-iframe',
    title: '内嵌iframe',
    isSvg: true,
    icon: 'basics-iframe',
    valueType: '',
    defaultStyle: {
      width: 350,
      height: 200
    }
  }, {
    elName: 'Qkblock',
    title: '块',
    isSvg: true,
    icon: 'basics-img',
    valueType: '',
    defaultStyle: {
      width: 350,
      height: 200
    }
  }]
}

