<!--test.vue-->
<template>
  <div class="blueBar">
    <div class="blue-num">总数量 <span>{{ count }}个</span></div>
    <svg-icon class-name="card-panel-icon" icon-class="bar" class="bar-line-btm-blue" />
    <chart
      ref="bar"
      :options="bar"
      :init-options="initOptions"
      theme="ovilia-green"
      autoresize
    />
  </div>
</template>

<script>
import qs from 'qs'
import ECharts from '../../components/ECharts'
// import echarts from 'echarts'
import 'echarts/lib/chart/bar'

export default {
  name: 'DvEchartHorizontalBarBlue', // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
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
          name: ['烟感', '温度', '声光', '排烟', '用电'],
          value: [18, 14, 10, 6, 2]
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
            name: '设施名',
            field: '',
            componentsField: 'name',
            componentsObjFieldName: []
          }, {
            name: '设施数量',
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
      count: ''
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
    this.componentData.value.forEach(item => {
      this.count += item
    })
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
      let a = 0
      this.componentData.value.forEach(item => {
        a += item
      })
      this.count = a
      // 标题配置
      const titleConfig = this.configObj.titleConfig
      return {
        title: titleConfig,
        grid: {
          top: '1%',
          left: '2.6%',
          right: '1%',
          bottom: '0.1%',
          containLabel: true
        },
        xAxis: {
          show: false
        },
        yAxis: [{
          show: true,
          inverse: true,
          data: this.componentData.name,
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0,
            color: '#768F99',
            fontSize: 13,
            rich: {
              title: {
                width: 165
              }
            }
          }
        }, {
          show: true,
          inverse: true,
          data: this.componentData.value,
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0,
            color: ['#768F99'],
            fontSize: 13,
            formatter: function(value) {
              return value + '个'
            }
          }
        }],
        series: [{
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            normal: {
              opacity: '0'
            }
          },
          data: this.componentData.value,
          yAxisIndex: 0,
          barWidth: 12,
          barCategoryGap: 15,
          itemStyle: {
            normal: {
              color: new ECharts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: 'rgba(11,207,252)'
              }, {
                offset: 1,
                color: 'rgba(11,207,252,0.3)'
              }], false),
              barBorderRadius: 6
            }
          }
        }]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.blueBar {
  height: 200px;
  .blue-num {
    text-align: left;
    padding-left: 8px;
    padding-top: 10px;
    height: 13px;
    font-size: 12px;
    color: #FFFFFF;

    span {
      color: rgba(11,207,252);
    }
  }
  .bar-line-btm-blue {
    width: 100%;
    height: 7px;
  }
  .echarts {
    width: 100%;
    height: 75%;
    padding: 0;
    margin: 0;
  }
}
</style>
