<template>
  <div ref="elMain" class="editor-pane" @click="handleClickCanvas" @keyup.esc="handleKeyup">
    <el-main>
      <div
        class="editor-pane-inner"
        :style="{width: editorPaneInnerWidth + 'px',height: editorPaneInnerHeight + 'px'}"
      >
        <div
          id="editor-main"
          class="editor-main"
          @drop="handleDrop"
          @dragover="handleDragOver"
          :style="{transform: 'scale('+scale+')',left: translateX + 'px',top: translateY + 'px', width: projectData.width + 'px', height: projectData.height + 'px'}"
        >
          <div
            id="canvas-panel"
            ref="canvasPanel"
            class="page-preview-wrapper"
            :style="getCommonStyle(activePage.commonStyle)"
          >
            <div
              v-if="projectData.bgMapObj"
              style="position: relative; width: 100%; height: 100%;"
              @click.stop="handleBgElementClick()"
            >
              <div class="baMap">
                <component
                  :is="projectData.bgMapObj.elName"
                  class="element-on-edit-pane"
                  v-bind="{...projectData.bgMapObj.propsValue}"
                />
              </div>
            </div>
            <!--页面组件列表展示-->
            <edit-shape
              v-for="item in activePage.elements"
              :key="item.uuid"
              :uuid="item.uuid"
              :e-data="item"
              :default-style="item.commonStyle"
              :style="getCommonStyle(item.commonStyle)"
              :active="item.uuid === activeElementUUID"
              @handleElementClick="handleElementClick(item.uuid)"
              @resize="handleElementResize"
            >
              <!--组件编辑区域 外部遮层-->
              <div
                class="edit-shape-component"
                style="position: absolute; width: 100%;height: 100%; z-index: 999;"
              />
              <component
                :is="item.elName"
                class="element-on-edit-pane"
                v-bind="{...item.propsValue, value: item.value}"
              />
            </edit-shape>
          </div>
          <div class="page-wrapper-mask"/>
        </div>
      </div>
    </el-main>
    <el-footer>
      <el-row>
        <el-col :span="8">
          <div class="">
            <i class="el-icon-location-outline"/>坐标：<span>{{ eX }} , {{ eY }}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="page-center">
            <i class="el-icon-c-scale-to-original"/>尺寸：<span>{{ projectData.width }} , {{ projectData.height }}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="footer-designer-zoom">
            <label @click="editScale('reduce')">
              <i class="el-icon-zoom-out"/>
            </label>
            <el-slider v-model="scaleValue" :min="20" :max="200" :step="5" @change="updateScale"/>
            <label @click="editScale('plus')">
              <i class="el-icon-zoom-in"/>
            </label>
          </div>
        </el-col>
      </el-row>
    </el-footer>
  </div>
</template>

<script>
import { _qk_register_components_object } from '../custom-component/plugins'
import editShape from '../../../components/edit-shape'
import editorProjectConfig from '../custom-component/DataModel'
import { mapState, mapGetters } from 'vuex'
import html2canvas from 'html2canvas'
import { camelCase } from 'lodash'

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
      default: 0
    }
  },
  // computed: {
  //   getCommonStyle() {
  //     return editorProjectConfig.getCommonStyle()
  //   }
  // },
  data() {
    return {
      translateNone: 100,
      editorPaneInnerWidth: 0,
      editorPaneInnerHeight: 0,
      translateX: 0,
      translateY: 0,
      eX: 0,
      eY: 0,
      scaleValue: 0,
      getCommonStyle: editorProjectConfig.getCommonStyle,
      menuOptions: [{
        title: '复制',
        icon: 'iconfont iconfuzhi',
        value: 'copy'
      }, {
        title: '删除',
        icon: 'iconfont iconshanchu',
        value: 'delete'
      }, {
        title: '字体放大',
        icon: 'iconfont iconzitifangda',
        value: 'fontA+'
      }, {
        title: '字体缩小',
        icon: 'iconfont iconzitisuoxiao',
        value: 'fontA-'
      }, {
        title: '字体加粗',
        icon: 'iconfont iconzitijiacu',
        value: 'fontB'
      }, {
        title: '图层上移',
        icon: 'iconfont iconziyuan1',
        value: 'layerUp'
      }, {
        title: '图层下移',
        icon: 'iconfont iconxiayiyiceng',
        value: 'layerDown'
      }, {
        title: '图层置顶',
        icon: 'iconfont iconcontrol-top',
        value: 'layerTop'
      }, {
        title: '图层置底',
        icon: 'iconfont iconcontrol-bottom',
        value: 'layerBottom'
      }]
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
      'activePage'
    ])
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    'projectData.canvasScale': {
      handler(newVal, oldVal) {
        console.log('canvasScale', newVal)
        this.updateSize(newVal)
        this.scaleValue = newVal * 100
      },
      deep: true
    }
  },
  // created() {
  // },
  mounted() {
    const self = this
    this.scaleValue = parseInt((this.scale * 100).toFixed(0))
    // let that = this;
    // window.onresize = function(){
    //   this.clientHeight =  `${document.documentElement.clientHeight}`;
    //   if(that.$refs.page){
    //     that.$refs.page.style.minHeight = clientHeight - 100 + 'px';
    //   }
    // }
    self.clientHeight = `${document.documentElement.clientHeight}`// 获取浏览器可视区域高度
    self.clientWidth = `${document.documentElement.clientWidth}`// 获取浏览器可视区域高度
    console.log('clientHeight', self.clientHeight)
    console.log('clientWidth', self.clientWidth)
    if (this.scale === 0.2) {
      this.updateSize(this.updateSizeEL())
    }
    window.onresize = () => {
      self.clientHeight = `${document.documentElement.clientHeight}`// 获取浏览器可视区域高度
      self.clientWidth = `${document.documentElement.clientWidth}`// 获取浏览器可视区域高度
      return (() => {
        this.updateSize(this.scale)
        this.updateSizeEL()
      })()
    }
  },
  methods: {
    handleDrop(e) {
      e.preventDefault()
      e.stopPropagation()
      const elName = e.dataTransfer.getData('elName')
      const component = editorProjectConfig.getEleByElName(elName)
      const props = this.getComponentProps(elName)
      component.defaultStyle.top = e.offsetY
      component.defaultStyle.left = e.offsetX
      this.$store.dispatch('addElement', { ...component, needProps: props })
    },

    handleDragOver(e) {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
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
    },
    // 计算比例的方法 小数
    updateSizeEL() {
      const eWidth = this.clientWidth
      const eHeight = this.clientHeight
      this.editorPaneInnerWidth = eWidth
      this.editorPaneInnerHeight = eHeight - 25
      let scaleW = 1
      let scaleH = 1
      let _scale = 1
      if (this.projectData.width > this.editorPaneInnerWidth) {
        scaleW = (this.editorPaneInnerWidth - this.translateNone * 2) / this.projectData.width
      }
      if (this.projectData.height > this.editorPaneInnerHeight) {
        scaleH = (this.editorPaneInnerHeight - this.translateNone * 2) / this.projectData.height
      }
      if (scaleW > scaleH) {
        _scale = scaleH
      } else {
        _scale = scaleW
      }
      this.updateScale(parseInt(_scale * 100)) // 整数
      return _scale
    },
    // 改变显示 小数
    updateSize(_scale) {
      const eWidth = this.$refs.elMain.clientWidth
      const eHeight = this.$refs.elMain.clientHeight - 25
      this.editorPaneInnerWidth = parseInt(this.projectData.width * _scale + this.translateNone * 2)
      if (eWidth > this.editorPaneInnerWidth) {
        this.editorPaneInnerWidth = eWidth
      }
      this.editorPaneInnerHeight = parseInt(this.projectData.height * _scale + this.translateNone * 2)
      if (eHeight > this.editorPaneInnerHeight) {
        this.editorPaneInnerHeight = eHeight
      }
      if ((this.projectData.width * _scale) > eWidth) {
        this.translateX = this.translateNone
      } else {
        this.translateX = parseInt((this.editorPaneInnerWidth - (this.projectData.width * _scale)) / 2)
      }
      if ((this.projectData.height * _scale) > eHeight) {
        this.translateY = this.translateNone
      } else {
        this.translateY = parseInt((this.editorPaneInnerHeight - (this.projectData.height * _scale)) / 2)
      }
    },
    // 派发和改变数据 整数
    updateScale(val) {
      this.scaleValue = val
      const value = parseFloat((val * 0.01).toFixed(2)) // 小数
      this.projectData.canvasScale = value // 小数
      this.$store.dispatch('setPrjectData', this.projectData)
      this.updateSize(value)
      this.$emit('update:scale', value)
    },
    editScale(type) {
      if (type === 'plus') {
        this.scaleValue = this.scaleValue + 5
      } else if (type === 'reduce') {
        this.scaleValue = this.scaleValue - 5
      } else if (type === 'reset') {
        this.scaleValue = 1
      }
      const value = parseFloat((this.scaleValue * 0.01).toFixed(2)) // 小数
      this.updateSize(value)
      this.$emit('update:scale', value)
    },
    /**
     * 元素被点击
     * @param uuid
     */
    handleElementClick(uuid) {
      this.$store.dispatch('setActiveElementUUID', uuid)
    },
    handleBgElementClick(e) {
      this.$store.dispatch('setActiveElementUUID', this.projectData.bgMapObj.uuid)
    },
    /**
     * 移动改变元素大小定位
     * @param pos 当pos有值表示移动中需要实时同步样式变化，pos为undefind时则表示移动结束，记一次历史纪录
     * 鼠标移动完成时才记入历史纪录
     */
    handleElementResize(pos) {
      if (!pos) {
        console.log('addHistoryCache')
        this.$store.dispatch('addHistoryCache')
        return
      }
      this.projectData.pages[this.currentPageIndex].elements[this.activeElementIndex].commonStyle.left = pos.left
      // 更新元素commonStyle
      console.log('handleElementResize', { ...pos })
      this.projectData.pages[this.currentPageIndex].elements[this.activeElementIndex].commonStyle = {
        ...pos
      }
      this.eX = pos.left
      this.eY = pos.top
    },
    handleClickCanvas(e) {
      if (!e.target.classList.contains('element-on-edit-pane') && !e.target.classList.contains('menu-item-on-edit-panel')) {
        console.log('handleClickCanvas----123--123')
        this.$store.dispatch('setActiveElementUUID', '')
      }
    },
    /**
     * 对元素进行操作命令
     */
    handleElementCommand(command) {
      console.log('handleElementCommand')
      this.$store.dispatch('elementCommand', command)
    },
    /**
     * 监听键盘事件
     * @param e
     */
    handleKeyup(e) {
      console.log(1111, e)
    },

    /**
     * 提供截屏作为项目主图
     */
    async screenshots() {
      const self = this
      const el = document.querySelector('#canvas-panel')
      try {
        const canvas = await html2canvas(el, {
          useCORS: true,
          backgroundColor: null
        })
        const url = canvas.toDataURL()
        // const imgFile = self.dataURLtoFile(url)
        self.projectData.coverImage = url
        self.$notify({
          title: '缩略图截取成功！',
          message: '',
          type: 'success',
          duration: 2500
        })
      } catch (e) {
        self.$notify({
          title: '截取失败！',
          message: '未知错误',
          type: 'success',
          duration: 2500
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-main {
  padding: 0px; /*szd 复写*/
  display: block;
  width: 100%;
  height: calc(100% - 30px);
  /*overflow: hidden;*/
  overflow: auto;
  /*flex: 1;*/
  background: linear-gradient(-90deg, hsla(0, 4%, 71%, .1) 1px, transparent 0) 0 0/20px 20px, linear-gradient(0deg, hsla(0, 4%, 71%, .1) 1px, transparent 0) 0 0/20px 20px;
}

.editor-pane {
  position: relative;
  height: 100%;
  width: 100%;
  background: #171b22 !important;
  /*display: flex;*/
  /*justify-content: center;*/
}

.editor-pane-inner {
  /*width: calc(100vh - 680px);*/
  /*height: 100%;*/
  /*width: 100%;*/
  /*max-height: calc(100vh - 85px);*/
  /*padding: 20px;*/
}

.editor-main {
  border-radius: 3px;
  /*box-shadow: 0 3px 10px #dcdcdc;*/
  /*margin: 25px auto;*/
  position: relative;
  /*background: white;*/
  /*szd 去*/
  /*transform-origin: center top;*/
  transform-origin: 0px 0px;
  transition: all 0.2s ease 0s;
}

.page-preview-wrapper {
  height: 100%;
  position: relative;
}

.page-wrapper-mask {
  height: 100%;
  width: 100%;
  z-index: 1000;
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  /*outline: rgba(236, 238, 240, 0.77) solid 10000px;*/
}

.baMap {
  position: absolute !important;
  z-index: -9999 !important;
  width: 100%;
  height: 100%;
}

.element-on-edit-pane {
  position: absolute;
  z-index: -99;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.page-wrapper-menu-operation {
  position: absolute;
  right: -80px;
  top: 5%;
  width: 0;
  background: white;
  color: #333;
  text-align: center;
  z-index: 1002;
  border-radius: 4px;
  display: none;
  transition: all 0.28s;
  opacity: 0;
  transform-origin: center top;

  .menu-item {
    padding: 10px;
    cursor: pointer;

    &.i {
      font-size: 24px;
      line-height: 30px;
    }

    &:hover {
      background: #292E33;
      color: #4072EE;

      &.i {
        font-weight: bold;
        font-size: 26px;
      }
    }
  }

  &.active {
    display: block;
    width: 60px;
    opacity: 1;
  }
}

.el-footer {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  color: #C0C4CC;
  background: #1F2327 !important;
  height: 30px !important;
  line-height: 25px !important;
  font-size: 12px;

  i {
    display: inline-block;
    vertical-align: middle;
    margin-right: 2px;
    font-size: 14px;
    line-height: 25px !important;
  }

  .page-center {
    text-align: center;
  }

  .footer-designer-zoom {
    position: relative;
    float: right;
    width: 50%;
    max-width: 200px;
    margin-right: 8px;
    line-height: 25px;

    label {
      position: absolute;
      top: 0;
      line-height: 25px;
      height: 25px;

      i {
        display: inline-block;
        line-height: 25px;
        height: 25px;
        font-size: 14px;
      }
    }

    label:first-child {
      left: 0;
    }

    label:last-child {
      right: 0;
    }
  }
}
</style>
<style lang="scss">
.footer-designer-zoom {
  .el-slider {
    padding: 0 30px;
    line-height: 25px;
    height: 25px;

    .el-slider__runway {
      margin: 11px 0;
      height: 2px;
      background-color: #363C43;
    }

    .el-slider__bar {
      height: 2px;
      background-color: #4072EE;
    }

    .el-slider__button-wrapper {
      width: 25px;
      height: 25px;
      top: -12px;

      .el-slider__button {
        width: 12px;
        height: 12px;
        border-color: #4072EE;
      }
    }
  }
}
</style>
