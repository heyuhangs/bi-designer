<!--test.vue-->
<template>
  <chart
    ref="lineBar"
    :options="lineBar"
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
  name: 'DvEchartLineBar', // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
  components: {
    chart: ECharts
  },
  props: {
    comData: {
      type: Object,
      default: () => {
        return {
          // seriesData: [20, 50, 80, 58, 83, 68, 57, 80, 42, 66],
          xAxisData: ['a', 'b', 'c', 'd', 'e'],
          seriesBarData: [19, 12, 8, 6, 2],
          seriesLineData: [30, -10, 15, -5, 5]
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
      lineBar: this.getData(),
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
      this.lineBar = this.getData()
    }
  },
  methods: {
    getData() {
      // 标题配置
      const titleConfig = this.configObj.titleConfig
      const xAxisData = this.comData.xAxisData
      const seriesBarData = this.comData.seriesBarData
      const seriesLineData = this.comData.seriesLineData
      return {
        title: titleConfig,
        legend: {
          data: ['环比值'],
          right: 30,
          textStyle: {
            color: '#A4AAA8',
            fontSize: 12
          }
        },
        xAxis: [
          {
            type: 'category',
            data: xAxisData,
            axisPointer: {
              type: 'shadow'
            },
            axisLabel: {
              color: '#fff'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '频发诉求（件）',
            min: -20,
            max: 20,
            interval: 10,
            axisLabel: {
              formatter: '{value}',
              color: '#80848F'
            },
            nameTextStyle: {
              color: '#D5E8F6',
              fontWeight: 'bolder',
              fontSize: '12',
              padding: [0, 0, 0, 30]
            }
          },
          {
            type: 'value',
            name: '环比值',
            min: -40,
            max: 40,
            interval: 20,
            axisLabel: {
              formatter: '{value} %',
              color: '#80848F'
            },
            nameTextStyle: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '频发诉求',
            type: 'bar',
            data: seriesBarData,
            barWidth: 10,
            itemStyle: {
              color: '#0CE062',
              barBorderRadius: 5
            }
          },
          {
            name: '环比值',
            type: 'line',
            yAxisIndex: 1,
            showSymbol: false,
            data: seriesLineData,
            itemStyle: {
              color: '#B01F53'
            },
            lineStyle: {
              color: '#B01F53',
              width: 3
            }
          }
        ]
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
