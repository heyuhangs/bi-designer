<template>
  <el-main class="com-map">
    <p class="page-title fontBold">地图样式</p>
    <div class="attr-item-edit-wrapper">
      <p class="attr-item-title">位置：</p>
      <el-row :gutter="20" style="width: 100%;">
        <el-col :span="12">
          <el-input-number
            v-model="mapConfig.lon"
            size="mini"
            controls-position="right"
            :min="0"
            style="width: 100%;"
          />
          <div class="attr-item-edit-input-des">经度</div>
        </el-col>
        <el-col :span="12">
          <el-input-number
            v-model="mapConfig.lan"
            size="mini"
            controls-position="right"
            :min="0"
            style="width: 100%;"
          />
          <div class="attr-item-edit-input-des">纬度</div>
        </el-col>
      </el-row>
    </div>
    <!--    -->
    <div class="attr-item-edit-wrapper">
      <p class="attr-item-title">缩放比例：</p>
      <el-row :gutter="20" style="width: 100%;">
        <el-col :span="24">
          <el-slider
            v-model="mapConfig.zoom"
            :step="1"
            show-stops
            :min="3"
            :max="18"
          />
        </el-col>
      </el-row>
    </div>
  </el-main>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  // components: {
  // },
  data() {
    return {
      mapConfig: {},
      lon: 0,
      lan: 0
    }
  },
  computed: {
    ...mapState({
      activeElementUUID: state => state.editor.activeElementUUID
    }),
    ...mapGetters([
      'activeElement'
    ])
  },
  watch: {
    mapConfig: {
      handler(newVal, oldVal) {
        this.activeElement.propsValue.configObj.mapConfig = this.mapConfig
      },
      deep: true
    }
  },
  created() {
    this.mapConfig = this.activeElement.propsValue.configObj.mapConfig
    console.log('mapConfig', this.mapConfig)
  },
  mounted() {
  },
  methods: {}
}
</script>

<style lang="scss">
  .com-map {
    padding: 0;
    .attr-item-title {
      text-align: left;
      min-width: 60px;
      font-size: 12px;
      line-height: 28px;
    }
    .attr-item-edit-input-des {
      text-align: center;
      line-height: 12px;
      margin-top: 5px;
      font-size: 12px;
      color: #606266;
    }
    .el-slider__runway {
      background-color: #292E33;
      margin-top: 11px;
      margin-bottom: 11px;
    }
    .el-slider__stop {
      height: 2px;
      width: 2px;
      border-radius: 1px;
      background-color: #909399;
      top: 2px;
    }
  }
</style>
