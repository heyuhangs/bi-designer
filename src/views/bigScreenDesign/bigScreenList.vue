<template>
  <div class="app-container">
    <div class="project-screen-list">
      <div>
        <div class="main-screen">
          <div class="add-screen" @click="addBigScreen">
            <el-card
              class="screen-card"
              :body-style="{ padding: '0px' }"
            >
              <div class="image">
                <i class="el-icon-plus"/>
              </div>
              <div class="bottom">
                <span style="text-align: center;">添加</span>
              </div>
            </el-card>
          </div>
          <div v-for="(item,index) in bigScreenList" :key="index" class="screen-item">
            <el-card
              class="screen-card"
              :body-style="{ padding: '0px' }"
            >
              <div class="screen-btns">
                <!--                <el-button type="info" icon="el-icon-setting" circle />-->
                <el-button type="primary" icon="el-icon-edit" circle @click="goNavTo(item)"/>
                <el-button type="danger" icon="el-icon-delete" circle @click="handleDelete(item)"/>
              </div>
              <img :src="item.coverImage" class="image">
              <div class="bottom">
                <span>{{ item.title }}</span>
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </div>
    <loading-bar v-show="loading"/>
  </div>
</template>

<script>

import loadingBar from '@/components/loadingBar'

export default {
  components: {
    loadingBar
  },
  data() {
    return {
      loading: false,
      bigScreenList: [],
      projectId: ''
    }
  },
  mounted() {
    const self = this
    this.loading = true
    setTimeout(function() {
      self.loading = false
    }, 1500)
  },
  methods: {
    goNavTo(e) {
      this.$router.push({
        path: '/bigScreenEdit/edit',
        query: {
          id: e.objectId,
          projectId: this.projectId
        }
      })
    },
    addBigScreen() {
      const self = this
      this.loading = true
      this.$router.push({
        path: '/bigScreenEdit/edit'
      })
      setTimeout(() => {
        self.loading = false
      }, 1000)
    }
  }
}
</script>
<style scoped>
.add-screen{
  cursor: pointer;
}
</style>
