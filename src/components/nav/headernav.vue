<template>
  <div class="headernav_body">
    <div class="headernav_title">后台管理系统</div>
    <div class="headernav_menu">
      <ul class="headernav_ShowUserMsg_ul">
        <li class="headernav_ShowUserMsg_li">
          欢迎您:{{ welcomeManager }} 
        </li>
        <li class="headernav_ShowUserMsg_li">
          <Button
            size="large"
            icon="md-person"
            @click="showNowUser"
          ></Button>
        </li>
        <li class="headernav_ShowUserMsg_li">
          <Button size="large" 
            icon="md-contrast"
            @click="switchTheme"
            ></Button>
        </li>
        <li class="headernav_ShowUserMsg_li">
          <Button
            size="large"
            icon="md-log-out"
            @click="openLogOutModal"
          ></Button>
        </li>
      </ul>
    </div>
    <!-- 当前用户显示信息 -->
    <Modal v-model="showUserMsgModal" width="360">
      <div slot="header" style="color:#2d3436;text-align:center">
        <p>当前用户</p>
      </div>
      <div style="text-align:center">
        <Avatar
          src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1674760321,2881373110&fm=26&gp=0.jpg"
          icon="ios-person"
          size="large"
        />
        <p>{{ welcomeManager }}</p>
      </div>
      <div slot="footer">
        <Button type="primary" size="large" long @click="closeShowUser"
          >确定</Button
        >
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  localStorageGetData,
  localStorageSetData,
  localStorageRemoveData,
} from "@/util/localStorageData";
import {UserApi} from '@/api/api'
import { removeCookie } from "@/util/cookie";
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      welcomeManager: "",
      showUserMsgModal: false,
    };
  },
  mounted() {
    this.welcomeManager = localStorageGetData("nowLoginUserName");
    this.nowOnlineManager = localStorageGetData("nowLoginUserCount");
    
  },
  methods: {
    // 退出
    openLogOutModal() {
      this.$Modal.confirm({
        title: "退出",
        content: "<p>确定要退出吗</p>",
        onOk: () => {
          this.$Spin.show();
          UserApi.logOut({
            discount: this.nowOnlineManager,
          })
            .then((res) => {
              if (res.data.err == 0) {
                localStorageRemoveData("nowLoginUserCount");
                localStorageRemoveData("nowLoginUserName");
                removeCookie("token");
                this.$Spin.hide();
                this.Message('success', res.data.msg)
                this.$router.replace("/login");
              } else {
                localStorageRemoveData("nowLoginUserCount");
                localStorageRemoveData("nowLoginUserName");
                removeCookie("token");
                this.$Spin.hide();
                this.Message('error', res.data.msg)
              }
            })
            .catch((err) => {
              localStorageRemoveData("nowLoginUserCount");
              localStorageRemoveData("nowLoginUserName");
              removeCookie("token");
              this.$Spin.hide();
              this.Message('error', err.data.msg)
            });
           // 禁用后退
          history.pushState(null, null, document.URL);
          window.addEventListener("popstate",function() {  
          history.pushState(null, null, document.URL);
          }, false);
        },
        onCancel: () => {},
      });
    },
    // 显示当前用户信息
    showNowUser() {
      this.showUserMsgModal = true;
    },
    closeShowUser() {
      this.showUserMsgModal = false;
    },
    // 切换黑暗模式
    switchTheme() {
      let headNav = document.querySelector(".headernav_ShowUserMsg_li");
      let htmlNode = document.querySelector("html");
      if (! eval(localStorageGetData("isDarkTheme"))) {
        htmlNode.style.filter = "invert(1) hue-rotate(180deg)";
        headNav.style.filter = "invert(1) hue-rotate(180deg)";
        localStorageSetData("isDarkTheme", !eval(localStorageGetData("isDarkTheme")))
      } else {
        htmlNode.style.filter = "";
        headNav.style.filter = "";
        localStorageSetData("isDarkTheme", !eval(localStorageGetData("isDarkTheme")))
      }
    },
    // 封装消息提示
    Message(type, content, duration, closable) {
      let msDuration,msClosable;
      if (duration === null || duration === undefined || duration === '') {
        msDuration = 1.5
      } else {
        msDuration = duration
      }
      if (closable === null || closable === undefined || closable === '') {
        msClosable = false
      } else {
        msClosable = closable
      }
      this.$Message.destroy()
      this.$Message[type]({
        content,
        duration: msDuration,
        closable: msClosable,
      })
    }
  },
};
</script>

<style scope>
.el-dropdown-link,
.el-dropdown {
  width: 100%;
  height: 100%;
  z-index: 2;
  box-sizing: border-box;
}
.el-dropdown-link {
  display: block;
  cursor: pointer;
  color: #f7f1e3;
  font-weight: 600;
}
.el-dropdown:hover {
  transition: 0.3s;
  border-bottom: 3px solid #ffd04b;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.headernav_menu_ul {
  display: inline-block;
  height: 100%;
}
.headernav_menu_ul_li {
  float: left;
  margin-right: 20px;
  padding: 0 10px;
  width: 100px;
  min-width: 90px;
  list-style: none;
  color: #2d3436;
  text-align: center;
  box-sizing: border-box;
}
.headernav_body {
  display: flex;
  overflow: hidden;
}
.headernav_title {
  text-align: center;
  font-size: 20px;
  font-family: Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB,
    "\5B8B\4F53", sans-serif;
  font-weight: 700;
  min-width: 200px;
  color: #2d3436;
}

.headernav_menu {
  text-align: left;
  flex-grow: 1;
  padding-left: 100px;
  box-sizing: border-box;
}
.headernav_body,
.header_logo {
  width: 100%;
  height: 100%;
}
.headernav_ShowUserMsg_ul {
  height: 100%;
  float: right;
  list-style: none;
  margin-right: 20px;
  width: 600px;
  display: flex;
}
.headernav_ShowUserMsg_li {
  height: 100%;
  color: #2d3436;
  text-align: center;
  box-sizing: border-box;
  font-size: 14px;
}
.headernav_ShowUserMsg_li:nth-of-type(1) {
  width: 300px;
  font-weight: 600;
}
.headernav_ShowUserMsg_li:nth-of-type(2),
.headernav_ShowUserMsg_li:nth-of-type(3),
.headernav_ShowUserMsg_li:nth-of-type(4) {
  flex: 1;
  font-size: 20px;
  cursor: pointer;
}
.exiticon {
  transform: rotate(-90deg);
}
</style>
