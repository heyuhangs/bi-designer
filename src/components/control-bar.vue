<template>
  <div class="components-contrl-bar">
    <!--    重写  -->
    <div class="components-designer-toolbar">
      <div class="group">
        <div class="name">常规</div>
        <div class="toolbar">
          <el-tooltip class="item" effect="dark" content="复制" placement="bottom">
            <button
              class="button-item iconfont iconfuzhi"
              :disabled="!activeElementUUIDNum"
              :class="{disabled: !activeElementUUIDNum}"
              @click="handleElementCommand('copy')"
            />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
            <button
              class="button-item iconfont iconshanchu"
              :disabled="!activeElementUUIDNum"
              :class="{disabled: !activeElementUUIDNum}"
              @click="handleElementCommand('delete')"
            />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="撤销" placement="bottom">
            <button
              class="button-item iconfont iconundo1"
              :disabled="!activeElementUUIDNum"
              :class="{disabled: !activeElementUUIDNum}"
              @click="editorUndo()"
            />
          </el-tooltip>
        </div>
      </div>
      <div class="group">
        <div class="name">图层</div>
        <div class="toolbar">
          <el-tooltip class="item" effect="dark" content="图层上移" placement="bottom">
            <button
              class="button-item iconfont iconziyuan1"
              :disabled="!activeElementUUIDNum"
              :class="{disabled: !activeElementUUIDNum}"
              @click="handleElementCommand('layerUp')"
            />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="图层下移" placement="bottom">
            <button
              class="button-item iconfont iconxiayiyiceng"
              :disabled="!activeElementUUIDNum"
              :class="{disabled: !activeElementUUIDNum}"
              @click="handleElementCommand('layerDown')"
            />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="图层置顶" placement="bottom">
            <button
              class="button-item iconfont iconcontrol-top"
              :disabled="!activeElementUUIDNum"
              :class="{disabled: !activeElementUUIDNum}"
              @click="handleElementCommand('layerTop')"
            />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="图层置底" placement="bottom">
            <button
              class="button-item iconfont iconcontrol-bottom"
              :disabled="!activeElementUUIDNum"
              :class="{disabled: !activeElementUUIDNum}"
              @click="handleElementCommand('layerBottom')"
            />
          </el-tooltip>
        </div>
      </div>
      <div class="group">
        <div class="name">对齐</div>
        <div class="toolbar">
          <el-tooltip class="item" effect="dark" content="左对齐" placement="bottom">
            <button
              class="button-item iconfont iconzuoduiqi"
              :disabled="!activeElementUUIDNum"
              :class="{disabled: !activeElementUUIDNum}"
              @click="changeAlignType('l')"
            />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="右对齐" placement="bottom">
            <button
              class="button-item iconfont iconyouduiqi"
              :disabled="!activeElementUUIDNum"
              :class="{disabled: !activeElementUUIDNum}"
              @click="changeAlignType('r')"
            />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="上对齐" placement="bottom">
            <button
              class="button-item iconfont iconshangduiqi"
              :disabled="!activeElementUUIDNum"
              :class="{disabled: !activeElementUUIDNum}"
              @click="changeAlignType('t')"
            />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="下对齐" placement="bottom">
            <button
              class="button-item iconfont iconxiaduiqi"
              :disabled="!activeElementUUIDNum"
              :class="{disabled: !activeElementUUIDNum}"
              @click="changeAlignType('b')"
            />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="垂直居中对齐" placement="bottom">
            <button
              class="button-item iconfont iconchuizhijuzhongduiqi"
              :disabled="!activeElementUUIDNum"
              :class="{disabled: !activeElementUUIDNum}"
              @click="changeAlignType('tb')"
            />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="水平居中对齐" placement="bottom">
            <button
              class="button-item iconfont iconshuipingjuzhongduiqi"
              :disabled="!activeElementUUIDNum"
              :class="{disabled: !activeElementUUIDNum}"
              @click="changeAlignType('lr')"
            />
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="components-designer-menuber">
      <!--      <el-tooltip class="item" effect="dark" content="预览" placement="bottom">-->
      <!--        <el-button class="menuber-item" @click="savePreview">-->
      <!--          <i class="iconfont iconyulan" />-->
      <!--          <p>刷新预览</p>-->
      <!--        </el-button>-->
      <!--      </el-tooltip>-->
      <el-tooltip class="item" effect="dark" content="预览" placement="bottom">
        <el-button class="menuber-item" @click="showPreview">
          <i class="iconfont iconyulan"/>
          <p>预览</p>
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="保存" placement="bottom">
        <el-button
          class="menuber-item"
          @click="save"
        >
          <!--          :class="{disabled: !activePage.elements.length}"-->
          <i class="iconfont iconbaocun"/>
          <p>保存</p>
        </el-button>
      </el-tooltip>
      <!--      <el-tooltip class="item" effect="dark" content="发布" placement="bottom">-->
      <!--        <el-popover-->
      <!--          placement="bottom"-->
      <!--          width="400"-->
      <!--          trigger="click"-->
      <!--        >-->
      <!--          <template>-->
      <!--            <div class="publish-con">-->
      <!--              <el-input ref="publishInput" disabled :value="publishVal"/>-->
      <!--              <el-button @click="copyPublishVal">复制</el-button>-->
      <!--            </div>-->
      <!--          </template>-->
      <!--          <el-button slot="reference" class="menuber-item" @click="publishFn">-->
      <!--            <i class="iconfont iconfabu"/>-->
      <!--            <p>发布</p>-->
      <!--          </el-button>-->
      <!--        </el-popover>-->
      <!--      </el-tooltip>-->
      <el-tooltip class="item" effect="dark" content="导出文件" placement="bottom">
        <el-button class="menuber-item" @click="exportJSONFile">
          <i class="tjIconfont tjfont-export"/>
          <p>导出文件</p>
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="导入文件" placement="bottom">
        <el-button class="menuber-item">
          <el-upload
            action=""
            :show-file-list="false"
            :on-success="handleAvatarSuccessA"
            :on-change="importf"
          >
            <i class="tjIconfont tjfont-import"/>
            <p>导入文件</p>
          </el-upload>
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="退出" placement="bottom">
        <el-button class="menuber-item" @click="quit">
          <!--          <i class="iconfont iconfabu" />-->
          <i class="el-icon-switch-button"/>
          <p>退出</p>
        </el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import { ceil, subtract, divide } from 'lodash'

export default {
  components: {
    // UploadPsd
  },
  props: {
    // 是否loading
    loading: {
      type: Boolean,
      default: false
    },
    scale: {
      type: Number,
      default: 1
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 画板缩放
      scaleValue: 1,
      publishVal: ''
    }
  },
  computed: {
    ...mapState({
      projectData: state => state.editor.projectData,
      activeElementUUIDNum: state => state.editor.activeElementUUID
    }),
    ...mapGetters([
      'canUndo',
      'canRedo',
      'activePage',
      'activeElement'
    ])
  },
  watch: {
    activeElementUUIDNum(val, nval) {
      this.handleElementUUIDChange()
    }
  },
  created() {
    this.scaleValue = this.scale
  },
  methods: {
    ...mapActions([
      'editorUndo',
      'editorRedo'
    ]),
    exportJSONFile() {
      // console.log('projectData', )
      const bigScreen = JSON.stringify(this.projectData)
      const fileSaver = require('file-saver')
      const blob = new Blob([bigScreen], { type: 'text/plain; charset=utf-8' })
      fileSaver.saveAs(blob, `/${this.projectData.id}.json`)
    },
    handleAvatarSuccessA() {
    },
    async importf(file) {
      const self = this
      const bigScreenList = await JSON.parse(localStorage.getItem('bigScreenList') || '[]')
      console.log('bigScreenList', bigScreenList)
      const reader = new FileReader()
      reader.readAsText(file.raw)
      reader.onload = async function(result) {
        const pro = JSON.parse(this.result)
        const id = ((new Date()).getTime()) + ''
        pro.id = id
        bigScreenList.push(pro)
        // await localStorage.setItem('bigScreenList', JSON.stringify(bigScreenList))
        self.$store.dispatch('setPrjectData', pro)
        // self.$emit('importSuccess')
        self.$message.success('导入成功!')
      }
    },
    handleElementUUIDChange() {
      // debugger
      if (this.activeElement && !this.activeElement.isBackground) {
        this.activeElementUUID = this.activeElementUUIDNum
      } else {
        this.activeElementUUID = ''
      }
    },
    /**
     * 对元素进行操作命令
     */
    handleElementCommand(command) {
      this.$store.dispatch('elementCommand', command)
    },
    /**
     *
     * @param type
     */
    changeAlignType(type) {
      const canvasW = this.$config.canvasH5Width
      const canvasH = this.$config.canvasH5Height
      const eleW = this.activeElement.commonStyle.width
      const eleH = this.activeElement.commonStyle.height
      switch (type) {
        case 't':
          this.activeElement.commonStyle.top = 0
          break
        case 'b':
          this.activeElement.commonStyle.top = subtract(canvasH - eleH)
          break
        case 'l':
          this.activeElement.commonStyle.left = 0
          break
        case 'r':
          this.activeElement.commonStyle.left = subtract(canvasW - eleW)
          break
        case 'tb':
          this.activeElement.commonStyle.top = ceil(divide(subtract(canvasH - eleH), 2), 2)
          break
        case 'lr':
          this.activeElement.commonStyle.left = ceil(divide(subtract(canvasW - eleW), 2), 2)
          break
      }
    },
    /**
     * 更新画板大小
     */
    updateScale(type, value) {
      if (type === 'plus') {
        this.scaleValue = this.scaleValue + (value || 0.1) > 2 ? 2 : this.scaleValue + (value || 0.1)
      } else if (type === 'reduce') {
        this.scaleValue = this.scaleValue - (value || 0.1) > 0.5 ? this.scaleValue - (value || 0.1) : 0.5
      } else if (type === 'reset') {
        this.scaleValue = value || 1
      }
      this.$emit('update:scale', this.scaleValue)
    },
    /**
     * 获取psd数据
     */
    uploadSuccessPsd(dataList) {
      this.$emit('import-psd-data', dataList)
    },
    /**
     * 保存
     */
    save() {

    },
    /**
     * 显示预览
     */
    async showPreview() {
      // const self = this
      // await this.screenshots()
      // 提交数据再预览
      // console.log(this.projectData)
      // localStorage.setItem('projectData', JSON.stringify(this.projectData))
      // const query = {}
      // if (this.projectData.objectId) {
      //   query.id = this.projectData.objectId
      // }
      await this.savePreview()
      const { href } = this.$router.resolve({ name: 'View' })
      // const { href } = this.$router.resolve({ name: 'View', query: query })
      window.open(href, '_blank')
      // this.showPreview = true
      // this.$axios.post('/page/update/' + this.id, this.`projectData`).then(() => {
      // this.showPreview = true
      // })
    },
    async savePreview() {
      console.log(this.projectData)
      localStorage.setItem('projectData', JSON.stringify(this.projectData))
      this.$store.dispatch('setPrjectData', this.projectData)
    },
    /**
     * 复制
     */
    copyPublishVal() {
      const input = document.createElement('input') // 直接构建input
      input.value = this.publishVal // 设置内容
      document.body.appendChild(input) // 添加临时实例
      input.select() // 选择实例内容
      document.execCommand('Copy') // 执行复制
      document.body.removeChild(input) // 删除临时实例
      this.$message({
        message: '复制成功',
        type: 'success'
      })
    },
    /**
     * 发布
     */
    // publishFn() {
    //   const localHref = window.location.href
    //   const startInx = localHref.indexOf('#/')
    //   const { href } = this.$router.resolve({ name: 'View' })
    //   // debugger
    //   this.publishVal = localHref.substring(0, (startInx)) + `${href}?id=${this.id}`
    // },
    quit() {
      this.$router.push('/bigscreenList?id=' + this.$route.query.projectId)
    },
    /**
     * 退出
     */
    cancelFn() {
      this.$confirm('确认退出编辑?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push('/page-list')
      }).catch(() => {
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.components-designer-toolbar {
  display: flex;
  justify-content: space-between;
  flex: 1 1 0%;
  max-width: 460px;
  /*width: 920px;*/
  line-height: 1;
  vertical-align: top;

  .button-item {
    display: inline-block;
    /*width: 60px;*/
    cursor: pointer;
    text-align: center;
    vertical-align: bottom;
    /*font-size: 14px;*/
    font-size: 12px;
    transition: color 0.15s, transform 0.15s;
    user-select: none;
    color: $page-header-font-color;
  }

  .group {
    margin: 0 10px;
    padding: 5px 0;

    .name {
      font-size: 12px;
      color: #c0c4cc;
      text-align: center;
      line-height: 22px;
    }

    .toolbar {
      button {
        display: inline-block;
        font-size: 16px;
        color: #c0c4cc;
        text-align: center;
        padding: 4px 5px;
        border: none;
        border-radius: 2px;
        vertical-align: top;
        background: none;

        &:hover {
          color: $primary;
        }
      }

      .is-disabled {
        color: #606266 !important;

        &:hover {
          color: #606266 !important;
        }
      }
    }
  }
}

.publish-con {
  display: flex;
  justify-content: flex-start;

  .el-button {
    margin-left: 15px;
  }
}

.components-designer-menuber {
  position: relative;
  margin: 0;
  padding-left: 0;
  overflow: hidden;

  .menuber-item {
    float: left;
    height: 60px;
    line-height: 20px;
    padding: 6px 8px;
    font-size: 12px;
    text-align: center;
    color: #c0c4cc;
    cursor: pointer;
    background: rgba(0, 0, 0, 0);
    border: none;
    transition: border-color .3s, background-color .3s, color .3s;

    i {
      margin-right: 0;
      font-size: 18px;
      line-height: 25px;
      color: inherit;
    }

    p {
      vertical-align: middle;
    }

    &:hover {
      background: #4072EE;
      color: #fff;
    }
  }
}

/*重写结束*/
.components-contrl-bar {
  //width: 100%;
  /*display: inline-block;*/
  display: flex;
  justify-content: space-between;
  flex: 0.68;
  /*z-index: 3;*/
  padding: 2px 20px;
  height: 60px;

  .button-item {
    display: inline-block;
    /*width: 60px;*/
    cursor: pointer;
    text-align: center;
    vertical-align: bottom;
    /*font-size: 14px;*/
    font-size: 12px;
    transition: color 0.15s, transform 0.15s;
    user-select: none;
    color: $page-header-font-color;

    &.scale-wrappper {
      width: 140px;
      margin-right: 10px;

      &:hover {
        color: inherit;
        transform: none;
      }

      & > .scale-btn {
        display: inline-block;
        vertical-align: middle;
        padding: 6px 2px;
        font-size: 20px;
        /*transition: all 0.28s;*/

        &:hover {
          color: $primary;
        }
      }
    }

    &:hover {
      color: $primary;
      /*transform: scale(1.02);*/
      font-weight: bold;
    }

    &.disabled {
      cursor: not-allowed;
      color: #606266 !important;
    }

    & > i {
      font-size: 18px;
      display: inline-block;
      /*transition: all 0.28s;*/
    }

    & > p {
      font-size: 14px;
    }
  }
}

.scale-input {
  display: inline-block;
  position: relative;
  padding: 7px 0;
  width: 46px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
  border-radius: 17px;
  margin: 0 4px;

  &:hover {
    background: #dfdfdf;
  }
}
</style>
