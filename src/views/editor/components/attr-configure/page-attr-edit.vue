<template>
  <el-scrollbar class="components-attr-edit">
    <!--    <p class="page-title fontBold">当前页样式</p>-->
    <p class="page-title fontBold">场景</p>
    <div class="attr-item-edit-wrapper">
      <div class="attr-item-title">命名大屏：</div>
      <el-row :gutter="20" style="width: 100%;">
        <el-col :span="24">
          <el-input
            v-model="projectData.title"
            size="mini"
            controls-position="right"
            :min="0"
            style="width: 100%;"
          />
        </el-col>
      </el-row>
    </div>
    <!--    -->
    <p class="page-title fontBold">预览</p>
    <div class="attr-item-edit-wrapper">
      <p class="attr-item-title">是否铺满整屏：</p>
      <el-switch
        v-model="projectData.pisProportionalScaling"
        active-text="开"
        inactive-text="关"
        active-color="#4072EE"
        inactive-color="#292E33"
      />
      <!--      <el-row :gutter="20" style="width: 100%;">-->
      <!--        <el-col :span="3">-->
      <!--          <el-color-picker-->
      <!--            v-model="activePage.commonStyle.backgroundColor"-->
      <!--            size="mini"-->
      <!--            :show-alpha="true"-->
      <!--          />-->
      <!--        </el-col>-->
      <!--      </el-row>-->
    </div>
    <!--    -->
    <p class="page-title fontBold">背景</p>
    <div class="attr-item-edit-wrapper">
      <p class="attr-item-title">背景颜色：</p>
      <el-row :gutter="20" style="width: 100%;">
        <el-col :span="3">
          <el-color-picker
            v-model="activePage.commonStyle.backgroundColor"
            size="mini"
            :show-alpha="true"
          />
        </el-col>
      </el-row>
    </div>
    <div class="attr-item-edit-wrapper">
      <p class="attr-item-title" style="line-height: 50px;">背景图片：</p>
      <el-row :gutter="20" style="width: 100%;">
        <el-col :span="24">
          <imageSelect :url.sync="activePage.commonStyle.backgroundImage" />
        </el-col>
      </el-row>
    </div>

    <div>
      <p class="page-title fontBold">尺寸</p>
      <div class="attr-item-edit-wrapper">
        <p class="attr-item-title">屏尺寸：</p>
        <el-row :gutter="20" style="width: 100%;">
          <el-col :span="12">
            <el-input-number
              v-model="projectData.width"
              size="mini"
              controls-position="right"
              :min="0"
              style="width: 100%;"
            />
            <div class="attr-item-edit-input-des">宽度</div>
          </el-col>
          <el-col :span="12">
            <el-input-number
              v-model="projectData.height"
              size="mini"
              controls-position="right"
              :min="0"
              style="width: 100%;"
            />
            <div class="attr-item-edit-input-des">高度</div>
          </el-col>
        </el-row>
      </div>

      <div class="attr-item-edit-wrapper">
        <p class="attr-item-title">缩略图：</p>
        <el-row :gutter="20" style="width: 100%;">
          <el-col :span="24" class="dark">
            <el-button class="img-link" @click="screenshots()">截取封面</el-button>
            <img :src="projectData.coverImage">
          </el-col>
        </el-row>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import imageSelect from '../../../../components/image-select'
import eleBgConfig from '../../custom-component/el-bg-config.js'

export default {
  components: {
    imageSelect
    // JsonEditor
  },
  data() {
    return {
      img: '',
      mapRadio: '',
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
  mounted() {
    // debugger
    // console.log('coverImage', this.projectData.coverImage)
  },
  methods: {
    async screenshots() {
      await this.$emit('screenshots')
    },
    setsScreenshotsImg(url) {
      this.img = url
    }
  }
}
</script>

<style lang="scss" scoped>
  .dark {
    text-align: left;

    img {
      width: 100%;
      height: 150px;
      margin-top: 20px;
    }

    .img-link {
      display: inline-block;
      cursor: pointer;
      background: #2d2d2d;
      color: #c0c4cc;
      text-align: center;
      box-sizing: border-box;
      outline: none;
      border-color: #2d2d2d;
      margin: 0;
      font-size: 12px;
      /*padding: 5px;*/
      border-radius: 4px;

      &:hover {
        border-color: #4072EE;
        color: #4072EE;
        background: #252526;
      }
    }
  }

  .components-attr-edit {
    height: 100%;
    padding-top: 10px !important;
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

    .attr-item-edit-map {

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
