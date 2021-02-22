<template>
  <div class="loading">
    <div class="loading-con">
      <svg-icon class="loading-icon" icon-class="loading" />
      <p>加载中~~~</p>
    </div>
    <div class="loading-bg"></div>
  </div>
</template>

<script>
export default {
  name: 'loading',
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.loading{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999999999999999999999999999;
  width: 100%;
  height: 100vh;
}
.loading-bg {
  idth: 100%;
  height: 100vh;
  background-color: rgb(51,51,51,0.55);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  //opacity: .45;
}
.loading-con{
  position: fixed;
  top: 50%;
  margin-top: -60px;
  color: #fff;
  font-size: 14px;
  left: 50%;
  margin-left: -50px;
  p{
    margin-top: 5px;
  }
}
.loading-icon{
  width: 62px;
  height: 62px;
}
</style>
