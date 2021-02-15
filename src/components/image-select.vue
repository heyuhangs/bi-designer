/**
切换图片，提供图片选择，图片上传等功能
*/
<template>
  <div class="image-select-wrapper">
    <div class="image-select-l">
      <div class="component-image-select" @click="handleClick">
        <img v-if="url" :src="url" alt="">
        <div v-else class="image-preview-null">
          <p style="margin: 8px 0 5px">
            <i class="el-icon-plus" />
          </p>
          <p>选择</p>
        </div>
      </div>
    </div>
    <div class="image-select-r">
      <el-input
        v-model="tempValue"
        :rows="2"
        type="textarea"
        placeholder="请输入图片地址"
      />
    </div>
  </div>
</template>
<script>
import $bus from '../views/editor/eventBus'
export default {
  props: {
    url: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      // 唯一得id用于选择图片后事件通知
      selectId: +new Date(),
      tempValue: ''
    }
  },
  watch: {
    url(val) {
      this.tempValue = val
    },
    tempValue(val) {
      this.changeIamge(this.selectId, val)
    }
  },
  created() {
    $bus.$on('select-image', this.changeIamge)
    this.tempValue = this.url
  },
  methods: {
    changeIamge(id, url) {
      if (id !== this.selectId) {
        return
      }
      this.$emit('update:url', url)
      this.$emit('change', url)
    },
    /**
     * 点击弹出选择图片弹窗
     */
    handleClick() {
      $bus.$emit('show-select-image', this.selectId)
    }
  }
}
</script>

<style lang="scss" scoped>
  .component-image-select {
    width: 48px;
    height: 48px;
    border: 1px dashed #33393F;
    border-radius: 3px;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.28s;
    position: relative;
    background-color: #1F2327;
    justify-content: center;
    align-items: center;
    display: flex;

    &:hover {
      color: $primary;
      border-color: $primary;
    }

    img {
      display: inline-block;
      max-width: 100%;
      max-height: 100%;
    }

    p {
      font-size: 8px;
      /*padding-bottom: 10px;*/
    }
  }

  .image-preview-null {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    /*padding-top: 25px;*/
    background: rgba(0, 0, 0, 0.2);
    vertical-align: middle;
  }

  .image-select-wrapper {
    display: flex;
    .image-select-l {
      width: 50px;
    }

    .image-select-r {
      flex: 1;
      margin-left: 10px;
    }
  }
</style>
