<!--test.vue-->
<template>
  <div class="date">
    {{ formatDate() }}
  </div>
</template>

<script>
export default {
  name: 'GetDate', // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
  // props: {
  // date: {
  //   type: Object,
  //   default: () => {
  //     return new Date()
  //   }
  // }
  // },
  data() {
    return {
      defaultStyle: {
        height: 40
      }
    }
  },
  created() {
    setInterval(this.formatDate, 1000)
  },
  methods: {
    formatDate() {
      const date = new Date()
      return date.getFullYear() + '-' + this.add(date.getMonth()) + '-' + this.add(date.getDay())
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
