<template>
  <div class="bas-com-padding">
    <div class="attr-item-title">占位提示文字：</div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-input
          v-model="tempText"
          type="textarea"
          :rows="2"
          placeholder="请输入占位提示文字"
          style="width: 100%;"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AttrQkPlaceholder',
  props: {
    placeholder: {
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
    placeholder(val) {
      this.tempText = val
    },
    tempText() {
      this.$emit('update:placeholder', this.tempText)
    }
  },
  mounted() {
    this.tempText = this.placeholder
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
