<template>
  <div class="bas-com-padding">
    <div class="attr-item-title">url地址：</div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-input
          v-model="tempValue"
          type="textarea"
          :rows="3"
          placeholder="请输入url地址"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AttrQkUrl',
  props: {
    url: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data() {
    return {
      tempValue: ''
    }
  },
  watch: {
    url(val) {
      this.tempValue = val
    },
    tempValue() {
      this.$emit('update:url', this.tempValue)
    }
  },
  mounted() {
    this.tempValue = this.url
  }
}
</script>

<style scoped>
  .attr-item-title {
    text-align: left;
    min-width: 60px;
    font-size: 12px;
    line-height: 28px;
    color: #C0C4CC;
  }
</style>
