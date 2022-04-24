<!--test.vue-->
<template>
  <chart
    ref="radar"
    :options="radar"
    :init-options="{'render':'canvas'}"
    theme="ovilia-green"
    autoresize
  />
</template>

<script>
import qs from 'qs'
import ECharts from '../../components/ECharts'
import 'echarts/lib/chart/radar'

export default {
  name: 'DvEchartRadarLeft', // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
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
          name: ['风向'],
          // value: [19, 20, 27, 20, 17, 18, 28, 16, 19, 20, 19, 22, 23, 20, 21, 15]
          value: [12, 11, 11, 14, 11, 7]
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
            componentsField: 'name',
            componentsObjFieldName: []
          }, {
            name: 'Y轴字段',
            field: '',
            componentsField: 'value',
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
    radar() {
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
    getSeriesData(data) {
      const sData = []
      sData.push({
        name: data.name,
        lineStyle: {
          color: '#2F505F'
        },
        label: {
          show: false
        },
        areaStyle: {
          color: '#2F505F'
        },
        value: data.value
      })
      return sData
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
        tooltip: {
          show: false,
          trigger: 'item'
        },
        radar: {
          name: {
            show: false,
            textStyle: {
              color: '#849FA6',
              borderRadius: 3
            }
          },
          center: ['50%', '50%'],
          radius: '80%',
          splitArea: {
            areaStyle: {
              color: ['#1d262d']
            }
          },
          axisLine: {
            lineStyle: {
              color: '#4b545b'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#4b545b'
            }
          },
          splitNumber: 3,
          shape: 'circle',
          indicator: [
            // { name: 'N', max: 30 },
            // { name: 'NNW', max: 30 },
            // { name: 'NW', max: 30 },
            // { name: 'WNW', max: 30 },
            // { name: 'W', max: 30 },
            // { name: 'WSW', max: 30 },
            // { name: 'SW', max: 30 },
            // { name: 'SSW', max: 30 },
            // { name: 'S', max: 30 },
            // { name: 'SSE', max: 30 },
            { name: 'SE', max: 30 },
            { name: 'ESE', max: 30 },
            { name: 'E', max: 30 },
            { name: 'ENE', max: 30 },
            { name: 'NE', max: 30 },
            { name: 'NNE', max: 30 }
          ]
        },
        series: [{
          type: 'radar',
          data: this.getSeriesData(this.componentData) || [],
          itemStyle: {
            normal: {
              opacity: 0
            }
          }
        }, {
          type: 'pie',
          name: 'a',
          data: {
            value: [100],
            itemStyle: {
              normal: {
                color: '#fff'
              }
            }
          },
          center: ['50%', '50%'],
          radius: ['80%', '100%']
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
