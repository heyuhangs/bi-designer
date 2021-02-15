<template>
  <div class="bas-com-padding">
    <div class="attr-item-title">图片列表：</div>
    <el-row :gutter="20">
      <el-col :span="24">
        <imageSelect :url.sync="tempValue" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import imageSelect from '../../../../../../components/image-select'

export default {
  name: 'AttrQkImageSrc',
  components: {
    imageSelect
  },
  props: {
    imageSrc: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data() {
    return {
      tempValue: ''
    }
  },
  watch: {
    imageSrc(val) {
      this.tempValue = val
    },
    tempValue() {
      this.$emit('update:imageSrc', this.tempValue)
    }
  },
  mounted() {
    this.tempValue = this.imageSrc
  }
}
</script>

<style lang="scss" scoped>
  .arrt-eidt-wrapper {
    display: flex;

    .arrt-eidt-l {
      width: 108px;
    }

    .arrt-eidt-r {
      flex: 1;
    }
  }
  .attr-item-title {
    text-align: left;
    min-width: 60px;
    font-size: 12px;
    line-height: 28px;
    color: #C0C4CC;
  }
</style>
