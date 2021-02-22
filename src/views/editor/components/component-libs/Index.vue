<template>
  <div class="components-libs-wrapper scrollbar-wrapper">
    <el-scrollbar style="height: 100%;">
      <ul class="scrollbar-wrapper">
        <!--        v-for="(item, index) in componentsList" :key="index"-->
        <li class="clearfix paddingB10">
          <!--          <div v-if="item.title" class="components-libs-title">-->
          <!--            <p>{{ item.title }}</p>-->
          <!--          </div>-->
          <!--          v-if="item.components && item.components.length"-->
          <div
              class="components-lib-item-box"
              @dragstart="handleDragStart"
          >
            <div
                v-for="(element,i) in componentsList"
                :key="i"
                draggable
                :data-index="element.elName"
                class="components-lib-item"
                @click="handleClick(element)"
            >
              <div class="lib-item-img">
                <svg-icon v-if="element.isSvg" :icon-class="element.icon"/>
                <i v-else :class="[element.icon]"/>
              </div>
              <p class="lib-item-title">{{ element.title }}</p>
            </div>
          </div>
          <!--          <div v-else>-->
          <!--            <p class="gray text-center paddingT20">待完善...</p>-->
          <!--          </div>-->
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>

<script>
import { camelCase } from 'lodash'
import editorProjectConfig from '@/views/editor/custom-component/DataModel'
// import eleConfig from '../../'
import { _qk_register_components_object } from '../../custom-component/plugins/index'

window._qk_register_components_object = _qk_register_components_object
console.log(_qk_register_components_object)
export default {
  name: 'ComponentLibs',
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      componentsList: this.list
    }
  },
  created() {
    // debugger
    console.log('componentsList', this.componentsList)
    // debugger
  },
  methods: {
    handleDragStart(e, e1, e2) {
      // console.log('aaaa')
      e.dataTransfer.setData('elName', e.target.dataset.index)
    },
    /**
     * 点击事件, 向父组件派发add-element事件，参数： 当前组件对象
     * @param item
     */
    handleClick(item) {
      // debugger "IocHeder"
      const props = this.getComponentProps(item.elName)
      this.$store.dispatch('addElement', { ...item, needProps: props })
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
.components-libs-wrapper {
  user-select: none;
  height: 100%;
  padding-top: 8px;
  position: relative;

  & ul {
    padding: 10px;
  }
}

.page-title {
  position: absolute;
  top: 16px;
  left: 0;
  width: 100%;
}

.components-libs-title {
  margin-bottom: 18px;
}

.components-lib-item-box {
  margin: -8px;

  .components-lib-item {
    background: #1F2327;
    text-align: center;
    color: #C0C4CC;
    width: 122px;
    float: left;
    margin: 8px;
    /*border: 1px solid #dddddd;*/
    font-size: 12px;
    cursor: pointer;
    transition: All 0.3s ease-in-out;
    border-radius: 2px;

    &:hover {
      color: #4072EE;
      background-color: #292E33;

      .lib-item-title {
        background-color: #1F2327;
      }
    }

    .lib-item-img {
      width: 122px;
      font-size: 100px;
      margin-top: -20px;
      margin-bottom: -25px;
    }

    .lib-item-title {
      background-color: #292E33;
      line-height: 24px;
    }
  }
}
</style>
