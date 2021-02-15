<template>
  <div class="main">
    <div class="editor-side-bar">
      <el-tabs v-model="activeSideBar" tab-position="left" style="height: 100%;">
        <template v-for="(item, index) in sidebarMenus">
          <el-tab-pane
            :key="index"
            :name="item.value"
          >
            <el-tooltip slot="label" class="item" effect="dark" :content="item.label" placement="right">
              <svg-icon :icon-class="item.elementUiIcon" :class-name="item.elementUiIcon"/>
            </el-tooltip>
          </el-tab-pane>
        </template>
      </el-tabs>
    </div>
    <!--组件&页面&模板-->
    <div class="editor-page-edit-wrapper">
      <div v-for="item in componentLibs" :key="item.id" class="editor-page-edit-wrapper-item">
        <componentLibs v-if="activeSideBar === item.id" :list="item.components"/>
      </div>
    </div>
  </div>
</template>

<script>
import eleConfig from '../../ele-config'
import componentLibs from '../component-libs/Index'
// import pageManage from '../page-manage'
// import templateLibs from '../template-libs'

export default {
  components: {
    // templateLibs,
    componentLibs
    // pageManage
  },
  props: {},
  data() {
    return {
      eleConfig: eleConfig,
      activeSideBar: '',
      sidebarMenus: [],
      componentLibs: []
    }
  },
  created() {
    const sidebarMenus = []
    const componentLibs = []
    // console.log('eleConfig', eleConfig)
    // debugger
    eleConfig.forEach(item => {
      sidebarMenus.push({
        label: item.title,
        value: item.id,
        elementUiIcon: item.icon
      })
      componentLibs.push({
        id: item.id,
        components: item.components
      })
    })
    // 默认当前选中的列表
    this.activeSideBar = sidebarMenus[0].value
    // 组件分类菜单
    this.sidebarMenus = sidebarMenus
    // 当前分类内组件菜单
    this.componentLibs = componentLibs
    this.scaleValue = this.scale
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  position: relative;
  /*background: #000000;*/
  /*height: 100%;*/
  min-height: calc(100vh - 105px);

  .editor-side-bar {
    background: #1F2327;
    width: 55px;

    .el-tabs__nav-wrap::after {
      background-color: #000 !important;
    }
  }

  .editor-page-edit-wrapper {
    width: 100%;
    padding: 0 1px;
    max-height: calc(100vh - 105px);
    overflow-x: auto;
  }

  .editor-page-edit-wrapper-item {
    /*display: block;*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*overflow-y: auto;*/
  }

  .editor-main {
    flex: 1;
    background: #171b22 !important;
    /*background: #f0f2f5;*/
    position: relative;
  }

  .editor-side-bar-item {
    background: #1F2327;
    width: 55px;
  }

  .el-attr-edit-wrapper {
    width: 380px;
    padding: 0;
  }

  .svg-icon {
    fill: currentColor;
  }
}
</style>
