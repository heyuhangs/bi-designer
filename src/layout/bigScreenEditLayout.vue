<template>
  <div :class="{hideHeader: $route.meta.hideHeader}">
    <div v-show="!$route.meta.hideHeader" class="page-header-wrapper">
      <page-header />
    </div>
    <app-main />
  </div>
</template>
<script>
import PageHeader from '../components/page-header'
import AppMain from './AppMain'
export default {
  components: {
    [PageHeader.name]: PageHeader,
    AppMain
  }
}
</script>
<style lang="scss">
  html,body{
    position: relative;
    height: 100%;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #fff;
    position: relative;
    height: 100%;
    /*background: #1e1e1e !important;*/
    /*padding-top: 48px;*/
    /*.page-header-wrapper{*/
    /*  position: absolute;*/
    /*  top: 0;*/
    /*  left: 0;*/
    /*  width: 100%;*/
    /*  z-index: 100;*/
    /*}*/
    &.hideHeader{
      padding-top: 0;
    }
  }
  .sub-page{
    position: relative;
    height: 100%;
  }

</style>
