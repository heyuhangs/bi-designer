<template>
  <div v-loading="loading" class="view" :style="divTrans">
    <view-page ref="viewPage" :ele="ele" :project-data="projectData" />
    <loading-bar v-show="loading" />
  </div>
</template>

<script>
import loadingBar from '@/components/loadingBar'
import ViewPage from './components/ViewPage'
import Unit from './custom-component/plugins/unit'

export default {
  components: {
    ViewPage,
    loadingBar
  },
  data() {
    return {
      loading: false,
      divTrans: {},
      projectData: {},
      ele: []
    }
  },
  async mounted() {
    this.loadingBar = true
    const eventId = this.$route.query.id
    const event = []
    event.push({
      id: this.$route.query.point_id,
      objectId: this.$route.query.objectId
    })

    if (eventId) {
      Unit.$data.secondList = event
    }

    this.projectData = JSON.parse(localStorage.getItem('projectData'))
    this.ele = this.projectData.pages[0].elements
    if (this.projectData.pisProportionalScaling) {
      this.trans()
      window.onresize = () => {
        return (() => {
          this.trans()
        })()
      }
    } else {
      this.divTrans = { overflow: 'auto' }
    }
    setTimeout(function() {
      this.loading = false
    }, 1500)
  },
  methods: {
    trans() {
      // 获取当前屏幕可视宽、高
      const wid = document.body.clientWidth
      const hei = document.body.clientHeight

      // 预设原始像素比例（不同LED大屏比例可修改设置）
      const temp = this.projectData.width / this.projectData.height
      // 当前屏幕像素比例
      const c_temp = wid / hei
      // 当前屏幕宽度大于高度
      if (temp <= c_temp) {
        // 以高度缩放 填满， 宽度按比例位移
        const h = hei / this.projectData.height
        // 计算位移的大小：屏幕当前可视宽度 减去页面内容（document）缩放后宽度 ，然后除以2（即左右平均分配的空白宽度大小），
        // 然后除以缩放比例 h（重要：因为是按比例缩放的，所以位移大小也需要按比例计算）
        const translate_w = ((wid - (this.projectData.width * h)) / 2) / h
        this.divTrans = { transform: 'scale(' + h + ') translate(' + translate_w + 'px,0px)' }
      } else {
        // 以宽度缩放 填满， 高度按比例位移
        const r = document.body.clientWidth / this.projectData.width
        // 计算位移的大小：屏幕当前可视高度 减去页面内容（document）缩放后高度 ，然后除以2（即上下平均分配的空白高度大小），
        // 然后除以缩放比例 r（重要：因为是按比例缩放的，所以位移大小也需要按比例计算）
        const translate_h = ((hei - (this.projectData.height * r)) / 2) / r
        this.divTrans = { transform: 'scale(' + r + ') translate(0px,' + translate_h + 'px)' }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.view {
  position: relative;
  width: 100%;
  height: 100%;
  transform: scale(1) translate(0px, 0px);
  transform-origin: 0px 0px;
}
</style>
