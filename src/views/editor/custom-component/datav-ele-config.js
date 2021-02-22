// import $config from '../../config'

export default {
  title: '功能组件',
  id: 'functionalComponents',
  icon: 'gongnengzujian',
  components: [
    {
      elName: 'DvLoading',
      title: '加载动画',
      isSvg: true,
      icon: 'data-v-loading',
      // 每个组件设置props来展示哪些显示哪些编辑项
      valueType: '', // 标识数据类型，用于表单组件
      defaultStyle: {
        width: 100,
        height: 80
      }
    },
    {
      elName: 'DvScrollRankingBoard',
      title: '排名列表',
      isSvg: true,
      icon: 'data-v-rotation-list',
      // 每个组件设置props来展示哪些显示哪些编辑项
      valueType: '', // 标识数据类型，用于表单组件
      defaultStyle: {
        width: 690,
        height: 200
      }
    },
    // {
    //   elName: 'DvScrollBoard',
    //   title: '表格',
    //   isSvg: true,
    //   icon: 'data-v-table',
    //   // 每个组件设置props来展示哪些显示哪些编辑项
    //   valueType: '', // 标识数据类型，用于表单组件
    //   defaultStyle: {
    //     width: 690,
    //     height: 200
    //   }
    // },
    {
      elName: 'EventTable',
      title: '表格',
      isSvg: true,
      icon: 'data-v-table',
      // 每个组件设置props来展示哪些显示哪些编辑项
      valueType: '', // 标识数据类型，用于表单组件
      defaultStyle: {
        width: 690,
        height: 200
      }
    }
  ]
}

