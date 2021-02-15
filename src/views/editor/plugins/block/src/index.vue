<!--test.vue-->
<template>
  <div class="qk-block">
    <!--    <img :src="imageSrc" alt="">-->
  </div>
</template>

<script>
export default {
  name: 'Qkblock', // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
  props: {
    // imageSrc: {
    //   type: String,
    //   default: 'http://39.100.133.143:9801/static/img/visual/adorn/media/single-img.png'
    // }
  }
}
</script>

<style lang="scss" scoped>
.qk-image {
  width: 100%;
  height: 100%;
}

//img {
//  display: block;
//  width: 100%;
//  height: 100%;
//}
</style>
