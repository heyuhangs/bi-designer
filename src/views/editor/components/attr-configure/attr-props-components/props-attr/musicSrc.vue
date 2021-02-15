<template>
  <div class="bas-com-padding">
    <div class="attr-item-title">资源地址：</div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-input
          v-model="tempValue"
          type="textarea"
          :rows="3"
          placeholder="请输入url地址"
          style="width: 100%;"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AttrQkMusicSrc',
  props: {
    musicSrc: {
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
    musicSrc(val) {
      this.tempValue = val
    },
    tempValue() {
      this.$emit('update:musicSrc', this.tempValue)
    }
  },
  mounted() {
    this.tempValue = this.musicSrc
  }
}
</script>

<style scoped>

</style>
