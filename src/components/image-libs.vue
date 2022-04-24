<template>
  <el-dialog
    class="components-image-libs-wrapper"
    title="我的图片"
    :visible.sync="dialogVisible"
    width="600px"
  >
    <div class="components-image-libs">
      <div class="image-lib-side-bar" />
      <div class="image-lib-inner">
        <div class="image-lib-btn">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            :before-upload="beforeUpload"
            accept="jpg,png,gif"
            :show-file-list="false"
          >
            <el-button type="primary">点击上传</el-button>
            <span slot="tip" class="el-upload__tip marginL20">只能上传jpg/png/gif文件，且不超过2M</span>
          </el-upload>
        </div>
        <ul v-if="imageList.length" class="image-list-wrapper">
          <li v-for="(item, index) in imageList" :key="index" class="image-item" @click="handleImageClick(item.url)">
            <img :src="item.url" alt="">
          </li>
        </ul>
        <div v-else class="padding60 text-center gray">暂无数据</div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import $bus from '../views/editor/eventBus'

export default {
  name: 'ImageLibs',
  data() {
    return {
      dialogVisible: false,
      uploading: false,
      hasLoadData: false,
      imageList: [],
      selectId: ''
    }
  },
  watch: {
    // dialogVisible(val) {
    //   if (val && !this.uploading) {
    //     this.getMyImages()
    //   }
    // }
  },
  async created() {
    $bus.$on('show-select-image', selectId => {
      this.dialogVisible = true
      this.selectId = selectId
    })
    // const res = await this.getData()
    // console.log('image', res)
  },
  methods: {
    beforeUpload(file) {
      if (file.size > 1 * 1024 * 1024) {
        this.$message.error('psd文件不能超过1M！')
        return
      }
      const temp1 = file.name.split('.')
      const temp = temp1[temp1.length - 1]
      if (!['jpg', 'png', 'gif'].includes(temp)) {
        this.$message.error('请上传jpg/png/gif文件')
        return false
      }
      this.uploadPsd(file)
      return false
    },
    uploadPsd(file) {
      // const self = this
      const params = new FormData()
      params.append('file', file)
      this.uploading = true
    },
    getMyImages() {
      this.hasLoadData = true
      this.$axios.get('/person/images').then(res => {
        this.imageList = res.body || []
      })
    },
    /**
     * 点击图片
     * @param url
     */
    handleImageClick(url) {
      $bus.$emit('select-image', this.selectId, url)
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .image-list-wrapper {
    display: flex;
    height: 400px;
    padding-top: 20px;

    li {
      width: 120px;
      height: 120px;
      background: #eee 50%/contain no-repeat;
      cursor: pointer;
      justify-content: center;
      align-items: center;
      display: flex;
      transition: all 0.28s;

      &:hover {
        box-shadow: 0 0 16px 0 rgba(0, 0, 0, .16);
        transform: translate3d(0, -2px, 0);
      }

      img {
        display: inline-block;
        max-width: 100%;
        max-height: 100%;
      }

    }
  }
</style>
<style lang="scss">
  .components-image-libs-wrapper {
    .el-dialog__body {
      padding: 0 20px 20px;
    }
  }
</style>
