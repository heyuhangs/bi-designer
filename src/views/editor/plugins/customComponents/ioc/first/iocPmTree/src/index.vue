<!--test.vue-->
<template>
  <div class="ioc-ew-tree">
    <div v-for="(item,index) in comData.list" :key="index" class="ioc-ew-tree-item">
      <h5>{{ item.title }}</h5>
      <div class="ioc-ew-overflow">
        <ul>
          <li v-for="(cItem,cInx) in item.child" :key="cInx">
            <h6>{{ cItem.name }}</h6>
            <div class="ioc-ew-flex">
              <big>{{ cItem.value }}</big>
              <small>{{ cItem.company }}</small>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IocPmTree', // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
  props: {
    comData: {
      type: Object,
      default: () => {
        return {
          list: [{
            title: '能源供给',
            child: [
              {
                name: '供水量',
                value: '925',
                company: '万立方米'
              },
              {
                name: '供电量',
                value: '3.2',
                company: '亿千瓦时'
              },
              {
                name: '供气量',
                value: '4105',
                company: '万立方米'
              }
            ]
          }, {
            title: '交通出行',
            child: [
              {
                name: '出行总量',
                value: '3665',
                company: '万人次'
              },
              {
                name: '公交客流量',
                value: '1796',
                company: '万人次'
              },
              {
                name: '绿色交通出行率',
                value: '75',
                company: '%'
              }
            ]
          }, {
            title: '公共安全',
            child: [
              {
                name: '119报警',
                value: '184',
                company: '起/日'
              },
              {
                name: '110报警',
                value: '27300',
                company: '起/日'
              },
              {
                name: '灾害预警',
                value: '128',
                company: '条'
              }
            ]
          }, {
            title: '生态环境',
            child: [
              {
                name: '空气污染指数',
                value: '30',
                company: ''
              },
              {
                name: '水质劣五类河道占比',
                value: '0.387',
                company: '%'
              },
              {
                name: '单位GDP综合能耗',
                value: '0.52',
                company: '吨标煤/万元'
              }
            ]
          }]
        }
      }
    }
  },
  data() {
    return {
      defaultStyle: {
        height: 212,
        width: 690
      }
    }
  }
}
</script>

<!--.ioc-ew-tree {-->
<!--animation: myMove 5s linear infinite;-->
<!--animation-fill-mode: forwards;-->
<!--}-->
<!--@keyframes myMove {-->
<!--0% {-->
<!--transform: translateX(0);-->
<!--}-->
<!--50% {-->
<!--transform: translateX(-80px);-->
<!--}-->
<!--100% {-->
<!--transform: translateX(0px);-->
<!--}-->
<!--}-->
<style lang="scss" scoped>
  .ioc-ew-tree {
    text-align: center;
    display: flex;
    flex-flow: row;
    justify-content: flex-start;
    overflow-x: auto;

    h5 {
      color: #bcf4fa;
      font-size: 18px;
      line-height: 20px;
      height: 20px;
      margin-bottom: 18px;
      text-align: left;

      &::before {
        content: '';
        width: 10.81px;
        height: 10.81px;
        border-radius: 5.405px;
        background-color: #0095ff;
        //background-color: #e5bc50; //另外两种颜色
        //background-color: #2cfee9;
        display: inline-block;
        margin-right: 10px;
      }
    }

    .ioc-ew-overflow {
      max-height: 165px;
      margin-left: 5px;
      border-left: 2px solid #052848;
      position: relative;

      &::before {
        content: '';
        width: 0;
        height: 0;
        border-width: 4px 4px 4px 0;
        border-style: solid;
        border-color: transparent #052848 transparent transparent;
        display: inline-block;
        position: absolute;
        top: 50%;
        left: -6px;
        margin-top: -4px;
      }

      ul {
        min-width: 141px;
        max-height: 165px;
        padding-left: 15px;
        line-height: 0;
        font-size: 0;
        margin-right: 30px;
        overflow-y: hidden;

        li {
          margin-bottom: 18px;

          &:last-child {
            margin-bottom: 0;
          }

          h6 {
            font-size: 14px;
            color: #72979d;
            line-height: 14px;
            text-align: left;
            font-weight: normal;
            margin-bottom: 10px;
            /*white-space: nowrap;*/
          }

          .ioc-ew-flex {
            display: flex;
            flex-flow: row;
            justify-content: space-between;
            align-items: flex-end;

            big {
              color: #0095ff;
              //background-color: #e5bc50; //另外两种颜色
              //background-color: #2cfee9;
              font-size: 22px;
              line-height: 22px;
              height: 19px;
              text-align: left;
            }

            small {
              font-size: 12px;
              line-height: 12px;
              color: #5a5b5b;
              text-align: left;
            }
          }
        }
      }
    }
    .ioc-ew-tree-item:nth-child(2) {
      h5 {
        /*color: #F1C43F;*/

        &::before {
          background-color: #F1C43F;
        }
      }

      ul {
        li {
          .ioc-ew-flex {
            big {
              color: #F1C43F;
            }
          }
        }
      }
    }

    .ioc-ew-tree-item:nth-child(3) {
      h5 {
        /*color: #1FFEEA;*/

        &::before {
          background-color: #1FFEEA;
        }
      }

      ul {
        li {
          .ioc-ew-flex {
            big {
              color: #1FFEEA;
            }
          }
        }
      }
    }

    .ioc-ew-tree-item:nth-child(4) {
      h5 {
        /*color: #0199FE;*/

        &::before {
          background-color: #0199FE;
        }
      }

      ul {
        li {
          .ioc-ew-flex {
            big {
              color: #0199FE;
            }
          }
        }
      }
    }
  }
</style>
