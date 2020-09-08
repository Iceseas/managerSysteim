<template>
  <div style="width:100%;height:100%;position:relative;overflow: hidden;">
    <VideoOperator ref="videoOperator" :id="deviceNoHls" style="width:100%;height:100%"/>
    <div :class="{'hello': hello, 'yse_show_con2': showButtons, 'no_show_con2': !showButtons}">
      <!--<div :class="{'yse_show_con1': showButtons, 'no_show_con1': !showButtons}">-->
      <!--</div>-->
      <div :class="{'yes_show_lefticon': showButtons, 'no_show_lefticon': !showButtons}" @click="handleHide">
        <img src="@/assets/monitor/left-show.png">
      </div>
      <div v-if="showButtons" style="height:100%" >
        <div class="control-con">
          <div class="control-top">
            <el-row type="flex" class="row-bg" justify="space-around">
              <el-col :span="6">
                <div class="control-btn" @click="handleClickZs">
                  <img
                    :src="middleImg.img1"
                    alt="左上"
                    title="左上"
                    @mouseover="middleImg.img1 = hoverImg.img1"
                    @mouseleave="middleImg.img1 = defaultImg.img1"
                  >
                </div>
              </el-col>
              <el-col :span="6">
                <div class="control-btn" @click="handleClickS">
                  <img
                    :src="middleImg.img2"
                    alt="上"
                    title="上"
                    @mouseover="middleImg.img2 = hoverImg.img2"
                    @mouseleave="middleImg.img2 = defaultImg.img2"
                  >
                </div>
              </el-col>
              <el-col :span="6">
                <div class="control-btn" @click="handleClickYs">
                  <img
                    :src="middleImg.img3"
                    alt="右上"
                    title="右上"
                    @mouseover="middleImg.img3 = hoverImg.img3"
                    @mouseleave="middleImg.img3 = defaultImg.img3"
                  >
                </div>
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
              <el-col :span="6">
                <div class="control-btn" @click="handleClickZ">
                  <img
                    :src="middleImg.img4"
                    alt="左"
                    title="左"
                    @mouseover="middleImg.img4 = hoverImg.img4"
                    @mouseleave="middleImg.img4 = defaultImg.img4"
                  >
                </div>
              </el-col>
              <el-col :span="6">
                <div class="control-btn" @click="handleClickFlash">
                  <img
                    :src="middleImg.img5"
                    alt="刷新"
                    title="刷新"
                    @mouseover="middleImg.img5 = hoverImg.img5"
                    @mouseleave="middleImg.img5 = defaultImg.img5"
                  >
                </div>
              </el-col>
              <el-col :span="6">
                <div class="control-btn" @click="handleClickY">
                  <img
                    :src="middleImg.img6"
                    alt="右"
                    title="右"
                    @mouseover="middleImg.img6 = hoverImg.img6"
                    @mouseleave="middleImg.img6 = defaultImg.img6"
                  >
                </div>
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
              <el-col :span="6">
                <div class="control-btn" @click="handleClickZx">
                  <img
                    :src="middleImg.img7"
                    alt="左下"
                    title="左下"
                    @mouseover="middleImg.img7 = hoverImg.img7"
                    @mouseleave="middleImg.img7 = defaultImg.img7"
                  >
                </div>
              </el-col>
              <el-col :span="6">
                <div class="control-btn" @click="handleClickX">
                  <img
                    :src="middleImg.img8"
                    alt="下"
                    title="下"
                    @mouseover="middleImg.img8 = hoverImg.img8"
                    @mouseleave="middleImg.img8 = defaultImg.img8"
                  >
                </div>
              </el-col>
              <el-col :span="6">
                <div class="control-btn" @click="handleClickYx">
                  <img
                    :src="middleImg.img9"
                    alt="右下"
                    title="右下"
                    @mouseover="middleImg.img9 = hoverImg.img9"
                    @mouseleave="middleImg.img9 = defaultImg.img9"
                  >
                </div>
              </el-col>
            </el-row>
          </div>
          <div>
            <el-select v-model="selectVal" class="event-select" placeholder>
              <el-option label="变倍" value="1"/>
              <el-option label="变焦" value="2"/>
              <el-option label="光圈" value="3"/>
            </el-select>
          </div>
          <div class="block slider-con">
            <div>
              <i class="el-icon-plus" @click="addSliderVal"/>
            </div>
            <el-slider v-model="sliderVal" :min="1" :max="20" vertical height="125px"/>
            <div>
              <i class="el-icon-minus" @click="reduceSliderVal"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VideoOperator from './videoOperator';
import { haikangOperator } from '@/api/mt/sluiceControl';
import { openNotify } from '@/utils';
export default {
  name: 'VideoPlayer1',
  components: {
    VideoOperator
  },
  props: {
    id: {
      default: null,
      type: String
    }
  },
  data() {
    return {
      showButtons: false,
      sliderVal: 10,
      selectVal: '1',
      deviceNoHls: this.id,
      hello: true,
      defaultImg: {
        img1: require('@/assets/monitor/control/default/d-btn1.png'),
        img2: require('@/assets/monitor/control/default/d-btn2.png'),
        img3: require('@/assets/monitor/control/default/d-btn3.png'),
        img4: require('@/assets/monitor/control/default/d-btn4.png'),
        img5: require('@/assets/monitor/control/default/d-btn5.png'),
        img6: require('@/assets/monitor/control/default/d-btn6.png'),
        img7: require('@/assets/monitor/control/default/d-btn7.png'),
        img8: require('@/assets/monitor/control/default/d-btn8.png'),
        img9: require('@/assets/monitor/control/default/d-btn9.png')
      },
      middleImg: {
        img1: require('@/assets/monitor/control/default/d-btn1.png'),
        img2: require('@/assets/monitor/control/default/d-btn2.png'),
        img3: require('@/assets/monitor/control/default/d-btn3.png'),
        img4: require('@/assets/monitor/control/default/d-btn4.png'),
        img5: require('@/assets/monitor/control/default/d-btn5.png'),
        img6: require('@/assets/monitor/control/default/d-btn6.png'),
        img7: require('@/assets/monitor/control/default/d-btn7.png'),
        img8: require('@/assets/monitor/control/default/d-btn8.png'),
        img9: require('@/assets/monitor/control/default/d-btn9.png')
      },
      hoverImg: {
        img1: require('@/assets/monitor/control/hover/d-btn1.png'),
        img2: require('@/assets/monitor/control/hover/d-btn2.png'),
        img3: require('@/assets/monitor/control/hover/d-btn3.png'),
        img4: require('@/assets/monitor/control/hover/d-btn4.png'),
        img5: require('@/assets/monitor/control/hover/d-btn5.png'),
        img6: require('@/assets/monitor/control/hover/d-btn6.png'),
        img7: require('@/assets/monitor/control/hover/d-btn7.png'),
        img8: require('@/assets/monitor/control/hover/d-btn8.png'),
        img9: require('@/assets/monitor/control/hover/d-btn9.png')
      },
      activeImg: {
        img1: require('@/assets/monitor/control/active/d-btn5.png'),
        img2: require('@/assets/monitor/control/active/d-btn2.png'),
        img3: require('@/assets/monitor/control/active/d-btn3.png'),
        img4: require('@/assets/monitor/control/active/d-btn4.png'),
        img5: require('@/assets/monitor/control/active/d-btn5.png'),
        img6: require('@/assets/monitor/control/active/d-btn6.png'),
        img7: require('@/assets/monitor/control/active/d-btn7.png'),
        img8: require('@/assets/monitor/control/active/d-btn8.png'),
        img9: require('@/assets/monitor/control/active/d-btn9.png')
      }
    };
  },
  watch: {
    id(val) {
      this.deviceNoHls = val;
    }
  },
  created() {
    this.restData();
  },
  methods: {
    restData() {
      this.deviceNoHls = this.id;
    },
    // 左上
    handleClickZs() {
      var mtVideoOperator = {};
      mtVideoOperator.opeartorType = 1;
      mtVideoOperator.DPSDK_CORE_PTZ_GO_LEFTUP = 1;
      mtVideoOperator.deviceNo = this.deviceNoHls;
      this.dahuaOperator(mtVideoOperator);
    },
    // 上
    handleClickS() {
      var mtVideoOperator = {};
      mtVideoOperator.opeartorType = 1;
      mtVideoOperator.DPSDK_CORE_PTZ_GO_UP = 1;
      mtVideoOperator.deviceNo = this.deviceNoHls;
      this.dahuaOperator(mtVideoOperator);
    },
    // 右上
    handleClickYs() {
      var mtVideoOperator = {};
      mtVideoOperator.opeartorType = 1;
      mtVideoOperator.DPSDK_CORE_PTZ_GO_RIGHTUP = 1;
      mtVideoOperator.deviceNo = this.deviceNoHls;
      this.dahuaOperator(mtVideoOperator);
    },
    // 左
    handleClickZ() {
      var mtVideoOperator = {};
      mtVideoOperator.opeartorType = 1;
      mtVideoOperator.DPSDK_CORE_PTZ_GO_LEFT = 1;
      mtVideoOperator.deviceNo = this.deviceNoHls;
      this.dahuaOperator(mtVideoOperator);
    },
    // 刷新
    handleClickFlash() {
    },
    // 右
    handleClickY() {
      var mtVideoOperator = {};
      mtVideoOperator.opeartorType = 1;
      mtVideoOperator.DPSDK_CORE_PTZ_GO_RIGHT = 1;
      mtVideoOperator.deviceNo = this.deviceNoHls;
      this.dahuaOperator(mtVideoOperator);
    },
    // 左下
    handleClickZx() {
      var mtVideoOperator = {};
      mtVideoOperator.opeartorType = 1;
      mtVideoOperator.DPSDK_CORE_PTZ_GO_LEFTDOWN = 1;
      mtVideoOperator.deviceNo = this.deviceNoHls;
      this.dahuaOperator(mtVideoOperator);
    },
    // 下
    handleClickX() {
      var mtVideoOperator = {};
      mtVideoOperator.opeartorType = 1;
      mtVideoOperator.DPSDK_CORE_PTZ_GO_DOWN = 1;
      mtVideoOperator.deviceNo = this.deviceNoHls;
      this.dahuaOperator(mtVideoOperator);
    },
    // 右下
    handleClickYx() {
      var mtVideoOperator = {};
      mtVideoOperator.opeartorType = 1;
      mtVideoOperator.DPSDK_CORE_PTZ_GO_RIGHTDOWN = 1;
      mtVideoOperator.deviceNo = this.deviceNoHls;
      this.dahuaOperator(mtVideoOperator);
    },
    // 加号操作
    addSliderVal() {
      if (this.sliderVal === 20) {
        return;
      }
      this.sliderVal++;
      var mtVideoOperator = {};
      mtVideoOperator.opeartorType = 2;
      mtVideoOperator.deviceNo = this.deviceNoHls;
      if (this.selectVal === '1') { // 变倍
        mtVideoOperator.DPSDK_CORE_PTZ_ADD_ZOOM = 1;
      }
      if (this.selectVal === '2') { // 变焦
        mtVideoOperator.DPSDK_CORE_PTZ_ADD_FOCUS = 1;
      }
      if (this.selectVal === '3') { // 光圈
        mtVideoOperator.DPSDK_CORE_PTZ_ADD_APERTURE = 1;
      }
      this.dahuaOperator(mtVideoOperator);
    },
    // 减号操作
    reduceSliderVal() {
      if (this.sliderVal === 1) {
        return;
      }
      this.sliderVal--;
      var mtVideoOperator = {};
      mtVideoOperator.opeartorType = 2;
      mtVideoOperator.deviceNo = this.deviceNoHls;
      if (this.selectVal === '1') { // 变倍
        mtVideoOperator.DPSDK_CORE_PTZ_REDUCE_ZOOM = 1;
      }
      if (this.selectVal === '2') { // 变焦
        mtVideoOperator.DPSDK_CORE_PTZ_REDUCE_FOCUS = 1;
      }
      if (this.selectVal === '3') { // 光圈
        mtVideoOperator.DPSDK_CORE_PTZ_REDUCE_APERTURE = 1;
      }
      this.dahuaOperator(mtVideoOperator);
    },
    dahuaOperator(data) { // testControl里的data是接收云台控制组件的里按钮传递的参数。
      haikangOperator(data).then((response) => {
        openNotify('info', response.statusText);
      }).catch(err => {
        console.log(err.response.data.message);
      });
    },
    // 左侧视频调整框
    handleHide() {
      this.showButtons = !this.showButtons;
    }
  }
};
</script>

<style lang="scss">
    .hello{
      width:11%;
      height:100%;
      position:absolute;
      right:-18%;
      z-index: 1;

      .control-con {
        width: 100%;
        height: 100%;
        padding: 15px 0;
        background: #ebecec;
        margin: auto;
        margin-right: 0px;
        /*margin-top: 100px;*/
        /*z-index: 99999;*/
        .control-top {
          /*background: #dadbdb;*/
          border: 1px solid #d5d5d5;
          border-radius: 4px;
          height: 40%;
          width: 100%;
          margin: auto;
          padding-top: 5px;
        }
        .control-btn {
          height: 100%;
        }
      }
      .el-icon-plus,
      .el-icon-minus {
        color: #477ae3;
        font-weight: 900;
        font-size: 26px;
        cursor: pointer;
        margin: 5px 0;
      }
      .event-select {
        width: 85%;
        margin-left: 10px;
        margin-top: 10px;
      }
      .slider-con {
        width: 40px;
        margin: 0px auto;
        .el-slider {
          .el-slider__runway {
            width: 12px !important;
            background-color: #477ae3;
            margin: 0 7px !important;
          }
          .el-slider__bar {
            width: 12px !important;
            background-color: #477ae3;
          }
          .el-slider__button-wrapper {
            left: -12px !important;
          }
        }
      }
      .el-col {
        border-radius: 4px;
      }
      .el-row {
        margin: 3px;
      }
    }
    .yse_show_con2{
        right: 0px;
        top: 0px;
    }
     .no_show_con2 {
    right: -10%;
    top: 0;
    }
    .no_show_lefticon{
        position: absolute;
        left: -10px;
        top: 50%;
    }
    .yes_show_lefticon{
        position: absolute;
        left: -10px;
        top: 50%;
    }
</style>
