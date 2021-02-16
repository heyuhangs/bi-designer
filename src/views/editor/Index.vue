<template>
  <div v-loading="loading" class="page-editor editor-wrapper">
    <div class="left-menu-main">
      <el-tabs>
        <el-tab-pane>
          <span slot="label">组件</span>
          <component-menu/>
        </el-tab-pane>
        <el-tab-pane label="消息中心">
          <span slot="label">图层</span>
          <layer-components ref="layerComRef"/>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--页面编辑区域-->
    <div class="editor-main">
      <!--内容编辑区域-->
      <editorPan ref="editorPan" :scale.sync="projectData.canvasScale"/>
    </div>
    <!--属性编辑区域-->
    <div class="el-attr-edit-wrapper scrollbar-wrapper">
      <!--      v-if="!activeElementUUID || activeElement.isBackground"-->
      <el-tabs
        v-if="!activeElementUUID"
        :value="defaultActiveAttr"
        stretch
      >
        <el-tab-pane label="大屏设置" name="大屏设置">
          <pageAttrEdit ref="pageAttrEditRef" @screenshots="screenshots()"/>
        </el-tab-pane>
        <el-tab-pane label="背景地图" name="背景地图">
          <backgroundMapEdit/>
        </el-tab-pane>
      </el-tabs>
      <el-tabs v-else v-model="activeAttr" stretch>
        <el-tab-pane
          v-for="(item,index) in activeElement.attributeTab"
          :key="index"
          :label="item.name"
          :name="item.elName"
        >
          <!--          属性-->
          <component
            :is="item.elName"
            v-if="activeAttr == item.elName"
          />
        </el-tab-pane>
        <!--        <el-tab-pane label="数据" name="4">-->

        <!--        </el-tab-pane>-->
        <!--          <el-tab-pane v-if="item.id == 1" label="事件" name="1">-->
        <!--            <eventEdit />-->
        <!--          </el-tab-pane>-->
        <!--          <el-tab-pane v-if="item.id == 2" label="动画" name="2">-->
        <!--            <animationEdit />-->
        <!--          </el-tab-pane>-->
        <!--          <el-tab-pane v-if="item.id == 3" label="JS脚本" name="3">-->
        <!--            <scriptEdit />-->
        <!--          </el-tab-pane>-->
        <!--        </div>-->
      </el-tabs>
    </div>
    <!--预览-->
    <previewPage
      v-if="showPreview"
      :page-data="projectData"
      :page-id="id"
      @closePreview="showPreview = false"
      @publishFn="publishFn"
      @saveFn="saveFn"
    />
    <!--我的图片-->
    <imageLibs/>
  </div>
</template>

<script>
// import componentLibs from './components/component-libs/Index'
// import pageManage from './components/page-manage'
// import templateLibs from './components/template-libs'
import componentMenu from './components/left-menu/componentMenu'
import layerComponents from './components/left-menu/layerComponents'
import editorPan from './components/editor-panel/Index'
// 属性编辑相关组件
import attrEdit from './components/attr-configure/attr-edit'
import dataEdit from './components/attr-configure/data-edit'
import animationEdit from './components/attr-configure/animation-edit'
import eventEdit from './components/attr-configure/event-edit'
import pageAttrEdit from './components/attr-configure/page-attr-edit'
import backgroundMapEdit from './components/attr-configure/background-map-edit'
import scriptEdit from './components/attr-configure/script-edit'

import previewPage from './components/preview'
import imageLibs from '../../components/image-libs'
import { default as Backendless } from 'backendless'
import { mapState, mapGetters } from 'vuex'
import html2canvas from 'html2canvas'
// import { getJson } from './test'
// import { Message } from 'element-ui'

export default {
  components: {
    // componentLibs,
    // pageManage,
    // templateLibs,
    dataEdit,
    imageLibs,
    editorPan,
    attrEdit,
    animationEdit,
    eventEdit,
    scriptEdit,
    pageAttrEdit,
    backgroundMapEdit,
    // controlBar,
    previewPage,
    componentMenu,
    layerComponents
  },
  data() {
    return {
      isClick: false,
      isAdd: false,
      bigScreenInx: '',
      bigScreenList: [],
      bigScreenObj: null,
      id: '', // 当前页面id
      isEdit: false,
      projectId: '',
      loading: false,
      showPreview: false,
      defaultActiveAttr: '大屏设置',
      activeAttr: '',
      activeSideBar: 'componentLibs',
      pageObj: {},
      sidebarMenus: [
        {
          label: '组件列表',
          value: 'componentLibs',
          elementUiIcon: 'el-icon-s-operation'
        },
        {
          label: '页面管理',
          pageMode: 'h5',
          value: 'pageManage',
          elementUiIcon: 'el-icon-document'
        },
        {
          label: '模板库',
          value: 'templateLibs',
          elementUiIcon: 'el-icon-files'
        }
      ],
      canvasConfig: {
        scale: 0.2
      }
    }
  },
  computed: {
    ...mapState({
      projectData: state => state.editor.projectData,
      activePageUUID: state => state.editor.activePageUUID,
      activeElementUUID: state => state.editor.activeElementUUID
    }),
    ...mapGetters([
      'pageMode',
      'activeElement'
    ])
  },

  watch: {
    activeElement(val) {
      // debugger
      this.activeAttr = this.activeElement ? this.activeElement.attributeTab[0].elName || '' : ''
      console.log('activeElement-index')
    }
  },
  async created() {
    const self = this
    await self.$store.dispatch('setPrjectData')
    // self.projectId = self.$route.query.projectId
    // if (self.$route.query.id) {
    //   self.id = self.$route.query.id
    //   self.isAdd = false
    //   await self.initPageData()
    // } else {
    self.isAdd = true
    // }
    // await self.getData()
    // self.bigScreenList = await JSON.parse(localStorage.getItem('bigScreenList') || '[]')
    // if (self.id) {
    //   self.isEdit = true
    //   self.bigScreenList.forEach((item, index) => {
    //     if (item.id === self.id) {
    //       self.bigScreenObj = item
    //       self.bigScreenInx = index
    //       return item.id === self.id
    //     }
    //   })
    //   if (self.bigScreenObj) {
    //     self.initPageData()
    //   }
    //   console.log('bigScreenObj', self.bigScreenObj)
    //   console.log('id', self.id)
    // }
  },
  mounted() {
    this.initPageData()
  },
  methods: {
    // async getProject() {
    //   const queryBuilder = Backendless.DataQueryBuilder.create()
    //   queryBuilder.setSortBy(['created desc'])
    //   queryBuilder.setWhereClause(`objectId = '${this.projectId}'`)
    //   queryBuilder.setRelated(['bigScreen.pages.elements.animations', 'bigScreen.pages.elements.events'])
    //   const projectRes = await Backendless.Data.of('LSE_Project').find(queryBuilder)
    //   this.projectObj = projectRes[0]
    // },
    async getPageData(id) {
      const queryBuilder = Backendless.DataQueryBuilder.create()
      queryBuilder.setSortBy(['created desc'])
      queryBuilder.setWhereClause(`bigScreen.objectId = '${id}'`)
      queryBuilder.setRelated(['bigScreen'])
      queryBuilder.setPageSize(1000)
      return await Backendless.Data.of('LSE_Page').find(queryBuilder)
    },
    async getElementData(id) {
      const queryBuilder = Backendless.DataQueryBuilder.create()
      queryBuilder.setSortBy(['created desc'])
      queryBuilder.setWhereClause(`page.objectId = '${id}'`)
      queryBuilder.setRelated(['page', 'animations', 'events'])
      queryBuilder.setPageSize(1000)
      return await Backendless.Data.of('LSE_Element').find(queryBuilder)
    },
    //
    // const bigScreenRes = await Backendless.Data.of('LSE_Element').find(queryBuilder)
    /**
     * 初始化页面数据
     */
    async initPageData() {
      this.$refs.editorPan.screenshots()
    },
    /**
     * 保存
     */
    // async saveFn() {
    //   const self = this
    //   if (this.isClick) {
    //     return false
    //   } else {
    //     this.isClick = true
    //   }
    //   await this.screenshots()
    //   const bigScreenObj = JSON.parse(JSON.stringify(this.projectData))
    //   bigScreenObj.bgMapObj = JSON.stringify(bigScreenObj.bgMapObj)
    //   const pagesObj = bigScreenObj.pages[0]
    //   const elementList = bigScreenObj.pages[0].elements
    //   console.log(bigScreenObj)
    //
    //   // 存LSE_Project实例
    //   const lesBigScreenRes = await Backendless.Data.of('LSE_BigScreen').save(bigScreenObj)
    //   if (lesBigScreenRes.code) {
    //     doError(lesBigScreenRes)
    //   }
    //
    //   // 存LSE_Page实例
    //   pagesObj.commonStyle = JSON.stringify(pagesObj.commonStyle)
    //   pagesObj.config = JSON.stringify(pagesObj.config)
    //   const pagesObjRes = await Backendless.Data.of('LSE_Page').save(pagesObj)
    //   if (pagesObjRes.code) {
    //     doError(pagesObjRes)
    //   }
    //   // clear ElementList
    //   const celarElementRes = await Backendless.Data.of('LSE_Element').bulkDelete(`page.objectId = '${this.pageObj.objectId}'`)
    //   if (celarElementRes.code) {
    //     doError(celarElementRes)
    //   }
    //
    //   // elementList
    //   const templatePromis = []
    //   elementList.forEach(eleItem => {
    //     delete eleItem.objectId
    //     eleItem.attributeTab = JSON.stringify(eleItem.attributeTab)
    //     eleItem.attributeTabNavigation = JSON.stringify(eleItem.attributeTabNavigation)
    //     eleItem.commonStyle = JSON.stringify(eleItem.commonStyle)
    //     eleItem.propsValue = JSON.stringify(eleItem.propsValue)
    //     eleItem.ownerId = pagesObjRes.objectId
    //     templatePromis.push(Backendless.Data.of('LSE_Element').save(eleItem))
    //   })
    //   // 存LSE_Element实例
    //   const elementRes = await Promise.all(templatePromis)
    //   if (elementRes.code) {
    //     doError(elementRes)
    //   }
    //
    //   // setRelation  关系维护
    //   const templatePromisSetRelation = []
    //   templatePromisSetRelation.push(Backendless.Data.of('LSE_BigScreen').setRelation(lesBigScreenRes, 'project', [this.projectId]))
    //   // templatePromisSetRelation.push(Backendless.Data.of('LSE_BigScreen').setRelation(lesBigScreenRes, 'pages', [pagesObjRes.objectId]))
    //   templatePromisSetRelation.push(Backendless.Data.of('LSE_Page').setRelation(pagesObjRes, 'bigScreen', [lesBigScreenRes.objectId]))
    //   elementRes.forEach(item => {
    //     templatePromisSetRelation.push(Backendless.Data.of('LSE_Element').setRelation(item, 'page', [item.ownerId]))
    //   })
    //   const relationRes = await Promise.all(templatePromisSetRelation)
    //   if (relationRes.code) {
    //     doError(relationRes)
    //   }
    //   this.$message.success('保存成功!')
    //   setTimeout(() => {
    //     self.isClick = false
    //     self.$router.go(-1) // 返回上一层
    //   }, 50000)
    // },
    /**
     * 发布
     */
    // async publishFn() {
    //   // await this.screenshots()
    //   // 提交数据再预览
    //   this.$axios.post('/page/publish/' + this.id, this.projectData).then(() => {
    //     this.$message.success('发布成功!')
    //     this.showPreview = false
    //     this.$router.push({ path: 'page-list', query: { previewId: this.id }})
    //   })
    // },
    dataURLtoFile(dataurl, filename = new Date().getTime()) {
      const arr = dataurl.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const suffix = mime.split('/')[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], `${filename}.${suffix}`, {
        type: mime
      })
    }
    /**
     *
     * @param dataList
     */
    // importPsdData(psdData) {
    //   const elementsList = psdData.elements
    //   const psdWidth = psdData.document.width
    //   const scalingRatio = this.projectData.width / psdWidth
    //   elementsList.forEach(item => {
    //     const { width, height, top, left, imageSrc, opacity, zIndex } = item
    //     setTimeout(() => {
    //       this.$store.dispatch('addElement', {
    //         elName: 'qk-image',
    //         defaultStyle: {
    //           width: width * scalingRatio,
    //           height: height * scalingRatio,
    //           top: top * scalingRatio,
    //           left: left * scalingRatio,
    //           zIndex: zIndex,
    //           opacity
    //         },
    //         needProps: {
    //           imageSrc: imageSrc
    //         }
    //       })
    //     }, 10)
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
.page-editor {
  background: #16191C;
}

.editor-wrapper {
  display: flex;
  position: relative;
  /*background: #000000;*/
  /*height: 100%;*/
  min-height: calc(100vh - 65px);

  .editor-side-bar {
    background: #333;
    width: 55px;
  }

  /*.editor-page-edit-wrapper {*/
  /*  width: 210px;*/
  /*  padding: 0 1px;*/
  /*}*/

  .editor-main {
    flex: 1;
    width: calc(100vh - 680px);
    height: calc(100vh - 60px);
    /*max-width: calc(100vh - 680px);*/
    /*overflow: auto;*/
    background: #171b22 !important;
    /*background: #f0f2f5;*/
    position: relative;

    .el-footer {
      background-color: #292E33 !important;
    }
  }

  .el-attr-edit-wrapper {
    width: 380px;
    padding: 0;
  }
}

.control-bar-wrapper {
  position: absolute;
  /**top: -44px;*/
  top: -62px;
  left: 0;
  width: 110%;
  text-align: center;
  z-index: 1000;
}

.components-attr-edit {
  padding: 20px 10px;
}
</style>
<style lang="scss">

.editor-side-bar {
  .el-tabs__item.is-active {
    color: #4072EE !important;
  }

  .el-tabs__item {
    color: #90939A;
  }

  .el-tabs__nav-wrap::after {
    background-color: #1F2327 !important;
  }
}

.el-attr-edit-wrapper > .el-tabs > .el-tabs__content {
  height: 100%;
}

.el-attr-edit-wrapper {
  .el-tabs__active-bar {
    background-color: #4072EE !important;
  }

  .el-tabs__nav-wrap::after {
    background-color: #1F2327 !important;
  }

  .el-input__inner, .el-input-number, .el-textarea__inner, .el-input-number__decrease, .el-input-number__increase, .el-color-picker__trigger, .el-slider__runwa, .el-color-picker__panel, .el-color-dropdown__btns {
    background: #1F2327 !important;
    border-color: #292E33 !important;
    color: #c0c4cc !important;
  }

  .el-tabs {
    height: 100%;
    padding-bottom: 10px;
    /*border: none;*/
    .el-tabs__header {
      margin: 0;
      background: #1F2327 !important;
    }

    .el-tabs__item {
      padding: 0 !important;
      color: #90939A;
    }

    .el-tabs__item.is-active {
      color: #4072EE !important;
    }
  }

  .el-tabs__content {
    /*max-height: calc(100% - 55px);*/
    /*overflow: auto !important;*/
    /*padding: 0 10px;*/

    & > div {
      height: 100%;
    }

    .attr-edit-inner {
      padding-left: 16px;
      padding-right: 16px;
    }
  }
}

/* left-menu */
.left-menu-main {
  width: 338px;

  .el-tabs__active-bar {
    background-color: #4072EE !important;
  }
}

.left-menu-main > .el-tabs {
  border: none;
  box-shadow: none;
}

.left-menu-main > .el-tabs > .el-tabs__header {
  margin: 0;
  background-color: #333;

  .el-tabs__nav {
    display: flex;
    width: 100%;

    .el-tabs__item {
      padding: 0;
      width: 50%;
      background: #1F2327;
      border-bottom: 1px solid #292E33 !important;
      color: #C0C4CC;

      span {
        display: inline-block;
        width: 100%;
        text-align: center;
      }
    }

    .el-tabs__item.is-active {
      color: #4072EE;
    }
  }
}
</style>

