<template>
  <div class="bas-com-padding">
    <div class="attr-item-title">图片列表：</div>
    <el-row :gutter="20">
      <el-col :span="24">
        <div v-for="(item, index) in tempValue" :key="index" class="attr-edit-wrapper">
          <div style="flex: 1;">
            <imageSelect :url.sync="item.url" @change="change" />
          </div>
          <div class="attr-edit-btn-wrapper">
            <span class="imageSelect-btn" @click="add(index)">
              <i class="el-icon-circle-plus-outline" />
            </span>
            <span v-show="tempValue.length > 1" class="imageSelect-btn error" @click="del(index)">
              <i class="el-icon-remove-outline" />
            </span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import imageSelect from '../../../../../../components/image-select'

export default {
  name: 'AttrQkImageSrcList',
  components: {
    imageSelect
  },
  props: {
    imageSrcList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tempValue: []
    }
  },
  watch: {
    imageSrc() {
      this.initData()
    },
    tempValue() {
      this.change()
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      const list = []
      this.imageSrcList.forEach(item => {
        list.push({ url: item })
      })
      this.tempValue = list
    },
    getResultImageSrcList() {
      const list = []
      for (let i = 0, len = this.tempValue.length; i < len; i++) {
        list.push(this.tempValue[i].url)
      }
      return list
    },
    change() {
      this.$emit('update:imageSrcList', this.getResultImageSrcList())
    },
    add(index) {
      const img = this.tempValue[index]
      this.tempValue.splice(index, 0, { ...img })
    },
    del(index) {
      this.tempValue.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>

  .attr-item-title {
    text-align: left;
    min-width: 60px;
    font-size: 12px;
    line-height: 28px;
    color: #C0C4CC;
  }

  .attr-edit-wrapper {
    display: flex;
    width: 100%;
    position: relative;
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .attr-edit-btn-wrapper {
    .imageSelect-btn {
      margin-left: 8px;
      font-size: 18px;
      cursor: pointer;
      line-height: 50px;

      &:hover {
        color: $primary;
      }

      &.error {
        color: inherit;

        &:hover {
          color: $error;
        }
      }
    }
  }
</style>
