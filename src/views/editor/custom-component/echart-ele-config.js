// import $config from '../../config'

export default {
  title: '图表组件',
  id: 'chartComponents',
  icon: 'tubiaozujian',
  components: [
    {
      elName: 'DvEchartBar',
      title: '柱状图',
      isSvg: true,
      icon: 'echart-bar',
      // 每个组件设置props来展示哪些显示哪些编辑项
      valueType: '', // 标识数据类型，用于表单组件
      defaultStyle: {
        width: 350,
        height: 171
      },
      // attributeTab
      attributeTabNavigation: [
        {
          label: '基础',
          value: 'componentLibs',
          elementUiIcon: 'tjIconfont tjfont-jichu'
        },
        {
          label: '标题',
          value: 'chartTitleComponentsLibs',
          elementUiIcon: 'tjIconfont tjfont-biaoti'
        }
      ]
    },
    {
      elName: 'DvEchartHorizontalBar',
      title: '横向柱状图',
      isSvg: true,
      icon: 'echart-bar',
      // 每个组件设置props来展示哪些显示哪些编辑项
      valueType: '', // 标识数据类型，用于表单组件
      defaultStyle: {
        width: 350,
        height: 171
      },
      // attributeTab
      attributeTabNavigation: [
        {
          label: '基础',
          value: 'componentLibs',
          elementUiIcon: 'tjIconfont tjfont-jichu'
        },
        {
          label: '标题',
          value: 'chartTitleComponentsLibs',
          elementUiIcon: 'tjIconfont tjfont-biaoti'
        }
      ]
    },
    {
      elName: 'DvEchartHorizontalBarBlue',
      title: '横向柱状图蓝',
      isSvg: true,
      icon: 'echart-bar',
      // 每个组件设置props来展示哪些显示哪些编辑项
      valueType: '', // 标识数据类型，用于表单组件
      defaultStyle: {
        width: 350,
        height: 171
      },
      // attributeTab
      attributeTabNavigation: [
        {
          label: '基础',
          value: 'componentLibs',
          elementUiIcon: 'tjIconfont tjfont-jichu'
        },
        {
          label: '标题',
          value: 'chartTitleComponentsLibs',
          elementUiIcon: 'tjIconfont tjfont-biaoti'
        }
      ]
    },
    {
      elName: 'DvEchartRadar',
      title: '雷达图',
      isSvg: true,
      icon: 'echart-bar',
      // 每个组件设置props来展示哪些显示哪些编辑项
      valueType: '', // 标识数据类型，用于表单组件
      attributeTabNavigation: [
        {
          label: '基础',
          value: 'componentLibs',
          elementUiIcon: 'tjIconfont tjfont-jichu'
        },
        {
          label: '标题',
          value: 'chartTitleComponentsLibs',
          elementUiIcon: 'tjIconfont tjfont-biaoti'
        }
      ],
      defaultStyle: {
        width: 434,
        height: 264
      }
    },
    {
      elName: 'DvEchartRadarLeft',
      title: '新风向图',
      isSvg: true,
      icon: 'echart-bar',
      // 每个组件设置props来展示哪些显示哪些编辑项
      valueType: '', // 标识数据类型，用于表单组件
      attributeTabNavigation: [
        {
          label: '基础',
          value: 'componentLibs',
          elementUiIcon: 'tjIconfont tjfont-jichu'
        },
        {
          label: '标题',
          value: 'chartTitleComponentsLibs',
          elementUiIcon: 'tjIconfont tjfont-biaoti'
        }
      ],
      defaultStyle: {
        width: 434,
        height: 264
      }
    },
    {
      elName: 'DvEchartPie',
      title: '环形嵌套饼图',
      isSvg: true,
      icon: 'echart-nested-pie',
      attributeTabNavigation: [
        {
          label: '基础',
          value: 'componentLibs',
          elementUiIcon: 'tjIconfont tjfont-jichu'
        },
        {
          label: '标题',
          value: 'chartTitleComponentsLibs',
          elementUiIcon: 'tjIconfont tjfont-biaoti'
        }
      ],
      // 每个组件设置props来展示哪些显示哪些编辑项
      valueType: '', // 标识数据类型，用于表单组件
      defaultStyle: {
        width: 434,
        height: 264
      }
    },
    {
      elName: 'DvEchartNewPie',
      title: '环图',
      isSvg: true,
      icon: 'echart-nested-pie',
      attributeTabNavigation: [
        {
          label: '基础',
          value: 'componentLibs',
          elementUiIcon: 'tjIconfont tjfont-jichu'
        },
        {
          label: '标题',
          value: 'chartTitleComponentsLibs',
          elementUiIcon: 'tjIconfont tjfont-biaoti'
        }
      ],
      // 每个组件设置props来展示哪些显示哪些编辑项
      valueType: '', // 标识数据类型，用于表单组件
      defaultStyle: {
        width: 322,
        height: 207
      }
    },
    {
      elName: 'DvEchartLineBar',
      title: '折线柱状图',
      isSvg: true,
      icon: 'echart-bar-line',
      attributeTabNavigation: [
        {
          label: '基础',
          value: 'componentLibs',
          elementUiIcon: 'tjIconfont tjfont-jichu'
        },
        {
          label: '标题',
          value: 'chartTitleComponentsLibs',
          elementUiIcon: 'tjIconfont tjfont-biaoti'
        }
      ],
      // 每个组件设置props来展示哪些显示哪些编辑项
      valueType: '', // 标识数据类型，用于表单组件
      defaultStyle: {
        width: 350,
        height: 200
      }
    },
    {
      elName: 'DvEchartWaterfall',
      title: '瀑布图',
      isSvg: true,
      icon: 'echart-bar-line',
      attributeTabNavigation: [
        {
          label: '基础',
          value: 'componentLibs',
          elementUiIcon: 'tjIconfont tjfont-jichu'
        },
        {
          label: '标题',
          value: 'chartTitleComponentsLibs',
          elementUiIcon: 'tjIconfont tjfont-biaoti'
        }
      ],
      // 每个组件设置props来展示哪些显示哪些编辑项
      valueType: '', // 标识数据类型，用于表单组件
      defaultStyle: {
        width: 320,
        height: 200
      }
    },
    {
      elName: 'DvEchartMultilayeredLine',
      title: '多折线图',
      isSvg: true,
      icon: 'echart-stack-area-line',
      attributeTabNavigation: [
        {
          label: '基础',
          value: 'componentLibs',
          elementUiIcon: 'tjIconfont tjfont-jichu'
        },
        {
          label: '标题',
          value: 'chartTitleComponentsLibs',
          elementUiIcon: 'tjIconfont tjfont-biaoti'
        }
      ],
      // 每个组件设置props来展示哪些显示哪些编辑项
      valueType: '', // 标识数据类型，用于表单组件
      defaultStyle: {
        width: 165,
        height: 211
      }
    },
    {
      elName: 'DvEchartLiquidFill',
      title: '进度图',
      isSvg: true,
      icon: 'echart-LiquidFill',
      attributeTabNavigation: [
        {
          label: '基础',
          value: 'componentLibs',
          elementUiIcon: 'tjIconfont tjfont-jichu'
        }
      ],
      // 每个组件设置props来展示哪些显示哪些编辑项
      valueType: '', // 标识数据类型，用于表单组件
      defaultStyle: {
        width: 115,
        height: 115
      }
    },
    {
      elName: 'DvEchartSingleLine',
      title: '单折线图',
      isSvg: true,
      icon: 'echart-line',
      attributeTabNavigation: [
        {
          label: '基础',
          value: 'componentLibs',
          elementUiIcon: 'tjIconfont tjfont-jichu'
        },
        {
          label: '标题',
          value: 'chartTitleComponentsLibs',
          elementUiIcon: 'tjIconfont tjfont-biaoti'
        }
      ],
      // 每个组件设置props来展示哪些显示哪些编辑项
      valueType: '', // 标识数据类型，用于表单组件
      defaultStyle: {
        width: 350,
        height: 200
      }
    },
    {
      elName: 'DvEchartWind',
      title: '玫瑰图',
      isSvg: true,
      icon: 'echart-wind',
      attributeTabNavigation: [
        {
          label: '基础',
          value: 'componentLibs',
          elementUiIcon: 'tjIconfont tjfont-jichu'
        },
        {
          label: '标题',
          value: 'chartTitleComponentsLibs',
          elementUiIcon: 'tjIconfont tjfont-biaoti'
        }
      ],
      // 每个组件设置props来展示哪些显示哪些编辑项
      valueType: '', // 标识数据类型，用于表单组件
      defaultStyle: {
        width: 205,
        height: 180
      }
    }
  ]
}

