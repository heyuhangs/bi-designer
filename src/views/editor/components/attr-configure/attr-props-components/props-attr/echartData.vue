<template>
  <div>
    <el-popover
      placement="left-end"
      width="400"
      trigger="click"
      @hide="popoverClose"
      @show="popoverShow"
    >
      <div>
        <json-editor ref="echartDataJson" v-model="echartData" />
        <!--        <json-editor ref="xAxisDataJson" v-model="echartData.xAxisData" />-->
      </div>
      <el-button slot="reference">编辑数据</el-button>
    </el-popover>
  </div>
</template>

<script>
import JsonEditor from '@/components/JsonEditor'
import { mapGetters } from 'vuex'

export default {
  name: 'AttrQkEchartData',
  components: { JsonEditor },
  props: {
    echartData: {
      type: Object,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      data: {}
    }
  },
  computed: {
    ...mapGetters([
      'activeElement'
    ])
  },
  // mounted() {
  //   this.echartData = JSON.stringify(this.echartData)
  // },
  methods: {
    popoverClose() {
      this.activeElement.propsValue.echartData = JSON.parse(this.$refs.echartDataJson.getValue())
      this.$emit('update:echartData', this.activeElement.propsValue.echartData)
    },
    popoverShow() {
      this.$refs.echartDataJson.refere()
    }
  }
}
</script>

<style scoped>

</style>
