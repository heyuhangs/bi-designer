<template>
  <div class="components-page-header">
    <div class="logo-wrapper cursor-pointer" @click="$router.push('/')">
      <span>{{ navInfo.title }}</span>
      <span class="project-title">项目管理</span>
    </div>
    <slot />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import './night-variables.scss'

export default {
  name: 'Header',
  data() {
    return {
      navInfo: {}
    }
  },
  computed: {
    ...mapGetters([
      'bigScreenNavInfo'
    ])
  },
  // watch: {
  //   $route(route) {
  //     // if you go to the redirect page, do not update the breadcrumbs
  //     if (route.path.startsWith('/redirect/')) {
  //       return
  //     }
  //     this.getBreadcrumb()
  //   }
  // },
  mounted() {
    // this.getBreadcrumb()
  },
  methods: {
  }
}
</script>
<!--<style>-->
<!--</style>-->
<style lang="scss" scoped>
  .components-page-header {
    box-sizing: border-box;
    height: 65px;
    line-height: 65px;
    padding-left: 20px;
    padding-right: 20px;
    background: $navBarBg;
    box-shadow: 0 1px 4px 0 rgba(195, 195, 195, 0.6);
  }

  .logo-wrapper {
    font-size: 18px;
    font-family: Yuanti SC;
    color: #fff;
    line-height: 44px;
    display: inline-block;
    position: relative;

    img {
      display: inline-block;
      vertical-align: middle;
      /*position: relative;*/
      /*top: 6px;*/
      width: 60px;
      height: 60px;
      margin-right: 8px;
    }

    span {
      display: inline-block;
      vertical-align: middle;
    }

    .project-title {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      width: 100vw;
      text-align: center;
      display: block;
    }
  }

  .el-dropdown-link {
    color: white;
  }

  .user-header-image {
    display: inline-block;
    vertical-align: middle;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 4px;
    font-size: 32px;
    line-height: 32px;
    text-align: center;
    margin-top: -5px;
  }
</style>
