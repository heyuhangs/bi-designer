<template>
  <previewWrapper :page-id="pageId" @closePreview="closePreview" />
</template>

<script>
import previewWrapper from '../../../components/preview-wrapper'

export default {
  components: {
    previewWrapper
  },
  props: {
    pageId: {
      type: String,
      default: function() {
        return ''
      }
    },
    pageData: {
      type: Object,
      require: true,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  mounted() {
  },
  methods: {
    /**
     * 关闭弹窗事件
     */
    closePreview() {
      this.$emit('closePreview', false)
    },
    publishFn() {
      this.$emit('publishFn')
    },
    saveFn() {
      this.$emit('saveFn')
    }
  }
}
</script>
<style lang="scss" scoped>
  .preview-info-wrapper {
    padding: 30px 30px 60px;
  }

  .page-info {
    display: flex;

    .page-cover {
      width: 120px;
      height: 120px;
      overflow: hidden;
    }

    .page-title-des {
      padding-left: 20px;
      flex: 1;
    }
  }

  .info-form-wrapper {
    display: flex;
    padding-bottom: 16px;

    .info-form-l {
      line-height: 42px;

      &.com-width {
        width: 120px;
      }
    }

    .info-form-r {
      flex: 1;
      padding-left: 10px;
    }
  }

  .foot-btn-wrapper {
    position: absolute;
    left: 0;
    bottom: 8px;
    height: 60px;
    padding: 8px 30px;
  }

  .share-wx-config-wrapper {
    margin-top: 14px;
    padding: 12px;
    background-color: #f0f3f4;
  }
</style>
