<!--test.vue-->
<template>
  <div class="ioc-ew-form">
    <svg-icon icon-class="Ioc_Ew_Background" class-name="ioc-ew-icon" />
    <div v-for="(item,index) in comData.list" :key="index" class="ioc-ew-list">
      <div v-for="(child,inx) in item.child" :key="inx" class="ioc-ew-flex">
        <h6>{{ child.key }}</h6>
        <span>{{ child.value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IocEwForm', // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
  props: {
    comData: {
      type: Object,
      default: () => {
        return {
          list: [{
            child: [{
              key: '所属领域',
              value: '公共安全'
            }, {
              key: '预警名称',
              value: '消防安全隐患预警'
            }, {
              key: '预警时间',
              value: '2010/3/10 15:05:00'
            }, {
              key: '地点',
              value: '嘉定区菊园🈟区'
            }, {
              key: '预警内容',
              value: '嘉宝小区1号楼存在消防安全隐患'
            }]
          }]
        }
      }
    }
  },
  data() {
    return {
      defaultStyle: {
        height: 40
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .ioc-ew-form {
    width: 274px;
    height: 238px;
    padding: 15px 25px;
    overflow: hidden;

    .anim {
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      color: #bcf4fa;
      align-items: center;
      text-align: left;
      transition: all 0.5s;
      margin-bottom: 25px;
    }

    .ioc-ew-list {
      width: 234px;
      height: 238px;
      overflow: hidden;
    }

    .ioc-ew-icon {
      height: 100%;
      width: 100%;
      position: absolute;
      margin-left: -54%;
      margin-top: -12%;
    }

    .ioc-ew-flex {
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      color: #bcf4fa;
      align-items: center;
      text-align: left;
      transition: all 0.5s;

      h6 {
        font-size: 14px;
        line-height: 34px;
      }

      span {
        font-size: 14px;
        line-height: 18px;
        font-weight: normal;
        width: 140px;
      }
    }
  }

</style>
