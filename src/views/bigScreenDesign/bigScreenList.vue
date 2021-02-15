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
  </div>
</template>

<script>

import { default as Backendless } from 'backendless'
import { doError } from '@/utils/biz'

export default {
  data() {
    return {
      bigScreenList: [],
      projectId: ''
    }
  },
  async mounted() {
    // if (this.$route.query.id) {
    //   this.projectId = this.$route.query.id
    //   this.getData(this.$route.query.id)
    // }
  },
  methods: {
    async getData(id) {
      const queryBuilder = Backendless.DataQueryBuilder.create()
      // companyQueryBuilder.setPageSize(1000)
      queryBuilder.setSortBy(['created desc'])
      queryBuilder.setWhereClause(`project.objectId = '${id}'`)
      // queryBuilder.setRelated(['pages.elements.animations', 'pages.elements.events'])
      const bigScreenObjRes = await Backendless.Data.of('LSE_BigScreen').find(queryBuilder)
      this.bigScreenList = bigScreenObjRes
      console.log('bigScreenObjRes', bigScreenObjRes)
    },
    async handleDelete(row) {
      const self = this
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        self.doDelete(row)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async doDelete(row) {
      const queryBuilder = Backendless.DataQueryBuilder.create()
      queryBuilder.setWhereClause(`bigScreen.objectId = '${row.objectId}'`)
      const pageRes = await Backendless.Data.of('LSE_Page').find(queryBuilder)
      const celarElementRes = await Backendless.Data.of('LSE_Element').bulkDelete(`page.objectId = '${pageRes[0].objectId}'`)
      if (celarElementRes.code) {
        doError(celarElementRes)
      }
      const celarPageRes = await Backendless.Data.of('LSE_Page').bulkDelete(`objectId = '${pageRes[0].objectId}'`)
      if (celarPageRes.code) {
        doError(celarPageRes)
      }
      const celarBigScreenRes = await Backendless.Data.of('LSE_BigScreen').bulkDelete(`objectId = '${row.objectId}'`)
      if (celarBigScreenRes.code) {
        doError(celarBigScreenRes)
      }
      this.getData(this.projectId)
      this.$message.success('删除成功!')
    },
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
      this.$router.push({
        path: '/bigScreenEdit/edit'
      })
      // query: {
      //   projectId: this.projectId
      // }
    }
  }
}
</script>

