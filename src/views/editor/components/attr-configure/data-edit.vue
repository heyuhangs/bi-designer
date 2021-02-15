<template>
  <div class="data-edit-box">
    <div v-if="isMenu" class="tree-menu">
      <div>
        <p class="page-title fontBold" style="float: left;">图层点位列表</p>
        <el-tooltip content="新增点位" placement="bottom-end" effect="dark">
          <el-button
            plain
            size="mini"
            type="primary"
            icon="el-icon-plus"
            style="float: right; margin-top: 5px;"
            @click="handlerAddTreeMap"
          />
        </el-tooltip>
        <el-tooltip content="刷新标题" placement="bottom-end" effect="dark">
          <el-button
            plain
            size="mini"
            type="primary"
            icon="el-icon-refresh"
            style="float: right; margin-top: 5px; margin-right: 15px;"
            @click="handlerSaveTreeMap"
          />
        </el-tooltip>
      </div>
      <div>
        <el-table
          :data="tableData"
          style="width: 100%; margin-bottom: 10px;"
          height="300"
          row-key="id"
          border
          size="mini"
          default-expand-all
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column prop="name" label="点位标题" header-align="center">
            <template slot-scope="{row}">
              <template v-if="row.isEdit">
                <el-input v-model="row.menuName" class="edit-input" />
              </template>
              <span v-else>{{ row.menuName }}</span>
            </template>
          </el-table-column>
          <!--          <el-table-column prop="id" label="id" header-align="center" sortable />-->
          <el-table-column
            fixed="right"
            label="操作"
            width="90"
            header-align="center"
          >
            <template slot-scope="{ row,$index }">
              <div v-if="!row.isEdit">
                <el-tooltip content="编辑标题" placement="bottom-end" effect="dark">
                  <el-button
                    type="text"
                    icon="el-icon-edit"
                    @click="handlerEdit(row)"
                  />
                </el-tooltip>
                <el-tooltip content="点位数据配置" placement="bottom-end" effect="dark">
                  <el-button
                    type="text"
                    icon="el-icon-connection"
                    @click="handlerDataEdit(row)"
                  />
                </el-tooltip>
                <el-button
                  slot="reference"
                  type="text"
                  icon="el-icon-delete"
                  @click="handlerDelData(row,$index)"
                />
              </div>
              <div v-else>
                <el-tooltip content="取消编辑" placement="bottom-end" effect="dark">
                  <el-button
                    class="cancel-btn"
                    icon="el-icon-close"
                    type="text"
                    @click="cancelEdit(row)"
                  />
                </el-tooltip>
                <el-tooltip content="保存修改" placement="bottom-end" effect="dark">
                  <el-button
                    type="text"
                    icon="el-icon-finished"
                    @click="confirmEdit(row)"
                  />
                </el-tooltip>
              </div>
              <!--              <el-popover-->
              <!--                placement="top"-->
              <!--                width="160"-->
              <!--                v-model="visible">-->
              <!--                <p>这是一段内容这是一段内容确定删除吗？</p>-->
              <!--                <div style="text-align: right; margin: 0">-->
              <!--                  <el-button size="mini" type="text" @click="visible = false">取消</el-button>-->
              <!--                  <el-button type="primary" size="mini" @click="visible = false">确定</el-button>-->
              <!--                </div>-->
              <!--                -->
              <!--              </el-popover>-->
              <!--              <el-popover-->
              <!--                placement="top"-->
              <!--                width="160"-->
              <!--                v-model="treeMenuVisible">-->
              <!--                <p>这是一段内容这是一段内容确定删除吗？</p>-->
              <!--                <div style="text-align: right; margin: 0">-->
              <!--                  <el-button size="mini" type="text" @click="treeMenuVisible = false">取消</el-button>-->
              <!--                  <el-button type="primary" size="mini" @click="handlerDelData(row)">确定</el-button>-->
              <!--                </div>-->
              <!--                <el-button v-if="!row.isEdit" slot="reference" type="text" icon="el-icon-delete" />-->
              <!--              </el-popover>-->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--    -->
    <p class="page-title fontBold">数据配置</p>
    <div class="attr-item-edit-wrapper">
      <div>
        <p class="attr-item-title">数据类型：</p>
        <el-radio-group v-model="radio" size="mini" @change="radioChange">
          <el-radio-button :label="'1'">静态数据</el-radio-button>
          <el-radio-button :label="'2'">指标数据</el-radio-button>
          <el-radio-button :label="'3'">API数据</el-radio-button>
        </el-radio-group>
      </div>
      <el-tooltip content="刷新数据" placement="top-end" effect="dark">
        <el-button
          class="refeBtn"
          size="mini"
          type="primary"
          icon="el-icon-refresh"
          plain
          @click="isMenu?refeTreeMenuData():refeData()"
        />
      </el-tooltip>
    </div>
    <div v-if="radio == 1" class="json-main">
      <json-editor v-if="radio == 1" ref="data" v-model="data" />
    </div>
    <div v-if="radio == 2" class="api-box">
      <p class="page-title fontBold">指标配置</p>
      <div class="api-flex">
        <p class="attr-item-title">指标：</p>
        <el-select
          v-model="inxDataApi.name"
          placeholder="请选择指标"
          style="flex: 1; margin-right: 10px;"
          @change="inxChange"
        >
          <el-option
            v-for="item in inxList"
            :key="item.objectId"
            :label="item.name"
            :value="item.objectId"
          />
        </el-select>
        <el-tooltip content="查询" placement="top-end" effect="dark">
          <el-button size="mini" type="primary" plain icon="el-icon-search" @click="getInxData" />
        </el-tooltip>
      </div>
      <!--      原-->
      <!--      <div v-for="item in inxDataApi.fieldArray" :key="item.componentsField" class="api-flex">-->
      <!--        <div v-if="item.componentsObjFieldName.length > 0">-->
      <!--          <div v-for="(fieldItem,inx) in item.componentsObjFieldName" :key="inx">-->
      <!--            <p class="attr-item-title">{{ fieldItem.title }}：</p>-->
      <!--            <el-select v-model="fieldItem.field" placeholder="请选择">-->
      <!--              <el-option-->
      <!--                v-for="item in dataFieldOptions"-->
      <!--                :key="item"-->
      <!--                :label="item"-->
      <!--                :value="item"-->
      <!--              />-->
      <!--            </el-select>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <div v-else>-->
      <!--          <p class="attr-item-title">{{ item.name }}：</p>-->
      <!--          <el-select v-model="item.field" placeholder="请选择">-->
      <!--            <el-option-->
      <!--              v-for="item in dataFieldOptions"-->
      <!--              :key="item"-->
      <!--              :label="item"-->
      <!--              :value="item"-->
      <!--            />-->
      <!--          </el-select>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      新-->
      <div v-for="item in fieldArray" :key="item.componentsField" class="api-flex-box">
        <div v-for="(fItem,inx) in item.componentsFieldArr" :key="inx">
          <div class="api-flex">
            <p class="attr-item-title">{{ fItem.title }}：</p>
            <el-select
              v-model="fItem.field"
              placeholder="请选择数据字段"
              style="flex: 1;"
            >
              <el-option
                v-for="item1 in dataFieldOptions"
                :key="item1"
                :label="item1"
                :value="item1"
              />
            </el-select>
          </div>
        </div>
      </div>
      <!--      <div class="api-flex-box">-->
      <!--        <div class="api-flex">-->
      <!--          <p class="attr-item-title">标题：</p>-->
      <!--          <el-select-->
      <!--            placeholder="请选择指标"-->
      <!--            style="flex: 1;"-->
      <!--          >-->
      <!--            <el-option />-->
      <!--          </el-select>-->
      <!--        </div>-->
      <!--        <div class="api-flex">-->
      <!--          <p class="attr-item-title">值：</p>-->
      <!--          <el-select-->
      <!--            placeholder="请选择指标"-->
      <!--            style="flex: 1;"-->
      <!--          >-->
      <!--            <el-option />-->
      <!--          </el-select>-->
      <!--        </div>-->
      <!--      </div>-->
      <json-editor ref="data" v-model="inxData" :read-only="true" />
    </div>
    <div v-if="radio == 3" class="api-box">
      <p class="page-title fontBold">API配置</p>
      <div class="api-flex">
        <p class="attr-item-title">请求方式：</p>
        <el-select v-model="apiObj.reqType" placeholder="请选择" style="flex: 1; margin-right: 10px;">
          <el-option
            v-for="item in reqOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-tooltip content="查询" placement="top-end" effect="dark">
          <el-button size="mini" type="primary" icon="el-icon-search" plain @click="getData" />
        </el-tooltip>

      </div>
      <div class="api-flex">
        <p class="attr-item-title">URL：</p>
        <el-input
          v-model="apiObj.url"
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
        />
      </div>
      <json-editor ref="data" v-model="apiData" :read-only="true" />
    </div>
    <!--    <el-scrollbar class="components-attr-edit">-->
    <!--      <p class="page-title fontBold">基础</p>-->
    <!--      <div class="attr-item-edit-wrapper">-->
    <!--        <p class="attr-item-title">数据类型：</p>-->
    <!--        <el-row :gutter="20" style="width: 100%;">-->
    <!--          <el-col :span="8">-->

    <!--          </el-col>-->
    <!--        </el-row>-->
    <!--      </div>-->
    <!--    </el-scrollbar>-->
  </div>
</template>

<script>
import JsonEditor from '@/components/JsonEditor'
import { mapGetters } from 'vuex'
// import { selectData, getInxData } from '@/utils/lseUtils'
import { doError } from '@/utils/biz'
import { default as Backendless } from 'backendless'

export default {
  name: 'AttrQkEchartData',
  components: { JsonEditor },
  // props: {
  // echartData: {
  //   type: Object,
  //   default: () => {
  //     return []
  //   }
  // }
  // },
  data() {
    return {
      dataFieldOptions: [],
      tableData: [],
      reqOptions: [
        {
          value: 'post',
          label: 'post'
        },
        {
          value: 'get',
          label: 'get'
        }
      ],
      inxDataApi: {
        inxRow: {},
        inxName: ''
      },
      apiObj: {
        url: '',
        reqType: 'get'
      },
      treeMenuRow: {},
      data: {},
      apiData: {},
      radio: '1',
      inxList: [],
      inxData: {},
      indexInfoList: [],
      isMenu: false,
      fieldArray: []
    }
  },
  computed: {
    ...mapGetters([
      'activeElement'
    ])
  },
  watch: {
    // 切换组件后给样式
    'activeElement.propsValue.comData': {
      handler(newVal, oldVal) {
        this.initData()
        // this.data = this.activeElement.propsValue.comData || []
        // console.log('activeElement', this.activeElement)
        // this.initData()
      },
      deep: true
    },
    radio(val) {
      if (val === '1') {
        this.data = this.activeElement.propsValue.comData
      }
    }
  },
  mounted() {
    //
    // console.log('mapTreeManu:', this.activeElement.propsValue.mapTreeManu)
    if (this.activeElement.propsValue.mapTreeManu) {
      this.isMenu = true
      this.tableData = this.activeElement.propsValue.mapTreeManu.treeData
    } else {
      this.isMenu = false
    }
    console.log('isMenu:', this.isMenu)
    // editor.setOption("readOnly", true);
    this.getList()
    this.initData()
  },
  methods: {
    initData() {
      this.data = this.activeElement.propsValue.comData || []
      this.radio = this.activeElement.propsValue.dataType || '1'
      this.fieldArray = this.activeElement.propsValue.fieldArray || []
      // inx 指标方式
      if (this.radio === '2') {
        this.inxDataApi = { ...this.activeElement.propsValue.inxDataApi }
        this.getInxData()
      }
      // api方式
      if (this.radio === '3') {
        this.apiObj = { ...this.activeElement.propsValue.apiObj }
        this.getData()
      }
    },
    async getList() {
      const queryBuilder = Backendless.DataQueryBuilder.create()
      queryBuilder.setPageSize(1000)
      queryBuilder.setRelated(['indexInfo.link'])
      const result = await Backendless.Data.of('indexGroup').find(queryBuilder)
      if (result.code) {
        doError(result)
      }
      this.inxList = result
    },
    async getData() {
      try {
        const res = await selectData(this.apiObj)
        this.apiData = res.datas || res.response
      } catch (e) {
        console.log('data-edit', e)
        this.apiData = []
      }
    },
    handlerEdit(row) {
      row.isEdit = !row.isEdit
      row.title = row.menuName
    },
    cancelEdit(row) {
      row.menuName = row.title
      row.isEdit = false
    },
    confirmEdit(row) {
      row.title = row.menuName
      row.isEdit = false
    },
    handlerDelData(row, inx) {
      // console.log(inx)
      this.tableData.splice(inx, 1)
    },
    handlerDataEdit(row) {
      // data 静态数据
      this.init()
      this.radio = row.dataType
      this.treeMenuRow = row
      if (this.radio === '1') {
        this.data = row.dataObj.comData || []
      }
      // inx 指标方式
      if (this.radio === '2') {
        this.inxDataApi = row.dataObj.inxDataApi || {}
        this.getInxData()
      }
      // api方式
      if (this.radio === '3') {
        this.apiObj = row.dataObj.apiObj || {}
        this.getData()
      }
    },
    async getInxData() {
      this.inxData = await getInxData(this.inxDataApi, this.fieldArray)
    },
    radioChange() {
      this.data = this.activeElement.propsValue.comData || []
      console.log('this.inxDataApi', this.inxDataApi)
      if (this.radio === '2') {
        this.inxDataApi = { ...this.activeElement.propsValue.inxDataApi }
      }
      // // api方式
      if (this.radio === '3') {
        this.apiObj = { ...this.activeElement.propsValue.apiObj }
      }
    },
    async inxChange(row) {
      const obj = this.inxList.filter((item) => {
        return row === item.objectId
      })
      const indexInfo = obj[0].indexInfo
      this.dataFieldOptions = indexInfo[0].name.split(',')
      // console.log('dataFieldOptions', this.dataFieldOptions)
      this.indexInfoList = indexInfo
      this.inxDataApi.inxRow = obj[0]
    },
    // initConfigData() {
    //   this.activeElement.propsValue.apiObj = {
    //     url: '',
    //     reqType: 'get'
    //   }
    //   this.activeElement.propsValue.inxDataApi = {
    //     inxRow: {},
    //     inxName: '',
    //     inxX: '',
    //     inxY: ''
    //   }
    // },
    refeData() {
      // this.initConfigData()
      this.activeElement.propsValue.dataType = this.radio
      if (this.radio === '1') {
        this.activeElement.propsValue.comData = { ...JSON.parse(this.data) }
      } else if (this.radio === '2') {
        this.activeElement.propsValue.inxDataApi = { ...this.inxDataApi }
      } else if (this.radio === '3') {
        this.activeElement.propsValue.apiObj = { ...this.apiObj }
      } else {
        this.$message.error('数据绑定失败')
      }
      this.$notify({
        title: '数据绑定成功！',
        message: '',
        type: 'success',
        duration: 1000
      })
    },
    refeTreeMenuData() {
      // this.initConfigData()
      this.treeMenuRow.dataType = this.radio
      if (this.radio === '1') {
        this.treeMenuRow.dataObj.comData = JSON.parse(this.data)
      } else if (this.radio === '2') {
        this.treeMenuRow.dataObj.inxDataApi = JSON.parse(JSON.stringify(this.inxDataApi))
        this.getInxData()
      } else if (this.radio === '3') {
        this.treeMenuRow.dataObj.apiObj = this.apiObj
        this.getData()
      } else {
        this.$message.error('数据绑定失败')
      }
      this.$notify({
        title: '数据绑定成功！',
        message: '',
        type: 'success',
        duration: 1000
      })
    },
    handlerSaveTreeMap() {
      this.activeElement.propsValue.mapTreeManu.treeData = this.tableData
      this.$notify({
        title: '组件数据成功！',
        message: '',
        type: 'success',
        duration: 1000
      })
    },
    handlerAddTreeMap() {
      this.tableData.push({
        menuName: '',
        tableName: 'event',
        isEdit: true,
        dataType: '1',
        dataObj: {}
      })
    },
    init() {
      this.apiData = {}
      this.inxData = {}
      this.data = {}
      this.inxDataApi = {
        inxRow: {},
        inxName: '',
        inxX: '',
        inxY: ''
      }
      this.apiObj = {
        url: '',
        reqType: 'get'
      }
    },
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: '2016-05-01',
            name: '点位',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            id: 32,
            date: '2016-05-01',
            name: '点位',
            address: '上海市普陀区金沙江路 1519 弄'
          }
        ])
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.data-edit-con {
  margin: 12px 0;
}

.attr-item-edit-wrapper {
  display: flex;
  width: 100%;
  text-align: center;
  padding-bottom: 10px;
  padding-left: 0 !important;
  flex-flow: row;
  justify-content: space-between;
}

.attr-item-title {
  text-align: left;
  min-width: 60px;
  font-size: 12px;
  line-height: 28px;
  display: inline-block;
}

.json-main {
  display: block;
  flex: 1;
  width: 360px;
  overflow-y: scroll;
}

.refeBtn {
  float: right;
}

.api-box {
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
}

.api-flex-box {
  border-radius: 5px;
  border: 1px solid #292E33;
  padding: 10px 10px 0 10px;
  margin-bottom: 10px;

  .api-flex {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    flex: 1;
    margin-bottom: 10px;
  }
}

.api-flex {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  flex: 1;
  margin-bottom: 10px;
}
</style>

<style>
.json-editor .CodeMirror {
  height: 100% !important;
}

.data-edit-box {
  padding: 10px;
  color: #c0c4cc;
  height: calc(100vh - 105px) !important;
  overflow: auto;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
}

.attr-item-edit-wrapper .el-radio-button__inner {
  background: #1F2327;
  border-color: #292E33;
  color: #c0c4cc;
}

.attr-item-edit-wrapper .el-radio-button:first-child .el-radio-button__inner {
  border-left-color: #292E33;
}

.data-edit-box .el-button--primary.is-plain {
  background: #1F2327;
  border-color: #292E33;
  color: #c0c4cc;
}

.data-edit-box .el-button--primary.is-plain:hover, .data-edit-box .el-button--primary.is-plain:focus {
  color: #FFFFFF;
  background-color: #4072EE;
  border-color: #4072EE;
}

.data-edit-box .cm-s-rubyblue.CodeMirror {
  background-color: #16191C;
}

.data-edit-box .cm-s-rubyblue .CodeMirror-gutters {
  background: #1F2327;
  border-right: 7px solid #292E33;
  left: 0 !important;
}

.data-edit-box .el-table--striped .el-table__body tr.el-table__row--striped td {
  background-color: #292E33 !important;
}

.data-edit-box .el-table--striped .el-table__body tr.hover-row.el-table__row--striped td {
  background-color: #16191C !important;
}

.data-edit-box .el-table--striped .el-table__body tr.current-row > td {
  background-color: #000000 !important;
}

.data-edit-box .el-table--striped .el-table__body tr.el-table__row--striped.current-row td {
  background-color: #000000 !important;
}

.data-edit-box .el-table {
  background-color: #1F2327 !important;
}
</style>
