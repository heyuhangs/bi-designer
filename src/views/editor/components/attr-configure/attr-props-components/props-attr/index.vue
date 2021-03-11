<template>
  <div v-if="currentElementProps.length">
    <p class="page-title fontBold">组件属性</p>
    <component
      :is="'attr-qk-' + item"
      v-for="item in currentElementProps"
      :key="item"
      v-bind.sync="activeElement.propsValue"
    />
  </div>
</template>

<script>
import attrComponents from './index.js'
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    ...attrComponents
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
      'activePage'
    ]),
    /**
     * 当前选中元素需要编辑得props 列表
     */
    currentElementProps() {
      if (!this.activeElement || !this.activeElement.propsValue) {
        return []
      }
      let keyList = Object.keys(this.activeElement.propsValue).filter(item => {
        if (item === 'comData' || item === 'configObj' || item === 'apiObj' || item === 'dataType' || item === 'inxDataApi' || item === 'mapTreeManu' || item === 'fieldArray') {
          return ''
        } else {
          return item
        }
      })
      const editPropsComponentNameList = Object.keys(attrComponents)
      // 过滤掉找不到对应attr props编辑组件的key
      keyList = keyList.filter(v => {
        return editPropsComponentNameList.indexOf('AttrQk' + v)
      })
      return keyList
    }
  }
}
</script>

<style scoped>
.bas-com-padding {
  padding-bottom: 15px;
}
</style>
