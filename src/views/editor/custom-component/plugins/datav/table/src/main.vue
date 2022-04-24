<template>
  <div class="event-table">
    <el-table
      :data="comData.data"
      stripe
      style="width: 100%;"
      height="100%"
      highlight-current-row
      @current-change="handleCurrentChange"
    >
      <el-table-column
        type="index"
        width="50"
        align="center"
      />
      <el-table-column
        prop="eventName"
        label="事件名称"
        width="130"
        align="center"
      />
      <el-table-column
        prop="eventTime"
        label="接报时间"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          {{ formatDate(scope.row.eventTime) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="eventAddress"
        label="事发地点"
        min-width="130"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        prop="eventDescription"
        label="事件内容"
        min-width="120"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        prop="eventStatus"
        label="处置状态"
        width="85"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.eventStatus > -1 && scope.row.eventStatus < 5 && scope.row.eventStatus%2 === 0"
            type="info"
            effect="plain"
          >{{ scope.row.eventStatus | statusFilter }}
          </el-tag>
          <el-tag
            v-else-if="scope.row.eventStatus > -1 && scope.row.eventStatus < 5 && scope.row.eventStatus !== 3 && scope.row.eventStatus%2 === 1"
            type="info"
            effect="light"
          >{{ scope.row.eventStatus | statusFilter }}
          </el-tag>
          <el-tag v-else-if="scope.row.eventStatus === 3" type="info" effect="dark">
            {{ scope.row.eventStatus | statusFilter }}
          </el-tag>
          <el-tag
            v-else-if="scope.row.eventStatus < 7 && scope.row.eventStatus%2 === 0"
            effect="plain"
            style="border-color: #B558F6; color: #B558F6;"
          >{{ scope.row.eventStatus | statusFilter }}
          </el-tag>
          <el-tag
            v-else-if="scope.row.eventStatus < 7 && scope.row.eventStatus%2 === 1"
            effect="dark"
            style="background-color: #B558F6; border-color: #B558F6;"
          >{{
            scope.row.eventStatus | statusFilter
          }}
          </el-tag>
          <el-tag
            v-else-if="scope.row.eventStatus < 9 && scope.row.eventStatus%2 === 0"
            type="primary"
            effect="plain"
          >{{ scope.row.eventStatus | statusFilter }}
          </el-tag>
          <el-tag
            v-else-if="scope.row.eventStatus < 9 && scope.row.eventStatus%2 === 1"
            type="primary"
            effect="dark"
          >{{ scope.row.eventStatus | statusFilter }}
          </el-tag>
          <el-tag
            v-else-if="scope.row.eventStatus < 11 && scope.row.eventStatus%2 === 0"
            type="danger"
            effect="plain"
          >{{ scope.row.eventStatus | statusFilter }}
          </el-tag>
          <el-tag
            v-else-if="scope.row.eventStatus < 11 && scope.row.eventStatus%2 === 1"
            type="danger"
            effect="dark"
          >{{ scope.row.eventStatus | statusFilter }}
          </el-tag>
          <el-tag
            v-else-if="scope.row.eventStatus < 13 && scope.row.eventStatus%2 === 0"
            type="warning"
            effect="plain"
          >{{ scope.row.eventStatus | statusFilter }}
          </el-tag>
          <el-tag
            v-else-if="scope.row.eventStatus < 13 && scope.row.eventStatus%2 === 1"
            type="warning"
            effect="dark"
          >{{ scope.row.eventStatus | statusFilter }}
          </el-tag>
          <el-tag
            v-else-if="scope.row.eventStatus < 15 && scope.row.eventStatus%2 === 0"
            type="success"
            effect="plain"
          >{{ scope.row.eventStatus | statusFilter }}
          </el-tag>
          <el-tag
            v-else-if="scope.row.eventStatus < 15 && scope.row.eventStatus%2 === 1"
            type="success"
            effect="dark"
          >{{ scope.row.eventStatus | statusFilter }}
          </el-tag>
          <el-tag v-else type="info" effect="plain">{{ scope.row.eventStatus | statusFilter }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Unit from '../../../unit'

const statusOption = [
  { key: '0', value: '草稿' },
  { key: '1', value: '待初查' },
  { key: '2', value: '初查中' },
  { key: '3', value: '待复查' },
  { key: '4', value: '复查中' },
  { key: '-1', value: '已关闭' },
  { key: '5', value: '待受理' },
  { key: '6', value: '受理中' },
  { key: '7', value: '待派遣' },
  { key: '8', value: '派遣中' },
  { key: '9', value: '处置中' },
  { key: '10', value: '处置完毕' },
  { key: '11', value: '待核查' },
  { key: '12', value: '核查中' },
  { key: '13', value: '待评价' },
  { key: '14', value: '评价中' },
  { key: '15', value: '已完成' }
]

const statusKeyValue = statusOption.reduce((acc, cur) => {
  acc[cur.key] = cur.value
  return acc
}, {})

export default {
  name: 'EventTable',
  filters: {
    statusFilter(eventStatus) {
      return statusKeyValue[eventStatus]
    }
  },
  props: {
    apiObj: {
      type: Object,
      default: () => {
        return {
          url: 'http://10.168.1.52:9000/661656CB-02F2-573C-FF44-7B1F73487400/DCA69558-B3E7-4D8A-9DF3-F0A06D40A89A/services/MyService/RunTimeEvent?status=5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14',
          reqType: 'get'
        }
      }
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
      isRel: false,
      statusOption
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        const res = await selectData(this.apiObj)
        this.comData.data = res.response
        console.log('tableData', this.comData.data)
      } catch (e) {
        console.log('IocUsTimeline', e)
        this.comData = {
          data: []
        }
      }
      this.isRef = true
    },
    formatDate(d) {
      const dd = new Date(d)
      return dd.getFullYear() + '/' + (dd.getMonth() + 1) + '/' + dd.getDate() + ' ' + dd.getHours() + ':' + dd.getMinutes() + ':' + dd.getSeconds()
    },
    handleCurrentChange(val) {
      console.log('val', val)
      Unit.$emit('table', val)
    }
  }
}
</script>

<style scoped>
.event-table {
  width: 100%;
  height: 100%;
  color: #fff;
  overflow: hidden;
}
</style>
