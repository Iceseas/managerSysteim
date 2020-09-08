<template>
  <div class="form_body">
    <!-- 控件栏 -->
    <div class="pulgins">
      <div class="pulgins_title">控件栏</div>
      <Row>
        <Col span="8">
          <div class="pilgin_init input" @mousedown="handleMove">
            <div class="pilgin_title">单行输入框</div>
          </div>
        </Col>
        <Col span="8">
          <div class="pilgin_init label" @mousedown="handleMove">
            <div class="pilgin_title">单行输入框</div>
          </div>
        </Col>
        <Col span="8">
          <div class="pilgin_init select" @mousedown="handleMove">
            <div class="pilgin_title">单行输入框</div>
          </div>
        </Col>
      </Row>
    </div>
    <!-- 拖拽栏 -->
    <div class="dropbox">
      <div class="pulgins_title" ref="dropbox">拖拽栏</div>
      <GridLayout
        :layout="testLayout"
        :col-width="140"
        :row-height="40"
        :is-draggable="true"
        :is-resizable="true"
        :vertical-compact="true"
        :margin="[1, 1]"
        :use-css-transforms="true"
      >
        <GridItem
          v-for="item in testLayout"
          :key="item.i"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          @moved="movedEvent"
          class="griditem"
        >
          
        </GridItem>
      </GridLayout>
    </div>
    <!-- 表单页 -->
    <div class="formlist">
      <div class="pulgins_title">表单页</div>
    </div>
  </div>
</template>

<script>
import vueGridLayout from "vue-grid-layout";
const matedata = [
  {
    i: "0", // 索引值 必填
    h: 4, // 高度   必填
    w: 7, // 宽度   必填
    x: 2, // x 轴距离 必填
    y: 0, // y轴距离 必填
    minW: 5, // 最小宽度 当 w的值小于minW时 采用minW的值
    minH: 3, // 同上
    maxW: 8, // 的最大宽度。如果w大于maxW，那么w将被设置为maxW。
    maxH: 6, // 同上
    isDraggable: true, // 单独控制这一个盒子是否可以拖动 未填写 继承父元素的 非必填
    isResizable: true, // 单独控制这一个盒子是否可以调整大小 未填写 继承父元素的 非必填
    static: false, // 这个盒子是静态的  不能被其他元素改变位置 会被覆盖在底部
    dragIgnoreFrom: "", // 属性这值为css 选择器 项的哪些元素不应触发项的拖动事件// 具体不知道干嘛的 没有用到
    dragAllowFrom: "", // 属性这值为css 选择器 项的哪些元素应触发项的拖动事件 // 文档这样写的
    resizeIgnoreFrom: "", //属性这值为css 选择器 表示项的哪些元素不应触发项的调整大小事件。//来自文档翻译
  },
  {
    h: 1,
    i: "1",
    w: 1,
    x: 0,
    y: 1,
  },
  {
    h: 1,
    i: "2",
    w: 1,
    x: 0,
    y: 2,
  },
  {
    h: 1,
    i: "3",
    w: 1,
    x: 0,
    y: 3,
  },
];
export default {
  components: {
    GridLayout: vueGridLayout.GridLayout, //注册组件
    GridItem: vueGridLayout.GridItem, // 注册
  },
  data() {
    return {
      testLayout: [],
    };
  },
  methods: {
    handleMove(el) {
      console.log(111)
      if (el.which == 1) {
        let moveItem = window.document.createElement("div");
        moveItem.style.position = "absolute";
        moveItem.style.left = el.pageX - 50 + "px";
        moveItem.style.top = el.pageY - 50 + "px";
        moveItem.innerHTML = el.target.innerHTML;
        moveItem.className = el.target.className + " move_style";
        window.document.body.appendChild(moveItem);
        document.onmousemove = (mouse) => {
          moveItem.style.left = mouse.pageX - 50 + "px";
          moveItem.style.top = mouse.pageY - 50 + "px";
        };
        document.onmouseup = (mouse) => {
          let dropdetails = this.getElemDis(this.$refs.dropbox);
          console.log(dropdetails);
          const mouseX = mouse.pageX;
          const mouseY = mouse.pageY;
            let controlX = Number.parseInt(
              (mouse.pageX - dropdetails.left) /
                (this.$refs.dropbox.offsetWidth / 8)
            );
            let controlY = Number.parseInt(
              (mouse.pageY - dropdetails.top) / 120
            );
            this.$nextTick(() => {
              let controlParams = {
                controlX: controlX,
                controlY: controlY,
              };
              this.controlInit(controlParams);
            });
            moveItem.remove();
        };
      }
    },
      // 控件移动完成执行的方法
      movedEvent(i, newX, newY) {  //移动完成
        // let movedControl = this.controlLayout.filter((controlLayoutObj) => {
        //   return Number.parseInt(controlLayoutObj.i) == Number.parseInt(i)
        // })
        // transform
        // console.log("MOVED i=" + i + ", X=" + newX + ", Y=" + newY);
      },
    // 初始化
    controlInit(data) {
      this.testLayout.push({
        x: data.controlX,
        y: data.controlY,
        w: 1,
        h: 1,
        i: new Date().getTime(),
      });
    },
    // 获取当前鼠标所在位置的方法
    getElemDis(el) {
      var tp = document.documentElement.clientTop,
        lt = document.documentElement.clientLeft,
        rect = el.getBoundingClientRect();
      return {
        top: rect.top - tp,
        right: rect.right - lt,
        bottom: rect.bottom - tp,
        left: rect.left - lt,
      };
    },
  },
};
</script>

<style>
.form_body {
  width: 100%;
  height: 752px;
  background: #fff;
  display: flex;
}
.pulgins,
.formlist {
  width: 300px;
  background: #fff;
  box-sizing: border-box;
  box-shadow: 1px 0 5px rgb(216, 216, 216);
  display: inline-block;
  height: 100%;
}
.dropbox {
  flex: 1;
  display: inline-block;
  height: 100%;
}
.pilgin_init {
  height: 90px;
  text-align: center;
  box-sizing: border-box;
  border: 1px solid #eee;
  cursor: move;
}
.pilgin_title {
  margin-top: 67px;
  width: 100%;
  text-align: center;
}
.pulgins_title {
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-bottom: 1px solid #eee;
}
.move_style {
  border: none !important;
}
.input {
  background: url("../assets/formIcon/input.svg") center center no-repeat;
  background-size: auto 40%;
}
.label {
  background: url("../assets/formIcon/label.svg") center center no-repeat;
  background-size: auto 40%;
}
.select {
  background: url("../assets/formIcon/select.svg") center center no-repeat;
  background-size: auto 40%;
}
.griditem {
  border: 1px dashed #808695;
}
</style>