<template>
  <div :ref="ref" class="dv-scroll-board">
    <div v-if="header.length && mergedConfig" class="header" :style="`background-color: ${mergedConfig.headerBGC};`">
      <div
        v-for="(headerItem, i) in header"
        :key="headerItem + i"
        class="header-item"
        :style="`
          height: ${mergedConfig.headerHeight}px;
          line-height: ${mergedConfig.headerHeight}px;
          width: ${widths[i]}%;
          color: ${mergedConfig.color};
        `"
        :align="aligns"
        @click="addEvent"
        v-html="headerItem"
      />
    </div>

    <div
      v-if="mergedConfig"
      class="rows"
      :style="`height: ${height - (header.length ? mergedConfig.headerHeight : 0)}px;`"
    >
      <div
        v-for="(row, ri) in rows"
        :key="row.toString() + row.scroll"
        class="row-item"
        :style="`
          height: ${heights}px;
          line-height: ${heights}px;
          background-color: ${mergedConfig[row.rowIndex % 2 === 0 ? 'evenRowBGC' : 'oddRowBGC']};
        `"
        @click="showOnmap(row)"
      >
        <!--        width: ${widths[ri]}%;-->
        <div
          v-for="(ceil, ci) in row.ceils"
          :key="ceil + ri + ci"
          class="ceil"
          :style="`width: ${widths[ci]}%;`"
          :align="aligns"
          @click="emitEvent(ri, ci, row, ceil)"
          v-html="ceil"
        />

      </div>
    </div>
  </div>
</template>

<script>
import autoResize from '../../mixin/autoResize'

import { deepMerge } from '@jiaminghi/charts/lib/util/index'

import { deepClone } from '@jiaminghi/c-render/lib/plugin/util'

import Unit from '../../../unit'
// import request from '@/utils/http'

export default {
  name: 'DvScrollBoard',
  mixins: [autoResize],
  props: {
    config: {
      type: Object,
      default: () => ({})
    },
    comData: {
      type: Object,
      default: () => {
        return {
          data: [
            ['2019-07-01 19:25:00', '路面危害-松散', '5', 'xxxxxxx'],
            ['2019-07-02 17:25:00', '路面危害-路面油污清理', '13', 'xxxxxxx'],
            ['2019-07-03 16:25:00', '交安设施-交通标志牌结构', '6', 'xxxxxxx'],
            ['2019-07-04 15:25:00', '路基危害-防尘网', '2', 'xxxxxxx'],
            ['2019-07-05 14:25:00', '交安设施-交通标志牌结构', '1', 'xxxxxxx'],
            ['2019-07-06 13:25:00', '路面危害-松散', '3', 'xxxxxxx'],
            ['2019-07-07 12:25:00', '路基危害-防尘网', '4', 'xxxxxxx'],
            ['2019-07-08 11:25:00', '路面危害-路面油污清理', '2', 'xxxxxxx'],
            ['2019-07-09 10:25:00', '交安设施-交通标志牌结构', '5', 'xxxxxxx'],
            ['2019-07-10 09:25:00', '路基危害-防尘网', '3', 'xxxxxxx']
          ]
        }
      }
    }
  },
  data() {
    return {
      ref: 'scroll-board',
      params: {
        dbIp: '10.168.1.52',
        dbName: 'date_test',
        dbPasswd: '123456',
        dbPort: '33063',
        dbUser: 'root',
        tableName: 'event'
      },

      defaultConfig: {
        /**
         * @description Board header
         * @type {Array<String>}
         * @default header = []
         * @example header = ['column1', 'column2', 'column3']
         */
        header: ['时间', '病害信息', '数量', '标段'],
        /**
         * @description Board data
         * @type {Array<Array>}
         * @default data = []
         */
        data: this.comData.data,
        /**
         * @description Row num
         * @type {Number}
         * @default rowNum = 5
         */
        rowNum: 9,
        /**
         * @description Header background color
         * @type {String}
         * @default headerBGC = '#00BAFF'
         */
        headerBGC: 'rgb(5,24,40)',
        /**
         * @description Odd row background color
         * @type {String}
         * @default oddRowBGC = '#003B51'
         */
        oddRowBGC: 'rgba(0, 44, 81, 0.8)',
        /**
         * @description Even row background color
         * @type {String}
         * @default evenRowBGC = '#003B51'
         */
        evenRowBGC: 'rgba(10, 29, 50, 0.8)',
        /**
         * @description Scroll wait time
         * @type {Number}
         * @default waitTime = 2000
         */
        waitTime: 2000,
        /**
         * @description Header height
         * @type {Number}
         * @default headerHeight = 35
         */
        headerHeight: 35,
        /**
         * @description Header color
         * @type {Number}
         * @default color = rgb(9,151,255)
         */
        color: 'rgb(9,151,255)',
        /**
         * @description Column width
         * @type {Array<Number>}
         * @default columnWidth = []
         */
        columnWidth: [],
        /**
         * @description Column align
         * @type {Array<String>}
         * @default align = []
         * @example align = ['left', 'center', 'right']
         */
        align: ['center'],
        // /**
        //  * @description Show index
        //  * @type {Boolean}
        //  * @default index = false
        //  */
        // index: true,
        /**
         * @description index Header
         * @type {String}
         * @default indexHeader = '#'
         */
        // indexHeader: '#',
        /**
         * @description Carousel type
         * @type {String}
         * @default carousel = 'single'
         * @example carousel = 'single' | 'page'
         */
        carousel: 'single'
      },

      mergedConfig: null,

      header: [],

      rowsData: [],

      rows: [],

      widths: [],

      heights: 25,

      avgHeight: 0,

      aligns: 'center',

      animationIndex: 0,

      animationHandler: '',

      updater: 0
    }
  },
  // watch: {
  //   config() {
  //     const { stopAnimation, calcData } = this
  //
  //     stopAnimation()
  //
  //     calcData()
  //   },
  //   'comData.data': {
  //     handler(newVal, oldVal) {
  //       const { stopAnimation, calcData } = this
  //       // console.log(this.comData.data)
  //       this.defaultConfig.data = this.comData.data
  //       stopAnimation()
  //       calcData()
  //     },
  //     deep: true
  //   }
  // },
  // destroyed() {
  //   const { stopAnimation } = this
  //
  //   stopAnimation()
  // },
  methods: {
    afterAutoResizeMixinInit() {
      console.log('1')
      const { calcData } = this
      calcData()
    },
    onResize() {
      console.log('2')
      const { mergedConfig, calcWidths, calcHeights } = this

      if (!mergedConfig) return

      calcWidths()

      calcHeights()
    },
    calcData() {
      console.log('3')
      const { mergeConfig, calcHeaderData, calcRowsData } = this

      mergeConfig()

      calcHeaderData()

      calcRowsData()

      const { calcWidths, calcHeights, calcAligns } = this

      calcWidths()

      calcHeights()

      calcAligns()

      const { animation } = this

      animation(true)
    },
    mergeConfig() {
      console.log('4')

      const { config, defaultConfig } = this

      this.mergedConfig = deepMerge(deepClone(defaultConfig, true), config || {})
    },
    calcHeaderData() {
      console.log('5')
      let { header } = this.mergedConfig
      const { index, indexHeader } = this.mergedConfig
      if (!header.length) {
        this.header = []

        return
      }

      header = [...header]

      if (index) header.unshift(indexHeader)

      this.header = header
    },
    calcRowsData() {
      console.log('5')

      let { data } = this.mergedConfig
      const { index, headerBGC, rowNum } = this.mergedConfig
      if (index) {
        data = data.map((row, i) => {
          row = [...row]

          const indexTag = `<span class="index" style="background-color: ${headerBGC};">${i + 1}</span>`

          row.unshift(indexTag)

          return row
        })
      }

      data = data.map((ceils, i) => ({ ceils, rowIndex: i }))

      const rowLength = data.length

      if (rowLength > rowNum && rowLength < 2 * rowNum) {
        data = [...data, ...data]
      }

      data = data.map((d, i) => ({ ...d, scroll: i }))

      this.rowsData = data
      this.rows = data
    },
    calcWidths() {
      console.log('6')

      const { width, mergedConfig, rowsData } = this

      const { columnWidth, header } = mergedConfig

      const usedWidth = columnWidth.reduce((all, w) => all + w, 0)

      let columnNum = 0
      if (rowsData[0]) {
        columnNum = rowsData[0].ceils.length
      } else if (header.length) {
        columnNum = header.length
      }

      const avgWidth = (width - usedWidth) / (columnNum - columnWidth.length)

      const widths = new Array(columnNum).fill(avgWidth)

      this.widths = deepMerge(widths, columnWidth)
    },
    calcHeights(onresize = false) {
      console.log('7')

      const { height, mergedConfig, header } = this

      const { headerHeight, rowNum, data } = mergedConfig
      let allHeight = height

      if (header.length) allHeight -= headerHeight

      const avgHeight = allHeight / rowNum

      this.avgHeight = avgHeight

      if (!onresize) this.heights = new Array(data.length).fill(avgHeight)
    },
    calcAligns() {
      console.log('8')

      const { header, mergedConfig } = this

      const columnNum = header.length

      const aligns = new Array(columnNum).fill('left')

      const { align } = mergedConfig

      this.aligns = deepMerge(aligns, align)
    },
    async animation(start = false) {
      console.log('9')
      let { animationIndex } = this
      const { avgHeight, mergedConfig, rowsData, animation, updater } = this
      const { waitTime, carousel, rowNum } = mergedConfig

      const rowLength = rowsData.length

      if (rowNum >= rowLength) return

      if (start) {
        await new Promise(resolve => setTimeout(resolve, waitTime))
        if (updater !== this.updater) return
      }

      const animationNum = carousel === 'single' ? 1 : rowNum

      const rows = rowsData.slice(animationIndex)
      rows.push(...rowsData.slice(0, animationIndex))

      this.rows = rows
      this.heights = new Array(rowLength).fill(avgHeight)

      await new Promise(resolve => setTimeout(resolve, 300))
      if (updater !== this.updater) return

      this.heights.splice(0, animationNum, ...new Array(animationNum).fill(0))

      animationIndex += animationNum

      const back = animationIndex - rowLength
      if (back >= 0) animationIndex = back

      this.animationIndex = animationIndex
      this.animationHandler = setTimeout(animation, waitTime - 300)
    },
    stopAnimation() {
      console.log('10')

      const { animationHandler, updater } = this

      this.updater = (updater + 1) % 999999

      if (!animationHandler) return

      clearTimeout(animationHandler)
    },
    emitEvent(ri, ci, row, ceil) {
      console.log('11')

      const { ceils, rowIndex } = row

      this.$emit('click', {
        row: ceils,
        ceil,
        rowIndex,
        columnIndex: ci
      })
    },
    showOnmap(row) {
      console.log(row)
      // row.icon = require('../../../../../../icon/' + row.icon)
      // Unit.$emit('event', row)
    },
    addEvent() {
      request({
        url: '/data-center/database/selectall',
        method: 'post',
        data: this.params
      }).then(res => {
        const list = res.datas
        Unit.$emit('addEvent', list)
      })
    }
  }
}
</script>

<style lang="scss">
  .dv-scroll-board {
    position: relative;
    width: 100%;
    height: 100%;
    color: #fff;

    .header {
      display: flex;
      flex-direction: row;
      font-size: 15px;

      .header-item {
        padding: 0 10px;
        box-sizing: border-box;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: all 0.3s;
      }
    }

    .rows {
      overflow: hidden;

      .row-item {
        display: flex;
        font-size: 14px;
        transition: all 0.3s;
      }

      .ceil {
        padding: 0 10px;
        box-sizing: border-box;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .index {
        border-radius: 3px;
        padding: 0px 3px;
      }
    }
  }
</style>
