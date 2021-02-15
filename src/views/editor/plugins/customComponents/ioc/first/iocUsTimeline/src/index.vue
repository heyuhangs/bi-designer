<!--test.vue-->
<template>
  <div class="ioc-us-time">
    <div v-if="isRef" class="block">
      <el-timeline>
        <el-timeline-item v-for="(item,index) in comData.data" :key="index" :timestamp="item.title" placement="top">
          <span class="timestamp-num">{{ item.value }}</span>
          <el-card shadow="none">
            <el-row :gutter="10">
              <el-col v-for="(dataItem,dataInx) in item.list" :key="dataInx" :span="8">
                <span class="no">{{ ++dataInx }}</span>
                <span class="text">{{ dataItem.title }}</span>
                <span class="num">{{ dataItem.value }}</span>
              </el-col>
            </el-row>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
// import $axios from 'axios'
// import { selectData } from '@/utils/lseUtils'

export default {
  name: 'IocUsTimeline',
  comments: {
    data() {
      return this.comData
    }
  }, // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
  props: {
    apiObj: {
      type: Object,
      default: () => {
        return {
          url: 'http://10.168.1.52:9900/data-center/database/selectB',
          reqType: 'post'
        }
      }
    },
    dataType: {
      type: String,
      default: '3'
    },
    comData: {
      type: Object,
      default: () => {
        return {
          data: []
        }
      }
    }
  },
  data() {
    return {
      defaultStyle: {
        height: 40
      },
      isRef: false
    }
  },
  watch: {
    dataType(val) {
      // if (val == '2'){
      //   this.getData()
      // }
      // debugger
      if (val === '3') {
        this.getData()
      }
    }
  },
  mounted() {
    // debugger
    if (this.dataType === '3') {
      this.getData()
    }
  },
  methods: {
    async getData() {
      try {
        const res = await selectData(this.apiObj)
        this.comData.data = res.datas.data
      } catch (e) {
        console.log('IocUsTimeline', e)
        this.comData = {
          data: []
        }
      }
      this.isRef = true
    }
  }
}
</script>

<style lang="scss">
  .ioc-us-time {
    padding-left: 1px;
    min-width: 370px;

    .el-timeline {
      position: relative;

      .timestamp-num {
        position: absolute;
        right: 0;
        top: 0;
        color: #0095ff;
        font-size: 14px;
      }
    }

    .el-timeline-item__timestamp.is-top {
      text-align: left;
      color: #ccf2ff;
      font-size: 14px;
      margin: 0;
      padding-bottom: 8px;
      border-bottom: 1px solid #707378;
    }

    .el-card {
      background-color: transparent;
      border: none;
      text-align: left;
      max-height: 53px;
      overflow-y: auto;

      .el-card__body {
        padding: 5px 0 10px;
      }

      .no {
        width: 12px;
        height: 12px;
        background-color: #272e3b;
        color: #aaaaaa;
        font-size: 10px;
        line-height: 12px;
        display: inline-block;
        text-align: center;
        margin-bottom: 5px;
      }

      .text {
        font-size: 10px;
        line-height: 14px;
        color: #b1b1b1;
        display: inline-block;
        max-width: 72px;
        vertical-align: middle;
        margin-bottom: 1px;
      }

      .num {
        color: #e6bd45;
        font-size: 12px;
        line-height: 14px;
        display: inline-block;
        margin-bottom: 5px;
      }

      /*.ioc-us-flex {*/
      /*  display: flex;*/
      /*  flex-flow: row wrap;*/
      /*  justify-content: space-between;*/
      /*  .no {*/
      /*    width: 12px;*/
      /*    height: 12px;*/
      /*    background-color: #272e3b;*/
      /*    color: #aaaaaa;*/
      /*    font-size: 10px;*/
      /*    line-height: 12px;*/
      /*    display: inline-block;*/
      /*    text-align: center;*/
      /*  }*/
      /*  .text {*/
      /*    font-size: 10px;*/
      /*    line-height: 10px;*/
      /*    color: #b1b1b1;*/
      /*  }*/
      /*  .num {*/
      /*    color: #e6bd45;*/
      /*    font-size: 12px;*/
      /*    line-height: 12px;*/
      /*  }*/
      /*}*/
    }

    .el-timeline-item {
      padding-bottom: 0;
    }

    .el-timeline-item__node {
      background-color: #030710;
      border: 1px solid #ccf2ff;
    }
  }
</style>
