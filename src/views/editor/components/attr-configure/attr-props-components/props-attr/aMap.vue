<template>
  <div class="screen-mp-bg">
    <div class="attr-item-edit-wrapper">
      <p class="attr-item-title">显示：</p>
      <el-row :gutter="20" style="width: 100%;">
        <el-col :span="12">
          <el-input
            v-model="aMap.lon"
            type="text"
            placeholder="请输入经度"
            style="width: 100%"
          />
          <div class="attr-item-edit-input-des">经度：</div>
        </el-col>
        <el-col :span="12">
          <el-input
            v-model="aMap.lan"
            type="text"
            placeholder="请输入纬度"
          />
          <div class="attr-item-edit-input-des">纬度：</div>
        </el-col>
      </el-row>
    </div>
    <div class="attr-item-edit-wrapper">
      <p class="attr-item-title">缩放：</p>
      <el-row :gutter="20" style="width: 100%;">
        <el-col :span="23">
          <el-slider
            v-model="aMap.zoom"
            :step="1"
            show-stops
            :min="3"
            :max="18"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AttrQkAMap',
  props: {
    aMap: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      tempText: ''
    }
  },
  watch: {
    text() {
      this.tempText = this.text
    },
    tempText() {
      this.$emit('update:text', this.tempText)
    }
  },
  mounted() {
    this.tempText = this.text
  }
}
</script>

<style lang="scss" scoped>
  .attr-item-edit-wrapper {
    padding-left: 18px;
    display: flex;
    width: 100%;
    text-align: center;
    padding-bottom: 10px;
    .attr-item-title {
      text-align: left;
      min-width: 60px;
      line-height: 28px;
      height: 28px;
      font-size: 12px;
    }
    .attr-item-edit-input-des {
      text-align: center;
      line-height: 12px;
      margin-top: 5px;
      font-size: 12px;
      color: #606266;
    }
  }
</style>
<style lang="scss">
  .screen-mp-bg {
    .el-slider__runway {
      margin-right: 108px !important;
      background-color: #1F2327 !important;
      margin-top: 11px !important;
      margin-bottom: 11px !important;
    }
    .el-slider__stop {
      background-color: #909399;
      width: 2px;
      height: 2px;
      border-radius: 1px;
      top: 2px;
    }
  }
  .el-radio__inner {
    background-color: #292E33;
    border-color: #33393F;
 }
  .el-radio {
    color: #606266;
  }
  .el-radio.is-bordered {
    border-color: #292E33;
  }
</style>
