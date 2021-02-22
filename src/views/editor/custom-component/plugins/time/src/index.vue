<!--test.vue-->
<template>
  <div class="time">
    {{ time }}
  </div>
</template>

<script>
export default {
  name: 'GetTime', // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
  props: {
    time: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      defaultStyle: {
        height: 40
      },
      timeVal: this.time
    }
  },
  mounted() {
    setInterval(this.formatDate, 1000)
  },
  methods: {
    formatDate() {
      const date = new Date()
      this.timeVal = this.add(date.getHours()) + ':' + this.add(date.getMinutes()) + ':' + this.add(date.getSeconds())
    },
    add(num) {
      if (num < 10) {
        return '0' + num
      } else {
        return num
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
