<template>
  <el-scrollbar class="components-attr-edit components-attr-edit-main">
    <div v-if="activeElementUUID" class="attr-edit-inner">
      <div v-if="activeElement.attributeTabNavigation.length > 0" class="components-attr-bat">
        <el-tabs v-model="activeSideBar" tab-position="left" style="height: 100%;">
          <template v-for="(item, index) in activeElement.attributeTabNavigation">
            <el-tab-pane
              :key="index"
              :name="item.value"
            >
              <el-tooltip slot="label" class="item" effect="dark" :content="item.label" placement="right">
                <i class="tj-icon" :class="item.elementUiIcon" />
              </el-tooltip>
            </el-tab-pane>
          </template>
        </el-tabs>
      </div>
      <div class="common-attr-style" :class="{'isLeft':activeElement.attributeTabNavigation.length > 0}">
        <div v-if="activeSideBar === 'componentLibs'">
          <propsAttr />
          <baseAttr />
        </div>
        <div v-if="activeSideBar === 'chartTitleComponentsLibs'">
          <propsTitle />
        </div>
        <div v-if="activeSideBar === 'mapComponentsLibs'">
          <propsMap />
        </div>
      </div>
    </div>
    <div v-else>
      <p class="gray paddingT40 text-center">请在画板上选择需要编辑得元素</p>
    </div>
  </el-scrollbar>
</template>

<script>
import baseAttr from './attr-props-components/base-attr'
import propsAttr from './attr-props-components/props-attr/index.vue'
import propsTitle from './arrt-edit-components/props-title'
import propsMap from './arrt-edit-components/props-map'
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    baseAttr,
    propsAttr,
    propsTitle,
    propsMap
  },
  props: {},
  data() {
    return {
      activeSideBar: 'componentLibs'
    }
  },
  computed: {
    ...mapState({
      projectData: state => state.editor.projectData,
      activePageUUID: state => state.editor.activePageUUID,
      activeElementUUID: state => state.editor.activeElementUUID
    }),
    ...mapGetters([
      'currentPageIndex',
      'activeElementIndex',
      'activeElement'
    ])
  },
  watch: {
    activeElementUUID(val, nval) {
      // console.log('1231231231231')
      this.init()
      // this.handleElementUUIDChange()
    }
  },
  methods: {
    init() {
      this.activeSideBar = 'componentLibs'
    }
  }
}
</script>

<style lang="scss" scoped>
  .components-attr-edit-main {
    /**/
    height: 100%;
    /*overflow-y: scroll;*/
  }

  .components-attr-edit {
    padding: 0 !important;
  }

  .attr-edit-inner {
    height: 100%;
    overflow: hidden;
    padding: 0 !important;
    width: 100%;

    .components-attr-bat {
      float: left;
      background-color: #333;
      /*width: 100%;*/
      height: 100%;
    }

    .common-attr-style {
      float: left;
      width: 100%;
      padding: 10px;
      height: 100%;
      max-height: calc(100vh - 125px);
      overflow: auto;
    }

    .isLeft {
      width: 330px !important;
    }
  }

  .attr-title {
    font-weight: bold;
  }

  .sizeAndPosition-wrapper {
    display: flex;
    width: 100%;
  }
</style>
<style lang="scss">
  .common-attr-style {
    .el-collapse {
      border-color: #1F2327;
    }

    .el-form-item {
      margin-bottom: 0;
    }

    .attr-item-edit-wrapper {
      padding-left: 18px;
      display: flex;
      width: 100%;
      text-align: center;
      padding-bottom: 10px;
    }
  }

  .components-attr-edit-main .el-scrollbar__view {
    height: 100%;
  }

  .attr-edit-inner > .components-attr-bat .el-tabs__nav-wrap::after {
    display: none;
    width: 0 !important;
    height: 0 !important;
  }

  .attr-edit-inner > .components-attr-bat .el-tabs--left .el-tabs__header.is-left {
    margin: 0;
  }

  .attr-edit-inner > .components-attr-bat .el-tabs__header .el-tabs__nav {
    .el-tabs__active-bar {
      display: none;
    }

    .el-tabs__item {
      width: 100%;
      padding: 0 12px !important;
      height: 40px;
      line-height: 40px;
      i {
        display: inline-block;
        width: 18px;
        font-size: 18px;
      }
      .tj-icon{
        width: 26px !important;
        font-size: 26px !important;
      }
    }
  }
</style>
