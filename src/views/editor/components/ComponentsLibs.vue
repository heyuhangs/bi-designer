<template>
  <el-tabs>
    <el-tab-pane>
      <span slot="label">组件</span>
      <component-menu />
    </el-tab-pane>
    <el-tab-pane label="消息中心">
      <span slot="label">图层</span>
      <layer-components />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import componentMenu from './left-menu/componentMenu'
import layerComponents from './left-menu/layerComponents'

export default {
  name: 'ComponentsLibs',
  components: {
    componentMenu,
    layerComponents
  }
}
</script>

<style scoped>

</style>
