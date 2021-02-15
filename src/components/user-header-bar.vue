<template>
  <el-dropdown class="components-user-header cursor-pointer">
    <span class="el-dropdown-link">
      <span class="user-header-image iconfont">
        <img v-if="userData.avatar" src="../common/images/head.png" alt="">
        <img v-else :src="userData.avatar" alt="">
      </span>
      {{ userData.name }}
      <i class="el-icon-arrow-down el-icon--right" />
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>
        <div @click="_logout">
          <span><i class="iconfont icon-tuichuyingyong" />&nbsp;退出登录</span>
        </div>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
// import { mapState } from 'vuex'

export default {
  // computed: {
  //   ...mapState({
  //     userData: state => state.user.userData
  //   })
  // },
  data() {
    return {
      userData: {
        'name': '',
        'email': '395059821@qq.com',
        'avatar': '',
        'roles': '',
        'type': 'site',
        '_id': '5dd759531659195eb93b15e6',
        'username': 'admin'
      }
    }
  }
}
</script>

<style lang="scss" scoped>

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
    border: 1px solid $gray;
  }
</style>
