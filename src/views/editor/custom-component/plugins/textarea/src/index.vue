<!--test.vue-->
<template>
  <div class="qk-textarea">
    <textarea v-model="tempValue" class="qk-textarea-item" :placeholder="placeholder" />
  </div>
</template>
<script>
export default {
  name: 'QkTextarea',
  props: {
    placeholder: {
      type: String,
      default: '请输入'
    },
    value: {
      type: String,
      require: false,
      default: ''
    }
  },
  data() {
    return {
      tempValue: ''
    }
  },
  watch: {
    value(val) {
      this.tempValue = val
    },
    tempValue() {
      this.$emit('input', this.temp)
    }
  },
  created() {
    this.tempValue = this.value
  }
}
</script>

<style lang="scss" scoped>
  .qk-textarea-item {
    display: block;
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
  }
</style>
