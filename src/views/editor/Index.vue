<template>
  <div class="page-editor editor-wrapper">
    <div class="left-menu-main">
      <ComponentsLibs/>
    </div>
    <!--页面编辑区域-->
    <div class="editor-main">
      <EditorPan ref="editorPan" :scale.sync="projectData.canvasScale"/>
    </div>
    <!--属性编辑区域-->
    <div class="el-attr-edit-wrapper scrollbar-wrapper">
      <el-tabs
        v-if="!activeElementUUID"
        :value="defaultActiveAttr"
        stretch
      >
        <el-tab-pane label="大屏设置" name="大屏设置">
          <pageAttrEdit ref="pageAttrEditRef" @screenshots="screenshots"/>
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
          <component
            :is="item.elName"
            v-if="activeAttr == item.elName"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
    <loading-bar v-show="loading"/>
  </div>
</template>

<script>

// 属性编辑相关组件
import loadingBar from '@/components/loadingBar'
import EditorPan from './components/EditorPan'
import ComponentsLibs from './components/ComponentsLibs'
import attrEdit from './components/attr-configure/attr-edit'
import dataEdit from './components/attr-configure/data-edit'
import animationEdit from './components/attr-configure/animation-edit'
import eventEdit from './components/attr-configure/event-edit'
import pageAttrEdit from './components/attr-configure/page-attr-edit'
import backgroundMapEdit from './components/attr-configure/background-map-edit'
import scriptEdit from './components/attr-configure/script-edit'

import previewPage from './components/preview'
import imageLibs from '../../components/image-libs'
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    loadingBar,
    dataEdit,
    imageLibs,
    attrEdit,
    animationEdit,
    eventEdit,
    scriptEdit,
    pageAttrEdit,
    backgroundMapEdit,
    previewPage,
    ComponentsLibs,
    EditorPan
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
    self.isAdd = true
  },
  mounted() {
    const self = this
    this.loading = true
    setTimeout(function() {
      self.loading = false
    },1500)
  },
  methods: {
    /**
     * 初始化页面数据
     */
    screenshots() {
      this.$refs.editorPan.screenshots()
    },
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
  min-height: calc(100vh - 65px);

  .editor-side-bar {
    background: #333;
    width: 55px;
  }

  .editor-main {
    flex: 1;
    width: calc(100vh - 680px);
    height: calc(100vh - 60px);
    background: #171b22 !important;
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

