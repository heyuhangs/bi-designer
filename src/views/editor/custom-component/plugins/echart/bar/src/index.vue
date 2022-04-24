<!--test.vue-->
<template>
  <chart
    ref="bar"
    :options="bar"
    :init-options="initOptions"
    theme="ovilia-green"
    autoresize
  />
</template>

<script>
import qs from 'qs'
import ECharts from '../../components/ECharts'
import 'echarts/lib/chart/bar'

export default {
  name: 'DvEchartBar', // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
  components: {
    chart: ECharts
  },
  props: {
    /*
     * 数据配置
     * */
    // 静态数据
    comData: {
      type: Object,
      default: () => {
        return {
          yAxisData: [3.5, 3.8, 3.5, 3.1, 3.5, 3.8, 3.5, 3.1, 3.5, 3.8, 3.5, 3.5],
          xAxisData: ['13:30', '13:40', '13:50', '14:00', '14:10', '14:20', '14:30', '14:40', '14:50', '15:00', '15:10', '15:20']
        }
      }
    },
    // api接口数据
    apiObj: {
      type: Object,
      default: () => {
        return {
          url: '',
          reqType: 'get'
        }
      }
    },
    // 指标数据
    inxDataApi: {
      type: Object,
      default: () => {
        return {
          inxRow: {},
          inxName: '',
          /*
          * fieldArray: 组件需要的属性key
          * */
          fieldArray: [{
            name: 'X轴字段',
            field: '',
            componentsField: 'xAxisData',
            componentsObjFieldName: []
          }, {
            name: 'Y轴字段',
            field: '',
            componentsField: 'yAxisData',
            componentsObjFieldName: []
          }]
        }
      }
    },
    /*
     * dataType: 组件需要的属性key
     * 静态数据: 1
     * 指标数据: 2
     * api方式: 3
     * */
    dataType: {
      type: String,
      default: '1'
    },
    // 设置echart标题配置
    configObj: {
      type: Object,
      default: () => {
        return {
          // 标题配置
          titleConfig: {
            show: false,
            top: 'top',
            left: 'center',
            text: '标题',
            textStyle: {
              color: '#fff',
              fontWeight: 'normal',
              fontSize: '18px'
            }
          }
        }
      }
    }
  },
  data() {
    const options = qs.parse(location.search, { ignoreQueryPrefix: true })
    return {
      componentData: this.comData,
      initOptions: {
        renderer: options.renderer || 'canvas'
      }
    }
  },
  computed: {
    bar() {
      return this.getData()
    }
  },
  watch: {
    comData(val) {
      this.componentData = { ...this.comData }
    },
    inxDataApi(val) {
      this.getInxData()
    },
    apiObj(val) {
      this.getApiData()
    }
  },
  async created() {
    this.initData()
  },
  methods: {
    async initData() {
      /*
        dataType
        * 1:静态数据
        * 2:指标数据
        * 3:API数据
      */
      switch (this.dataType) {
        case '1':
          this.componentData = this.comData
          break
        case '2':
          await this.getInxData()
          break
        case '3':
          await this.getApiData()
          break
        default:
      }
    },
    async getInxData() {
      this.componentData = await getInxData(this.inxDataApi)
    },
    async getApiData() {
      this.componentData = await selectData(this.apiObj)
    },
    getData() {
      // 标题配置
      const titleConfig = this.configObj.titleConfig
      return {
        title: titleConfig,
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.componentData.xAxisData || [],
          axisLine: {
            show: true,
            lineStyle: {
              color: '#063374',
              width: 1,
              type: 'solid'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            interval: 0,
            formatter: function(value, index) {
              if (index % 2 !== 0) {
                return '\n\n' + value
              } else {
                return value
              }
            },
            textStyle: {
              color: '#00c7ff'
            }
          }
        }],
        yAxis: [{
          type: 'value',
          axisLabel: {
            formatter: '{value}',
            color: '#fff'
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#00c7ff',
              width: 1,
              type: 'solid'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: '#063374'
            }
          }
        }],
        series: [{
          type: 'bar',
          data: this.componentData.yAxisData || [],
          barWidth: 10,
          // barGap: 1, //柱子之间间距
          itemStyle: {
            normal: {
              color: '#0098FD',
              opacity: 1
            }
          }
        }]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>
