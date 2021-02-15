<!--test.vue-->
<template>
  <chart
    ref="Wind"
    :options="Wind"
    :init-options="initOptions"
    theme="ovilia-green"
    autoresize
  />
</template>

<script>
import qs from 'qs'
import ECharts from '../../components/ECharts'
// import ech/arts from 'echarts'
// import 'echarts/lib/chart/l'

export default {
  name: 'DvEchartWind', // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
  components: {
    chart: ECharts
  },
  props: {
    comData: {
      type: Object,
      default: () => {
        return {
          seriesData: [1.81, 0.62, 0.82, 0.59, 0.62, 1.22, 1.61, 2.04, 2.66, 2.96, 2.53, 1.97, 1.64, 1.32, 1.58, 1.51],
          angleAxisData: ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
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
            text: '风玫瑰图',
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
      Wind: this.getData(),
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
      this.Wind = this.getData()
    }
  },
  methods: {

    getData() {
      // 标题配置
      const seriesData = this.comData.seriesData
      const angleAxisData = this.comData.angleAxisData
      const titleConfig = this.configObj.titleConfig
      return {
        title: titleConfig,
        angleAxis: {
          type: 'category',
          data: angleAxisData,
          z: 0,
          boundaryGap: false,
          axisLabel: {
            show: false,
            color: 'white',
            fontSize: 10,
            margin: 4
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#ddd',
              type: 'solid'
            }
          },
          axisLine: {
            show: false
          }
        },
        radiusAxis: {},
        polar: {},
        series: [{
          type: 'line',
          data: seriesData,
          smooth: true,
          coordinateSystem: 'polar',
          name: '<0.5m/s',
          stack: 'a',
          itemStyle: {
            normal: {
              color: 'rgb(124, 181, 236)'
            }
          },
          lineStyle: {
            color: '#1D7085'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#2E8085' // 0% 处的颜色
              }, {
                offset: 1, color: '#174FCB' // 100% 处的颜色
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
