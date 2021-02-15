<!--test.vue-->
<template>
  <div class="num-card">
    <h3 class="num-card-title">{{ comData.title }}</h3>
    <div class="num-card-num">{{ comData.num }}</div>
    <span class="num-card-suffix">{{ comData.suffix }}</span>
    <!--    <count-to-->
    <!--      ref="example"-->
    <!--      start-val="0"-->
    <!--      :end-val="data.endVal"-->
    <!--      :duration="data.duration"-->
    <!--      :decimals="data.decimals"-->
    <!--      :separator="data.separator"-->
    <!--      :prefix="data.prefix"-->
    <!--      :suffix="data.suffix"-->
    <!--      :autoplay="false"-->
    <!--      class="example"-->
    <!--    />-->
  </div>
</template>

<script>
// import countTo from 'vue-count-to'

export default {
  name: 'IocUsNum', // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
  // components: { countTo },
  props: {
    comData: {
      type: Object,
      default: () => {
        return {
          title: '力量部署',
          num: '3080',
          suffix: '个'
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

<style lang="scss" scoped>
  .num-card {
    display: flex;
    justify-content : flex-start;
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .num-card .num-card-title {
    font-weight: normal;
    font-size: 21px;
    color: #fff;
    padding-top: 14px;
    margin-right: 12px;
  }

  .num-card .num-card-num {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "\\5FAE软雅黑", Arial, sans-serif;
    color: rgb(255, 192, 0);
    font-size: 47px;
    letter-spacing: 1px;
    /*font-weight: bold;*/
    margin: 0 15px;
  }

  .num-card .num-card-suffix {
    color: #fff;
    padding-top: 32px;
  }
</style>
