<!--test.vue-->
<template>
  <chart
    ref="Waterfall"
    :options="Waterfall"
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
  name: 'DvEchartWaterfall', // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
  components: {
    chart: ECharts
  },
  props: {
    comData: {
      type: Object,
      default: () => {
        return {
          seriesData: [200, 400, 200, 200],
          seriesDataUp: [200, 1500, 1100, 200],
          xAxisData: ['热线接线人员', '专业调查人员', '热心民众', '执法人员']
        }
      }
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
      Waterfall: this.getData(),
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
      this.Waterfall = this.getData()
    }
  },
  methods: {
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
          data: this.comData.xAxisData || [],
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
          max: 2500,
          min: 0,
          interval: 500,
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
          data: this.comData.seriesData || [],
          stack: '总量',
          barWidth: 10,
          // barGap: 1, //柱子之间间距
          itemStyle: {
            normal: {
              color: '#fff',
              opacity: 0
            }
          }
        }, {
          type: 'bar',
          data: this.comData.seriesDataUp || [],
          stack: '总量',
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
