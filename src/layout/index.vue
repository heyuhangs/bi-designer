<template>
  <div class="app-wrapper">
    <div class="navbar screen-nav">
      <page-header />
    </div>
    <app-main />
  </div>
</template>

<script>
import AppMain from './AppMain'
import pageHeader from './components/header'

export default {
  components: {
    AppMain,
    pageHeader
  },
  data() {
    return {
      navInfo: {}
    }
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getBreadcrumb()
    }
  },
  mounted() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      const matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]
      if (first.name === 'ProjectList') {
        this.navInfo = {
          title: '凌霄台',
          url: '123',
          icon: '123'
        }
      } else {
        this.navInfo = this.bigScreenNavInfo
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .screen-nav {
    background-image: url("../common/images/screen-head-img2.png") !important;
    background-position: center right !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 65px !important;
    line-height: 65px;
    -webkit-box-shadow: 0 1px 10px rgba(0, 0, 41, .2);
    box-shadow: 0 1px 10px rgba(0, 0, 41, .2);
    h2 {
      margin: 0 16px;
      background-image: linear-gradient(to left, #A0E5FF, #2CD5FF);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .navbar {
    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
