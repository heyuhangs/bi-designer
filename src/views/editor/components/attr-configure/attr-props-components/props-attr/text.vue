<template>
  <div class="bas-com-padding">
    <div class="attr-item-title">文本内容：</div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-input
          v-model="tempText"
          type="textarea"
          :rows="2"
          placeholder="请输入文本内容"
          style="width: 100%;"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AttrQkText',
  props: {
    text: {
      type: String,
      default: () => {
        return ''
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

<style scoped>
  .attr-item-title {
    text-align: left;
    min-width: 60px;
    font-size: 12px;
    line-height: 28px;
    color: #C0C4CC;
  }
</style>
