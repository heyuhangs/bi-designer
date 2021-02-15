<!--test.vue-->
<template>
  <chart
    ref="pie"
    :options="pie"
    :init-options="{'render':'canvas'}"
    theme="ovilia-green"
    autoresize
  />
</template>

<script>
import qs from 'qs'
import ECharts from '../../components/ECharts'
import 'echarts/lib/chart/pie'
// import { getInxData, selectData } from '@/utils/lseUtils'

export default {
  name: 'DvEchartNewPie', // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
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
          xAxisData: [
            { value: 10, name: '救护任务' },
            { value: 18, name: '出警任务' },
            { value: 22, name: '消防任务' }
          ]
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
          inxName: ''
        }
      }
    },
    /*
     * fieldArray: 组件需要的属性key
     */
    fieldArray: {
      type: Array,
      default: () => {
        return [{
          name: '环值',
          // field: '',
          componentsField: 'xAxisData',
          componentsFieldArr: [{
            title: '标题',
            value: 'name',
            field: ''
          }, {
            title: '环值',
            value: 'value',
            field: ''
          }]
        }]
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
      componentData: this.comData,
      initOptions: {
        renderer: options.renderer || 'canvas'
      },
      color: ['#53F9F0', '#05FDBC', '#0DB1F9']
    }
  },
  computed: {
    pie() {
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
    await this.initData()
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
      this.componentData = await getInxData(this.inxDataApi, this.fieldArray)
      console.log('getInxData-componentData', this.componentData)
    },
    async getApiData() {
      this.componentData = await selectData(this.apiObj)
    },
    getData() {
      const titleConfig = this.configObj.titleConfig
      const data = []
      this.componentData.xAxisData.forEach((item, index) => {
        data.push({
          value: item.value,
          name: item.name,
          itemStyle: {
            normal: {
              borderWidth: 5,
              shadowBlur: 20,
              borderColor: this.color[index],
              shadowColor: this.color[index]
            }
          }
        }, {
          value: 1,
          name: '',
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
              color: 'rgba(0,0,0,0)',
              borderColor: 'rgba(0,0,0,0)',
              borderWidth: 0
            }
          }
        })
      })
      const seriesData = [{
        name: '',
        type: 'pie',
        startAngle: '0',
        clockwise: false,
        radius: ['59.5%', '72.1%'],
        hoverAnimation: true,
        itemStyle: {
          normal: {
            label: {
              show: true,
              position: 'outside',
              color: '#0CA7EC',
              fontSize: 12,
              formatter: function(params) {
                if (params.name !== '') {
                  return params.value + '件'
                } else {
                  return ''
                }
              }
            },
            labelLine: {
              show: false,
              length: 25,
              length2: 30
            }
          }
        },
        data: data
      }, {
        type: 'pie',
        name: '',
        clockwise: false,
        hoverAnimation: false,
        radius: ['0', '100%'],
        z: '-1',
        itemStyle: {
          normal: {
            color: '#152731',
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          }
        },
        data: [{
          name: '',
          value: '50'
        }]
      }]
      return {
        tooltip: {
          show: false
        },
        title: titleConfig,
        color: this.color,
        graphic: {
          elements: [{
            type: 'image',
            z: 3,
            style: {
              image: ''
            },
            position: ['62', '6']
          }]
        },
        series: seriesData
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
