<!--test.vue-->
<template>
  <div class="ioc-heder">
    <div class="ioc-heder-main" @click="addEventpoint">
      <svg-icon :icon-class="comData.icon" class-name="ioc-heder-main-icon" />
      <h3>{{ comData.title }}（{{ count }}）</h3>
    </div>
  </div>
</template>

<script>
import Unit from '../../../../../unit'
// import request from '@/utils/http'
export default {
  name: 'IocEwHeder', // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
  props: {
    comData: {
      type: Object,
      default: () => {
        return {
          icon: 'Ioc_Ew_Title',
          title: '城市运行分析预警'
        }
      }
    }
  },
  data() {
    return {
      defaultStyle: {
        height: 40
      },
      params: {
        dbIp: '10.168.1.52',
        dbName: 'date_test',
        dbPasswd: '123456',
        dbPort: '33063',
        dbUser: 'root',
        tableName: 'warn_event'
      },
      list: [],
      point: [],
      count: ''
    }
  },
  created() {
    this.showEvents()
  },
  methods: {
    showEvents() {
      request({
        url: '/data-center/database/selectall',
        method: 'post',
        data: this.params
      }).then(res => {
        this.list = res.datas
        this.count = res.datas.length
        console.log('EWList:', this.list)
      })
    },
    addEventpoint() {
      Unit.$emit('warning', this.list)
    }
  }
}
</script>
<style lang="scss">
  .ioc-heder {

    :hover {
      cursor:pointer
    }

    .ioc-heder-main {
      display: flex;
      align-items: center;
      .ioc-heder-main-icon {
        width: 45px;
        height: 45px;
      }

      h3 {
        color: #fff;
        /*font-size: 30px;*/
        padding-left: 15px;
      }

    }
  }

</style>
