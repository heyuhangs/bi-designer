<template>
  <div
    class="view-main"
    :style="{transform: 'scale('+scale+')', width: projectData.width + 'px', height: projectData.height + 'px'}"
  >
    <div
      id="canvas-panel"
      ref="canvas-panel"
      class="view-page-preview-wrapper"
      :style="getCommonStyle(ele.commonStyle)"
    >
      <!--   背景地图   -->
      <div
        v-if="projectData.bgMapObj"
        style="position: relative; width: 100%; height: 100%;"
      >
        <div class="baMap">
          <component
            :is="projectData.bgMapObj.elName"
            class="element-on-edit-pane"
            v-bind="{...projectData.bgMapObj.propsValue}"
          />
        </div>
      </div>
      <!--   组件属性   -->
      <div
        v-for="item in ele"
        :key="item.uuid"
        :class="{'components-edit-shape-bg' : item.isBackground}"
        :uuid="item.uuid"
        :default-style="item.commonStyle"
        :style="getCommonStyle(item.commonStyle)"
      >
        <component :is="item.elName" class="element-on-edit-pane" v-bind="{...item.propsValue, value: item.value}" />
      </div>
    </div>
  </div>
</template>

<script>
import { _qk_register_components_object } from '../../plugins/index'
import editShape from '../../../../components/edit-shape'
import editorProjectConfig from '../../DataModel'
import { mapState, mapGetters } from 'vuex'
// todo 测试用
window._qk_register_components_object = _qk_register_components_object
export default {
  components: {
    // 批量注册qk组件
    ..._qk_register_components_object,
    // 画板组件
    [editShape.name]: editShape
  },
  props: {
    // canvas画板缩放
    scale: {
      type: Number,
      default: 1
    },
    ele: {
      type: Array,
      default: () => {
        return []
      }
    },
    projectData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      // ele: [],
      // projectData: {},
      getCommonStyle: editorProjectConfig.getCommonStyle
    }
  },
  computed: {
    ...mapState({
      // projectData: state => state.editor.projectData,
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
  }
}
</script>

<style lang="scss" scoped>
.components-edit-shape-bg {
  position: absolute !important;
  width: 100% !important;
  height: 100% !important;
}

.view-page-preview-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
