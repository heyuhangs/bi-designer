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
// import echarts from 'echarts'
import 'echarts/lib/chart/radar'

export default {
  name: 'DvEchartRadar', // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
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
          name: ['社会局', '应急局', '消防队'],
          value: [[92, 77, 80, 88, 60], [90, 92, 65, 95, 70], [88, 80, 91, 81, 79]]
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
      },
      color: ['#53F9F0', '#05FDBC', '#0DB1F9']
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
      data.name.forEach((item, index) => {
        sData.push({
          name: item,
          lineStyle: {
            color: this.color[index]
          },
          label: {
            show: true,
            color: this.color[index]
          }
        })
      })
      data.value.forEach((item, index) => {
        sData[index].value = item
        if (index === 0) {
          sData[index].label.position = 'top'
        } else if (index === 1) {
          sData[index].label.position = 'left'
        } else {
          sData[index].label.position = 'bottom'
        }
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
          show: true,
          trigger: 'item'
        },
        radar: {
          name: {
            textStyle: {
              color: '#849FA6',
              borderRadius: 3
            }
          },
          indicator: [
            { name: '事件完成率', max: 100 },
            { name: '处置力量', max: 100 },
            { name: '联动机制', max: 100 },
            { name: '信息化能力', max: 100 },
            { name: '协同效率', max: 100 }
          ]
        },
        series: [{
          type: 'radar',
          data: this.getSeriesData(this.componentData) || [],
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
