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
import 'echarts/lib/chart/pie'

export default {
  name: 'DvEchartPie', // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
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
          seriesData: [
            { value: 29 },
            { value: 42 },
            { value: 23 }
          ],
          xAxisData: [
            { value: 125.3, name: '低洼地积水预警a' },
            { value: 55.3, name: '低洼地积水预警s' },
            { value: 105.3, name: '低洼地积水预警d' }
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
          name: '内图值',
          // field: '',
          componentsField: 'seriesData',
          componentsFieldArr: [{
            title: '内图值',
            value: 'value',
            field: ''
          }]
        }, {
          name: 'X轴字段',
          // field: '',
          componentsField: 'xAxisData',
          componentsFieldArr: [{
            title: '标题',
            value: 'name',
            field: ''
          }, {
            title: 'X轴值',
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
      return {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        title: titleConfig,
        color: ['#2561A9', '#123D72', '#268DB7', '#1E5EA8', '#B39847', '#07396C'],
        // legend: {
        //
        //   orient: 'vertical',
        //   x: 'left',
        //   data: ['测试集总H', '测试集总M', '测试集总L']
        // },
        series: [
          {
            name: '测试集',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],
            startAngle: 160,
            label: {
              normal: {
                position: 'inner',
                bleedMargin: 4
              }
            },
            labelLine: {
              normal: {
                show: false,
                length: 3,
                length2: 3
              }
            },
            data: this.componentData.seriesData || []
          },
          {
            name: '分类',
            type: 'pie',
            radius: ['40%', '55%'],
            startAngle: 150,
            label: {
              normal: {
                formatter: '{b|{b}}\n{c|{c}} ',
                position: 'outside',
                align: 'right',
                rich: {

                  b: {
                    fontSize: 16,
                    color: '#30EDF1'
                  },
                  c: {
                    color: '#30EDF1'
                  }
                }
              }
            },
            labelLine: {
              length: 10,
              length2: 3
            },
            data: this.componentData.xAxisData || []
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
