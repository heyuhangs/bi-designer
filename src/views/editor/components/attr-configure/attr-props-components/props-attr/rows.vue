<template>
  <div class="bas-com-padding">
    <div class="attr-item-title">占行数：</div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-input-number v-model="temp" size="mini" controls-position="right" :min="1" style="width: 100%" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AttrQkRows',
  props: {
    rows: {
      type: Number,
      default: () => {
        return ''
      }
    }
  },
  data() {
    return {
      temp: 3
    }
  },
  watch: {
    rows(val) {
      this.temp = val
    },
    tempText() {
      this.$emit('update:rows', this.temp)
    }
  },
  mounted() {
    this.temp = this.rows
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
