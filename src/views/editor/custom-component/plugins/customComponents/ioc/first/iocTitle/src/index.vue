<!--test.vue-->
<template>
  <div class="ioc-title">
    <div class="ioc-title-main">
      <h3>{{ comData.title }}</h3>
    </div>
  </div>
</template>
<!--预留标题组件-->
<script>
export default {
  name: 'IocTitle', // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
  props: {
    comData: {
      type: Object,
      default: () => {
        return {
          title: '标题'
        }
      }
    }
  },
  data() {
    return {
      defaultStyle: {
        height: 40
      }
    }
  }
}
</script>
<style lang="scss">
  .ioc-title {
    position: absolute;
    width: 100%;
    height: 100%;

    .ioc-title-main {
      //background-image: url("../../../../../../../../image/bgTitle.png");
      //background-size: cover;
      /*background: 100%;*/
      width: 100%;
      height: 100%;

      h3 {
        width: 100%;
        height: 100%;
        color: #fff;
        text-align: center;
        font-size: 34px;
      }
    }
  }
</style>
