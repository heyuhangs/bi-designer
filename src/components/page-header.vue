<template>
  <div class="components-page-header">
    <div class="logo-wrapper cursor-pointer" @click="$router.push('/')">
      <span>Bi-DESIGNER</span>
    </div>
    <controlBar
      :scale.sync="projectData.canvasScale"
    />
    <slot/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import controlBar from './control-bar'

export default {
  name: 'PageHeader',
  components: {
    controlBar
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      projectData: state => state.editor.projectData,
      userData: state => state.user.userData,
      token: state => state.user.token
    })
  },
  methods: {
    logoutFn() {
      this.$router.push({ name: 'Login' })
    },
    goLogin() {
      this.$mUtils.Cookie.set('beforeLoginUrl', encodeURIComponent(this.$route.fullPath), 1 / 24 / 60, window.location.host, window.location.pathname.substring(0, window.location.pathname.length - 1)) // 保存用户进入的url
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style lang="scss" scoped>
.components-page-header {
  display: flex;
  box-sizing: border-box;
  height: 65px;
  line-height: 65px;
  padding-left: 15px;
  padding-right: 15px;
  background: #292E33;
  box-shadow: 0px 1px 4px 0px rgba(195, 195, 195, 0.6);
}

.logo-wrapper {
  font-size: 18px;
  flex: 0.2;
  height: 65px;
  font-family: Yuanti SC;
  color: #fff;
  line-height: 44px;
  display: inline-block;

  //img {
  //  position: relative;
  //  top: 6px;
  //  width: 26px;
  //  height: 28px;
  //  display: inline-block;
  //  margin-right: 8px;
  //}
  span{
    flex: 1;
    text-align: center;
    line-height: 65px;
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
