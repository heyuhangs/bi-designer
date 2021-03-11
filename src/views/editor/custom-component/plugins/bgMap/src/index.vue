<!--
 * @Descripttion:
 * @version:
 * @Author: sueRimn
 * @Date: 2020-10-16 14:57:04
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-18 14:50:02
-->
<template>
  <div class="a-map">
    <!--    <Lottie :options="defaultOptions" :height="400" :width="400" v-on:animCreated="handleAnimation" />-->
    <!--   这里以 el-amap 组件举例。el-amap 比较特殊，它同时还支持一个 amap-manager 属性，通过这个属性，可以在任何地方拿到高德原生 AMap.Map 实例。-->
    <!--    <Lottie-->
    <!--      :options="eventAnimHDataOptions"-->
    <!--      :height="170"-->
    <!--      :width="120"-->
    <!--      @animCreated="handleAnimation"-->
    <!--    />-->
    <el-amap
      class="mapDiv"
      vid="bgAmap"
      :center="center"
      :view-mode="viewMode"
      :amap-manager="amapManager"
      sky-color="#000000"
      rotation="45"
      :zoom="aMap.zoom"
      :pitch="pitch"
      :map-style="mapStyle"
    >
    </el-amap>
  </div>
</template>
<script>
import { AMapManager } from 'vue-amap'

const amapManager = new AMapManager()
export default {
  name: 'BgMap',
  props: {
    aMap: {
      type: Object,
      default: () => {
        return {
          zoom: 17,
          lan: 40.003282,
          lon: 116.476268
        }
      }
    }
  },
  computed: {
    center() {
      return [this.aMap.lon, this.aMap.lan]
    }
  },
  data() {
    return {
      // 高德地图原生对象
      // 确保 vue-amap 的导入名不是 AMap，推荐 import VueAMap from 'vue-amap' 避免和高德全局的 AMap 冲突。
      // 若 eslint 报错 AMap is undefined 之类的错误。请将 AMap 配置到 .eslintrc 的 globals 中。
      amapManager,
      defaultStyle: {
        height: 40
      },
      picUrl: 'http://amappc.cn-hangzhou.oss-pub.aliyun-inc.com/lbs/static/img/dongwuyuan.jpg',
      pitch: 72,
      rotation: 10,
      viewMode: '3D',
      position: [],
      // features: ['bg', 'road', 'building'],
      mapStyle: 'amap://styles/405132b34839bd92b05e55042c786d07'
    }
  }
}
</script>

<style lang="scss" scoped>
.a-map, .mapDiv {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
