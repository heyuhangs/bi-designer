<template>
  <el-main class="com-title">
    <p class="page-title fontBold">echart标题</p>
    <el-collapse>
      <el-collapse-item title="内容" name="0">
        <div class="attr-item-edit-wrapper">
          <p class="attr-item-title">显示：</p>
          <el-row :gutter="20" style="width: 100%;">
            <el-col :span="13">
              <el-input
                v-model="titleConfig.text"
                size="mini"
                :disabled="!titleConfig.show"
                controls-position="right"
                style="width: 100%"
              />
              <div class="attr-item-edit-input-des">标题名</div>
            </el-col>
            <el-col :span="10">
              <div style="height: 28px;">
                <el-switch
                  v-model="titleConfig.show"
                  active-text="开"
                  inactive-text="关"
                  active-color="#4072EE"
                  inactive-color="#292E33"
                  size="mini"
                />
              </div>
              <div class="attr-item-edit-input-des">显示</div>
            </el-col>
          </el-row>
        </div>
      </el-collapse-item>
      <el-collapse-item title="位置" name="1">
        <div class="attr-item-edit-wrapper">
          <p class="attr-item-title">水平对齐：</p>
          <el-row :gutter="20" style="width: 100%;">
            <el-col :span="18">
              <el-radio-group v-model="titleConfig.left" :disabled="!titleConfig.show">
                <el-radio :label="'left'">左</el-radio>
                <el-radio :label="'center'">中</el-radio>
                <el-radio :label="'right'">右</el-radio>
              </el-radio-group>
            </el-col>
          </el-row>
        </div>
        <div class="attr-item-edit-wrapper">
          <p class="attr-item-title">垂直对齐：</p>
          <el-row :gutter="20" style="width: 100%;">
            <el-col :span="18">
              <el-radio-group v-model="titleConfig.top" :disabled="!titleConfig.show">
                <el-radio :label="'top'">上</el-radio>
                <el-radio :label="'middle'">中</el-radio>
                <el-radio :label="'bottom'">下</el-radio>
              </el-radio-group>
            </el-col>
          </el-row>
        </div>
      </el-collapse-item>
      <el-collapse-item title="标题文本样式" name="2">
        <div class="attr-item-edit-wrapper">
          <p class="attr-item-title">字体颜色：</p>
          <el-row :gutter="20" style="width: 100%;">
            <el-col :span="4">
              <el-color-picker v-model="titleConfig.textStyle.color" :disabled="!titleConfig.show" size="mini" />
            </el-col>
          </el-row>
        </div>
        <div class="attr-item-edit-wrapper">
          <p class="attr-item-title">字体大小：</p>
          <el-row :gutter="20" style="width: 100%;">
            <el-col :span="24">
              <el-input-number
                v-model="titleConfig.textStyle.fontSize"
                :disabled="!titleConfig.show"
                size="mini"
                controls-position="right"
                style="width: 100%;"
              />
            </el-col>
          </el-row>
        </div>
        <div class="attr-item-edit-wrapper">
          <p class="attr-item-title">字体粗细：</p>
          <el-row :gutter="20" style="width: 100%;">
            <el-col :span="21">
              <el-radio-group v-model="titleConfig.textStyle.fontWeight" :disabled="!titleConfig.show">
                <el-radio :label="'normal'">普通</el-radio>
                <el-radio :label="'bold'">加粗</el-radio>
                <el-radio :label="'lighter'">更细</el-radio>
              </el-radio-group>
            </el-col>
          </el-row>
        </div>
      </el-collapse-item>
    </el-collapse>
  </el-main>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      titleConfig: {}
    }
  },
  computed: {
    ...mapState({
      activeElementUUID: state => state.editor.activeElementUUID
    }),
    ...mapGetters([
      'activeElement'
    ])
  },
  watch: {
    titleConfig: {
      handler(newVal, oldVal) {
        this.activeElement.propsValue.configObj.titleConfig = this.titleConfig
      },
      deep: true
    }
  },
  created() {
    this.titleConfig = this.activeElement.propsValue.configObj.titleConfig
    console.log('titleConfig', this.titleConfig)
  },
  mounted() {
  },
  methods: {}
}
</script>

<style lang="scss">
  .com-title {
    padding: 0;
    .attr-item-title {
      text-align: left;
      min-width: 60px;
      font-size: 12px;
      line-height: 28px;
    }
    .attr-item-edit-input-des {
      text-align: center;
      line-height: 12px;
      margin-top: 5px;
      font-size: 12px;
      color: #606266;
    }
    .el-switch__label {
      color: #606266;
    }
    .el-switch__label.is-active {
      color: #4072EE;
    }
    .el-switch {
      margin: 3.6px 0;
      .el-switch__core::after {
        background-color: #4B4F55 !important;
      }
    }
    .el-switch.is-checked {
      .el-switch__core::after {
        background-color: #FFFFFF !important;
      }
    }
    .el-radio__inner {
      background-color: #292E33;
      border-color: #33393F;
    }
    .el-radio__input.is-disabled .el-radio__inner {
      background-color: #16191C;
      border-color: #292E33;
    }
  }
</style>
