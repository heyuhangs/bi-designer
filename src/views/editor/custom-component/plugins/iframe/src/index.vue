<!--test.vue-->
<template>
  <div class="qk-iframe">
    <iframe :src="url" frameborder="0" style="background-color:transparent;width: 100%; min-height: 100%;" />
  </div>
</template>

<script>
export default {
  name: 'QkIframe', // 这个名字很重要，它就是未来的标签名
  props: {
    url: {
      type: String,
      default: 'http://m.baidu.com/'
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  .qk-iframe{
    width: 100%;
    height: 100%;
  }
</style>
