<template>
  <el-scrollbar class="components-attr-edit">
    <p class="page-title fontBold">基础</p>
    <div class="attr-item-edit-wrapper">
      <p class="attr-item-title">地图背景：</p>
      <el-row :gutter="20" style="width: 100%;">
        <el-col :span="8">
          <el-switch
            v-model="projectData.isBgMapOpen"
            active-text="开"
            inactive-text="关"
            active-color="#4072EE"
            inactive-color="#292E33"
            @change="switchChange"
          />
        </el-col>
      </el-row>
    </div>
    <div v-if="projectData.isBgMapOpen">
      <div class="attr-item-edit-wrapper">
        <p class="attr-item-title">选择地图：</p>
        <el-row
          v-if="componentsBgList.components && componentsBgList.components.length"
          :gutter="20"
          style="width: 100%;"
        >
          <el-col v-for="(element) in componentsBgList.components" :key="element.index" :span="10">
            <el-radio-group v-model="mapRadio" @change="handleChange">
              <el-radio :label="element.index" border>
                {{ element.title }}
              </el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
      </div>
      <propsAttr />
    </div>
  </el-scrollbar>
</template>

<script>
import { camelCase } from 'lodash'
import { mapState, mapGetters } from 'vuex'
import eleBgConfig from '../../custom-component/el-bg-config.js'
import propsAttr from './attr-props-components/props-attr/index.vue'
import { _qk_register_components_object } from '@/views/editor/custom-component/plugins'

export default {
  components: {
    propsAttr
  },
  data() {
    return {
      mapRadio: '1',
      isOpen: false,
      componentsBgList: eleBgConfig,
      data: {
        a: {
          ab: 1,
          ac: 2,
          ad: 3
        },
        b: {
          ba: 1,
          bs: 2,
          vg: 4
        }
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
      'currentPageIndex',
      'activeElementIndex',
      'activeElement',
      'activePage',
      'pageMode'
    ])
  },
  methods: {
    switchChange(v) {
      console.log(v)
      if (v) {
        // console.log('true')
        // this.projectData.isBgMapOpen = true
        this.addMap('1')
        this.mapRadio = '1'
      } else {
        console.log('false')
        this.delAllMap()
      }
    },
    getElementsByName(elName) {
      const _elements = []
      for (const key of this.$store.getters.activePage.elements) {
        if (key.elName === elName) {
          _elements.push(key)
        }
      }
      return _elements
    },
    handleChange() {
      this.delAllMap()
      this.addMap(this.mapRadio)
    },
    addMap(index) {
      const components = this.componentsBgList.components
      const ele = components.find((item) => {
        return item.index === index
      })
      // console.log('ele', ele)
      const props = this.getComponentProps(ele.elName)
      // debugger
      this.$store.dispatch('addBackgroundMap', { ...ele, needProps: props })
    },
    delAllMap() {
      this.$store.dispatch('removeBackgroundMap')
    },
    /**
     * 根据elname获取组件默认props数据
     * @param elName
     */
    getComponentProps(elName) {
      let elComponentData
      for (const key in _qk_register_components_object) {
        if (key.toLowerCase() === camelCase(elName).toLowerCase()) {
          elComponentData = _qk_register_components_object[key]
          break
        }
      }
      if (!elComponentData) return {}

      const props = {}
      for (const key in elComponentData.props) {
        props[key] = [Object, Array].includes(elComponentData.props[key].type) ? elComponentData.props[key].default() : elComponentData.props[key].default
      }
      return props
    }
  }
}
</script>

<style lang="scss" scoped>
  .components-attr-edit {
    height: 100%;

    .el-scrollbar__wrap {
      overflow-x: hidden !important;
    }
  }

  .components-attr-animate-edit {
    position: relative;
  }

  .attr-title {
    font-weight: bold;
  }

  .attr-item-edit-wrapper {
    padding-left: 18px;
    display: flex;
    width: 100%;
    text-align: center;
    padding-bottom: 10px;

    .attr-item-title {
      text-align: left;
      min-width: 60px;
      line-height: 28px;
      height: 28px;
      font-size: 12px;
    }

    .attr-item-edit-input {
      &.col-2 {
        width: 90px;
        margin-left: 10px;
      }

      &.col-1 {
        width: 250px;
      }

      &.col-3 {
        width: 60px;
        margin-left: 10px;
      }

      &.col-4 {
        width: 50px;
        margin-left: 10px;
      }
    }

    .attr-item-edit-input-des {
      text-align: center;
      line-height: 12px;
      margin-top: 5px;
      font-size: 12px;
      color: #606266;
    }
  }
</style>

<style lang="scss">
  .components-attr-edit {
    height: 100%;

    .el-scrollbar__wrap {
      overflow-x: hidden !important;
    }
  }

  .attr-item-edit-wrapper {
    .el-switch__label {
      color: #606266;
    }

    .el-switch__label.is-active {
      color: #4072EE;
    }

    .el-switch {
      margin: 3.6px 0;

      .el-switch__core::after {
        background-color: #4B4F55 !important;
      }
    }

    .el-switch.is-checked {
      .el-switch__core::after {
        background-color: #FFFFFF !important;
      }
    }
  }
</style>
