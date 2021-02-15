<!--test.vue-->
<template>
  <div class="ioc-heder">
    <div class="ioc-heder-main">
      <svg-icon :icon-class="comData.icon" class-name="ioc-heder-main-icon" />
      <h3>{{ comData.title }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IocHeder', // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
  props: {
    comData: {
      type: Object,
      default: () => {
        return {
          icon: 'Ioc_Us_Title',
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
  .ioc-heder {
    .ioc-heder-main {
      display: flex;
      align-items: center;
      .ioc-heder-main-icon {
        width: 45px;
        height: 45px;
      }

      h3 {
        color: #fff;
        /*font-size: 30px;*/
        padding-left: 15px;
      }

    }
  }

</style>
