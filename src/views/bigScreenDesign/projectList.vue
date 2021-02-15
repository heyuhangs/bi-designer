<template>
  <div class="app-container psl">
    <div class="project-screen-list">
      <div class="main-screen">
        <div class="add-screen" @click="goNavTo">
          <el-card
            class="screen-card"
            :body-style="{ padding: '0px' }"
          >
            <div class="image">
              <i class="el-icon-plus" />
            </div>
            <div class="bottom">
              <span style="text-align: center;">添加</span>
            </div>
          </el-card>
        </div>
        <el-card v-for="(item,index) in data" :key="index" class="screen-card" :body-style="{ padding: '0px' }">
          <div class="screen-btns">
            <el-button type="info" icon="el-icon-setting" circle @click="handlEdit(item,index)" />
            <el-button type="primary" icon="el-icon-view" circle @click="goNavTo(item)" />
            <el-button type="danger" icon="el-icon-delete" circle @click="handleDelete(item)" />
          </div>
          <div class="pro-bg">
            <i class="icon-size" :class="item.logo" />
          </div>
          <div class="bottom">
            <span>{{ item.name }}</span>
          </div>
        </el-card>
      </div>
    </div>
    <el-dialog
      title="项目配置"
      width="30%"
      class="psl-dialog-box"
      :visible.sync="dialogSetting"
    >
      <el-form :model="form" style="padding-right: 40px;">
        <el-form-item label="项目名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input v-model="form.sort" autocomplete="off" />
        </el-form-item>
        <el-form-item label="图标" :label-width="formLabelWidth">
          <el-radio-group v-model="form.logo" style="width: 100%;">
            <el-row class="icon-box">
              <el-col v-for="(item,index) in iconList" :key="index" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
                <el-radio :key="index" :label="item.name" class="icon-radio">
                  <i class="icon-size" :class="item.name" />
                </el-radio>
              </el-col>
            </el-row>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="btnLoading" type="info" plain @click="dialogSetting = false">取 消</el-button>
        <el-button :loading="btnLoading" type="success" @click="onSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { mapMutations } from 'vuex'
import { default as Backendless } from 'backendless'
import { doError } from '@/utils/biz'

export default {
  data() {
    return {
      dataIndex: 0,
      btnLoading: false,
      data: [],
      dialogSetting: false,
      form: {
        name: '',
        sort: '',
        logo: ''
      },
      iconList: [
        {
          name: 'el-icon-question'
        },
        {
          name: 'el-icon-info'
        },
        {
          name: 'el-icon-remove'
        },
        {
          name: 'el-icon-success'
        },
        {
          name: 'el-icon-video-camera-solid'
        },
        {
          name: 'el-icon-edit'
        }
      ],
      formLabelWidth: '120px',
      isAdd: true
    }
  },
  computed: {
    ...mapMutations([
      'SET_NAVINFO'
    ])
  },
  created() {
    // this.getData()
  },
  methods: {
    async getData() {
      const queryBuilder = Backendless.DataQueryBuilder.create()
      queryBuilder.setPageSize(1000)
      queryBuilder.setSortBy(['created desc'])
      const projectListRes = await Backendless.Data.of('LSE_Project').find(queryBuilder)
      this.data = projectListRes
    },
    add() {
      this.init()
      this.dialogSetting = true
    },
    goNavTo(navObj) {
      const titleObj = {
        title: navObj.name,
        icon: navObj.logo
      }
      this.$store.commit('bigScreenDesignNavInfo/SET_NAVINFO', titleObj)
      this.$router.push({
        path: '/bigscreenList',
        query: {
          id: navObj.objectId
        }
      })
    },
    handlEdit(e, inx) {
      this.isAdd = false
      this.dataIndex = inx
      this.form = JSON.parse(JSON.stringify(e))
      this.dialogSetting = true
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
      const self = this
      const queryBuilder = Backendless.DataQueryBuilder.create()
      queryBuilder.setSortBy(['created desc'])
      queryBuilder.setWhereClause(`project.objectId = '${row.objectId}'`)
      const bigScreenObjRes = await Backendless.Data.of('LSE_BigScreen').find(queryBuilder)
      if (bigScreenObjRes.length > 0) {
        this.$message({
          type: 'info',
          message: '该项目中存在大屏列表，无法删除'
        })
      }
      const celarProject = await Backendless.Data.of('LSE_Project').bulkDelete(`objectId = '${row.objectId}'`)
      if (celarProject.code) {
        doError(celarProject)
      }
      setTimeout(() => {
        self.getData()
        self.$message.success(`删除成功!`)
      })
    },
    async onSubmit() {
      const self = this
      this.btnLoading = true
      const res = await Backendless.Data.of('LSE_Project').save(this.form)
      if (res.code) {
        doError(res)
      }
      setTimeout(() => {
        self.init()
        self.getData()
        self.dialogSetting = false
        self.btnLoading = false
        self.$message.success(`${this.isAdd ? '添加' : '修改'}成功!`)
      }, 500)
    },
    init() {
      this.form = {
        name: '',
        sort: '',
        logo: ''
      }
      this.dataIndex = 0
      this.isAdd = true
      this.dialogSetting = false
    }
  }
}
</script>
<style>
  .psl-dialog-box .el-input__inner {
    background-color: #606266;
    border-color: #606266;
    color: #FFFFFF;
  }

  .icon-size {
    font-size: 32px;
  }

  .psl .el-radio {
    color: #C0C4CC;
  }

  .psl .el-radio__inner {
    background-color: #606266;
    border-color: #606266;
  }

  .psl .el-radio__input.is-checked + .el-radio__label {
    color: #67C23A !important;
  }

  .psl .el-radio__input.is-checked .el-radio__inner {
    border-color: #67C23A !important;
    background-color: #67c23a !important;
  }

  .psl .el-radio__inner:hover {
    border-color: #000 !important;
  }

  .icon-box {
    border: 1px solid #62626F;
    border-radius: 3px;
  }

  .icon-radio {
    width: 100%;
    position: relative;
    margin: -1px 0 -1px 1px;
    padding: 24px 0;
    box-shadow: inset -1px -1px 0 0 #62626F;
    text-align: center;
  }

  .icon-radio .el-radio__input {
    position: absolute;
    top: 10px;
    left: 10px;
  }

  .psl .el-dialog {
    background-color: #171b22;
  }

  .psl .el-dialog__title {
    color: #909399;
  }

  .psl .el-form-item__label {
    color: #909399;
  }

  .psl-dialog-box .el-button--info.is-plain {
    background: rgba(0, 0, 0, .0);
  }
</style>
