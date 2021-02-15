// import $config from '../../config'

export default {
  title: '业务组件',
  id: 'businessComponents',
  icon: 'yewuzujian',
  components: [
    {
      elName: 'IocEwForm',
      title: '城市运行分析预警',
      isSvg: true,
      icon: 'Ioc_Ew_Form',
      // 每个组件设置props来展示哪些显示哪些编辑项
      valueType: '', // 标识数据类型，用于表单组件
      defaultStyle: {
        width: 273,
        height: 238
      }
    },
    {
      elName: 'IocUsNum',
      title: '数字标题',
      isSvg: true,
      icon: 'Ioc_Us_Num',
      // 每个组件设置props来展示哪些显示哪些编辑项
      valueType: '', // 标识数据类型，用于表单组件
      defaultStyle: {
        width: 270,
        height: 53
      }
    },
    {
      elName: 'IocPmTree',
      title: '城市运行体征监管',
      isSvg: true,
      icon: 'Ioc_Pm_Tree',
      // 每个组件设置props来展示哪些显示哪些编辑项
      valueType: '', // 标识数据类型，用于表单组件
      defaultStyle: {
        width: 720,
        height: 212
      }
    },
    {
      elName: 'IocOmCardPanel',
      title: '城市运行检测单元',
      isSvg: true,
      icon: 'Ioc_Om_CardPanel',
      // 每个组件设置props来展示哪些显示哪些编辑项
      valueType: '', // 标识数据类型，用于表单组件
      defaultStyle: {
        width: 140,
        height: 58
      }
    },
    {
      elName: 'IocHeder',
      title: '图片标题',
      isSvg: true,
      icon: 'Ioc_Heder',
      // 每个组件设置props来展示哪些显示哪些编辑项
      valueType: '', // 标识数据类型，用于表单组件
      defaultStyle: {
        width: 270,
        height: 47
      }
    }
  ]
}

