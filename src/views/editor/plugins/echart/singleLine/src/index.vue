<!--test.vue-->
<template>
  <chart
    ref="line"
    :options="line"
    :init-options="initOptions"
    theme="ovilia-green"
    autoresize
  />
</template>

<script>
import qs from 'qs'
import ECharts from '../../components/ECharts'
// import echarts from 'echarts'
import 'echarts/lib/chart/bar'

export default {
  name: 'DvEchartSingleLine', // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
  components: {
    chart: ECharts
  },
  props: {
    comData: {
      type: Object,
      default: () => {
        return {
          yAxisData: [0.2, 0.45, 0.38, 0.2, 0.18, 0.38, 0.35, 0.4, 0.7, 0.5, 0.25, 0.2],
          xAxisData: ['13:30', '13:40', '13:50', '14:00', '14:10', '14:20', '14:30', '14:40', '14:50', '15:00', '15:10', '15:20']
        }
      }
    },
    inxDataApi: {
      type: Object,
      default: () => {
        return {
          inxRow: {},
          inxName: '',
          inxX: '',
          inxY: ''
        }
      }
    },
    dataType: {
      type: String,
      default: '3'
    },
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
      line: this.getData(),
      initOptions: {
        renderer: options.renderer || 'canvas'
      }
    }
  },
  // computed: {
  //   ecData() {
  //     return this.echartData
  //   }
  // },
  watch: {
    comData() {
      this.line = this.getData()
    },
    dataType(val) {
      if (val === '2') {
        // this.getData()
      }
      if (val === '3') {
        // this.getData()
      }
    }
  },
  methods: {
    getData() {
      // 标题配置
      const titleConfig = this.configObj.titleConfig
      return {
        title: titleConfig,
        xAxis: {
          type: 'category',
          data: this.comData.xAxisData || [],
          axisLine: { //  改变x轴颜色
            lineStyle: {
              color: '#26D9FF'
            }
          },
          axisLabel: { //  改变x轴字体颜色和大小
            interval: 0,
            formatter: function(value, index) {
              if (index % 2 !== 0) {
                return '\n\n' + value
              } else {
                return value
              }
            },
            textStyle: {
              color: 'rgba(250,250,250,0.6)'
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: ['#315070'],
              width: 1,
              type: 'solid'
            }
          }
        },
        yAxis: {
          type: 'value',
          interval: 0.2,
          axisLine: { //  改变y轴颜色
            show: false,
            lineStyle: {
              color: '#26D9FF'
            }
          },
          axisLabel: { //  改变y轴字体颜色和大小
            formatter: '{value}',
            textStyle: {
              color: 'rgba(250,250,250,0.6)',
              fontSize: 10
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: ['#315070'],
              width: 1,
              type: 'solid'
            }
          }
        },
        series: [{
          type: 'line',
          smooth: true,
          data: this.comData.yAxisData || [],
          itemStyle: {
            normal: {
              color: '#0C7E5C',
              borderColor: '#17D8A1',
              borderWidth: 2
            }
          },
          lineStyle: {
            normal: {
              width: 2,
              color: '#1D92D1',
              shadowColor: '#1D92D1',
              shadowBlur: 10
            }
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: 'rgba(38,156,192,1)' // 0% 处的颜色
              }, {
                offset: 1,
                color: 'rgba(38,156,192,0)' // 100% 处的颜色
              }],
              global: false // 缺省为 false
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
