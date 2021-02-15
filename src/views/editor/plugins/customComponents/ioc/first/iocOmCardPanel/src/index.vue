<!--test.vue-->
<template>
  <div class="ioc-om-panel">
    <el-row :gutter="40" class="panel-group">
      <el-col :span="24" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon :icon-class="comData.icon" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">{{ comData.name }}</div>
            <div class="num-panel">
              <big class="card-panel-num">{{ comData.value }}</big>
              <span>{{ comData.unit }}</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'IocOmCardPanel',
  components: {},
  props: {
    comData: {
      type: Object,
      default: () => {
        return {
          icon: 'Ioc_Om_All',
          name: '在线数',
          value: '100',
          unit: '个'
        }
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  .ioc-om-panel {
    .panel-group {
      margin-bottom: 14px;

      .card-panel {
        cursor: pointer;
        font-size: 12px;
        position: relative;
        overflow: hidden;
        color: #bcf4fa;
        border: none;
        background-color: transparent;

        &:hover {
          .card-panel-icon-wrapper {
            color: #fff;
          }

        }

        .card-panel-icon-wrapper {
          float: left;
          padding-right: 14px;
          transition: all 0.38s ease-out;
          border-radius: 6px;
        }

        .card-panel-icon {
          float: left;
          font-size: 44px;
        }

        .card-panel-description {
          float: left;
          font-weight: bold;
          height: 44px;
          display: flex;
          flex-flow: column;
          justify-content: space-between;
          text-align: left;

          .card-panel-text {
            line-height: 13px;
            font-size: 13px;
          }

          .num-panel {
            display: flex;
            flex-flow: row;
            justify-content: space-between;
            align-items: flex-end;

            .card-panel-num {
              font-size: 24px;
              line-height: 24px;
              margin-right: 10px;
            }

            span {
              font-size: 12px;
              color: #5a5b5b;
            }

          }
        }
      }
    }
  }

  /*@media (max-width:550px) {*/
  /*  .card-panel-description {*/
  /*    display: none;*/
  /*  }*/
  /*  .card-panel-icon-wrapper {*/
  /*    float: none !important;*/
  /*    width: 100%;*/
  /*    height: 100%;*/
  /*    margin: 0 !important;*/
  /*    .svg-icon {*/
  /*      display: block;*/
  /*      margin: 14px auto !important;*/
  /*      float: none !important;*/
  /*    }*/
  /*  }*/
  /*}*/
</style>

