<!--test.vue-->
<template>
  <div class="a-map">
    <el-amap
      class="mapDiv"
      :center="center"
      :view-mode="viewMode"
      sky-color="#000000"
      :zoom="configObj.mapConfig.zoom"
      :pitch="pitch"
    />
  </div>
  <!--      :center=""-->
</template>

<script>
import VueAMap from 'vue-amap'

export default {
  name: 'AMap',
  props: {
    // aMap: {
    //   type: Object,
    //   default: () => {
    //     return {
    //       lon: '117.215727',
    //       lan: '39.056956',
    //       zoom: '17'
    //     }
    //   }
    // },
    configObj: {
      type: Object,
      default: () => {
        return {
          // 标题配置
          mapConfig: {
            lon: '117.215727',
            lan: '39.056956',
            zoom: 17
          }
        }
      }
    }
  },
  data() {
    return {
      defaultStyle: {
        height: 40
      },
      zoom: 12,
      pitch: 70,
      viewMode: '2D'
      // mapEvents: {
      //   init(o) {
      //     o.setMapStyle('amap://styles/fe5fbf24e6f32fb2024fe9b036725279')
      //   }
      // }
    }
  },
  computed: {
    center() {
      return [this.configObj.mapConfig.lon, this.configObj.mapConfig.lan]
    }
  }, // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
  // props: {
  //   text: {editor-main
  //     type: String,
  //     default: '这是一段文字'
  //   }
  // },
  created() {
    this.initMapData()
  },
  methods: {
    initMapData() {
      VueAMap.initAMapApiLoader({
        // 高德的key
        key: 'e7152df832f53aad42466f79b0630139',
        // 插件集合
        plugin: ['AMap.ControlBar'],
        // plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.Geolocation',
        //   'AMapUI.loadUI', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.PolyEditor', 'AMap.CircleEditor'],

        v: '1.4.15',
        // uiVersion: '1.4.11', // 版本号
        resizeEnable: true,
        rotateEnable: true,
        pitchEnable: true,
        maxpitch: 70,
        rotation: -15,
        buildingAnimation: true, // 楼块出现是否带动画
        expandZoomRange: true,
        zooms: [3, 20]
      })
    }
  }
}
</script>

<style scoped>
  .mapDiv {
    width: 100%;
    height: 100%;
  }

  .a-map {
    width: 100%;
    height: 100%;
  }
</style>
<style>
  .amap-logo {
    display: none !important;
  }
</style>
