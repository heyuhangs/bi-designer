<template>
  <div class="layer-components-main">
    <el-tree :data="elementList" :props="treeDefaultProps">
      <template slot-scope="{ node, data }">
        <div class="el-layer-content-item" @node-click="handleNodeClick(node,data)">
          <el-row>
            <el-col :span="5">
              <div class="con-item-icon">
                <svg-icon v-if="data.isSvg" :icon-class="data.icon" class-name="item-panel-icon"/>
                <i v-else :class="[data.icon]"/>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="con-item-txt">
                <span>{{ data.elName }}</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </template>

    </el-tree>
  </div>
</template>

<script>
// import componentLibs from '../component-libs/Index'
// import pageManage from '../page-manage'
// import templateLibs from '../template-libs'

import { mapGetters, mapState } from 'vuex'

export default {
  props: {},
  data() {
    return {
      ele: [],
      treeDefaultProps: {
        children: 'chirden',
        label: 'elName'
      }
    }
  },
  computed: {
    ...mapState({
      projectData: state => state.editor.projectData
    }),
    ...mapGetters([
      'elementList'
    ])
  },
  // $watch: {
  //   elementList(val) {
  //   }
  // },
  mounted() {
    const self = this
    // setTimeout(function() {
    // self.elementList
    // console.log(self.elementList)
    // }, 5000)
    // debugger
  },
  methods: {
    handleNodeClick(node) {

    }
    // initLayerComponents() {
    // debugger
    // this.ele = this.projectData.pages[0].elements
    // console.log('ele', this.ele)
    // }
  }
}
</script>

<style lang="scss" scoped>
.layer-components-main {
  display: flex;
  position: relative;
  overflow-y: scroll;
  /*background: #000000;*/
  /*height: 100%;*/
  max-height: calc(100vh - 105px);

  .editor-side-bar {
    background: #333;
    width: 55px;
  }

  .editor-page-edit-wrapper {
    width: 100%;
    padding: 0 1px;
  }

  .editor-main {
    flex: 1;
    background: #171b22 !important;
    /*background: #f0f2f5;*/
    position: relative;
  }

  .el-attr-edit-wrapper {
    width: 380px;
    padding: 0;
  }

  .el-layer-content-item {
    width: 100%;
    line-height: 60px;
    margin-bottom: 5px;
    /*padding: 6px 8px;*/
    color: #c0c4cc;
    font-size: 14px;
    cursor: pointer;

    .con-item-icon {
      text-align: center;
      background: #292E33;
      margin-left: 8px;

      i {
        font-size: 21px;
      }

      .item-panel-icon {
        font-size: 21px;
      }

    }

    .con-item-txt {
      text-align: left;
      padding-left: 10px;

      span {
        /*font-size: 14px;*/
      }
    }
  }
}
</style>
<style>
.layer-components-main .el-tree {
  width: 100%;
  background: #16191C;
  color: #C0C4CC;
  padding: 12px 8px !important;
  height: 100% !important;
}

.layer-components-main .el-tree-node__expand-icon {
  display: none;
}

.layer-components-main .el-tree-node__content {
  box-sizing: content-box;
  height: 70px;
  line-height: 50px;
  background: #1F2327 !important;
}

.layer-components-main .el-tree-node__content:hover {
  background: #292E33 !important;
}

.layer-components-main .el-tree-node__content:hover .con-item-icon {
  background-color: #1F2327;
}

/*.layer-components-main .el-tree-node:focus > .el-tree-node__content {*/
/*  background: #79e2fe;*/
/*}*/
/*.layer-components-main .el-tree-node:focus > .el-tree-node__content .el-layer-content-item{*/
/*  color: #fff;*/
/*}*/

</style>
