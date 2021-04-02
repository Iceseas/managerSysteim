<template>
  <div id="app" class="System_body">
    <router-view class="login_res_body"></router-view>
  </div>
</template>

<script>
import {
  localStorageGetData,
  localStorageRemoveData,
} from "@/util/localStorageData";
import axios from "axios";
import { removeCookie } from "@/util/cookie";
export default {
  data() {
    return {
      welcomeManager: "",
    };
  },
  mounted() {
    this.welcomeManager = localStorageGetData("nowLoginUserCount");
  },
  components: {},
  beforeDestory() {
    axios({
      url: "http://localhost:3000/ManagerCount/api/logOut",
      method: "POST",
      data: {
        managerCount: this.welcomeManager,
      },
    })
      .then((res) => {
        if (res.data.error == 0) {
          localStorageRemoveData("nowLoginUserCount");
          removeCookie("token");
        }
      })
      .catch(() => {
        localStorageRemoveData("nowLoginUserCount");
        removeCookie("token");
      });
  },
};
</script>

<style>
html,
body {
  height: 100%;
}

html[style='filter: invert(1) hue-rotate(180deg);'] 
.notToSwitchDark{
  filter:invert(1) hue-rotate(180deg)
}

html{
  transition: color 0.3s, background-color 0.3s;
}

* {
  padding: 0;
  margin: 0;
  font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
}
.System_body {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.login_res_body {
  width: 100%;
  height: 100%;
}
.cut_off_line {
  display: inline-block;
  height: 60px;
  width: 1px;
  background: #eee;
  margin-top: 20px;
}
.WidthHeight100 {
  width: 100%;
  height: 100%;
  display: inline-block;
}
.showTable_box {
  width: 100%;
  height: 100%;
}
.addData_box {
  padding: 0;
  margin: 0;
  line-height: 0;
  text-align: left;
}
</style>
