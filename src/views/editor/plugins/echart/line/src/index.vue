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
  name: 'DvEchartMultilayeredLine', // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
  components: {
    chart: ECharts
  },
  props: {
    comData: {
      type: Object,
      default: () => {
        return {
          seriesData: [24, 22, 24, 25, 24]
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
    }
  },
  methods: {
    getData() {
      // 标题配置
      const titleConfig = this.configObj.titleConfig
      return {
        title: titleConfig,
        left: 15,
        xAxis: {
          type: 'category',
          axisLine: { //  改变x轴颜色
            lineStyle: {
              color: '#26D9FF'
            }
          },
          axisLabel: { //  改变x轴字体颜色和大小
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
          axisLine: { //  改变y轴颜色
            show: true,
            lineStyle: {
              color: '#545155'
            }
          },
          axisLabel: { //  改变y轴字体颜色和大小
            // formatter: '{value} m³ ', //  给y轴添加单位
            textStyle: {
              color: '#808892',
              fontSize: 10
            },
            margin: 4
          },
          axisTick: {
            show: true
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
          data: this.comData.seriesData,
          itemStyle: {
            normal: {
              color: '#86763C',
              borderColor: '#86763C',
              borderWidth: 2
            }
          },
          lineStyle: {
            normal: {
              width: 2,
              color: '#86763C',
              shadowColor: '#86763C',
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
                color: 'rgba(137,126,45,1)' // 0% 处的颜色
              }, {
                offset: 1,
                color: 'rgba(137,126,45,0)' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          }
        }, {
          type: 'line',
          smooth: true,
          data: [26, 24, 26, 27, 26],
          itemStyle: {
            normal: {
              color: '#9C7E0A',
              borderColor: '#F4C907',
              borderWidth: 2
            }
          },
          lineStyle: {
            normal: {
              width: 2,
              color: '#fff',
              shadowColor: '#fff',
              shadowBlur: 10
            }
          }
        }, {
          type: 'line',
          smooth: true,
          data: [30, 28, 30, 31, 30],
          itemStyle: {
            normal: {
              color: '#fff',
              borderColor: '#fff',
              borderWidth: 2
            }
          },
          lineStyle: {
            normal: {
              width: 2,
              color: '#fff',
              shadowColor: '#fff',
              shadowBlur: 10
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
