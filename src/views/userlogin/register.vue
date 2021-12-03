<template>
  <div class="login_body notToSwitchDark">
    <transition name="showlogin">
      <div class="middlelogin_body">
        <div class="middlelogin_body_left">
          <div class="login_title_positon">
            <p class="login_title">欢迎使用</p>
            <p class="login_title">IceseaMini小程序后台管理平台</p>
          </div>
        </div>
        <div class="middlelogin_body_right login_item">
          <Row>
            <Col :span="24">
              <Form ref="form" label-colon :model="formData.list" :rules="formData.rules">
                <Row :gutter="10">
                  <Col :span="12">
                    <FormItem label="用户名" prop="discount">
                      <Input
                        type="text"
                        v-model="formData.list.discount"
                        placeholder="discount"
                        @on-blur="handleCheckDiscount"
                      >
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                      </Input> </FormItem
                  ></Col>
                  <Col :span="12">
                    <FormItem label="密码" prop="password">
                      <Input
                        type="password"
                        v-model="formData.list.password"
                        placeholder="Password"
                      >
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                      </Input> </FormItem
                  ></Col>
                </Row>
                <Row :gutter="10">
                  <Col :span="12">
                    <FormItem label="姓名" prop="userName">
                      <Input
                        type="text"
                        v-model="formData.list.userName"
                        placeholder="name"
                      >
                        <Icon type="ios-body-outline" slot="prepend" />
                      </Input> </FormItem
                  ></Col>
                  <Col :span="12">
                    <FormItem label="电话" prop="telephone">
                      <Input
                        type="text"
                        v-model="formData.list.telephone"
                        placeholder="telephone"
                      >
                        <Icon type="ios-call-outline" slot="prepend" />
                      </Input> </FormItem
                  ></Col>
                </Row>
                <Row :gutter="10">
                  <Col :span="12">
                    <FormItem label="性别" prop="gender">
                      <Select v-model="formData.list.gender">
                        <Option
                          v-for="item in genderList"
                          :value="item.value"
                          :key="item.value"
                          >{{ item.label }}</Option
                        >
                      </Select></FormItem
                    ></Col
                  >
                  <Col :span="12">
                    <FormItem label="角色" prop="userRole">
                      <Select v-model="formData.list.userRole">
                        <Option
                          v-for="item in roleList"
                          :value="item.value"
                          :key="item.value"
                          >{{ item.label }}</Option
                        >
                      </Select></FormItem
                    ></Col
                  >
                </Row>
                <Row :gutter="10">
                  <Col :span="12">
                    <FormItem label="年级" prop="userGrade">
                      <Input
                        type="text"
                        v-model="formData.list.userGrade"
                        placeholder="userGrade"
                      >
                        <Icon type="ios-easel-outline" slot="prepend" />
                      </Input> </FormItem
                  ></Col>
                  <Col :span="12">
                    <FormItem label="班级" prop="userClass">
                      <Input
                        type="text"
                        v-model="formData.list.userClass"
                        placeholder="userClass"
                      >
                        <Icon type="ios-ionitron-outline" slot="prepend" />
                      </Input> </FormItem
                  ></Col>
                </Row>
                <Row :gutter="10">
                  <Col :span="12">
                    <FormItem label="学号" prop="stuID">
                      <Input
                        type="text"
                        v-model="formData.list.stuID"
                        placeholder="stuID"
                      >
                        <Icon type="ios-school-outline" slot="prepend" />
                      </Input> </FormItem
                  ></Col>
                  <Col :span="12">
                    <FormItem label="专业" prop="major">
                      <Input
                        type="text"
                        v-model="formData.list.major"
                        placeholder="major"
                      >
                        <Icon type="ios-stopwatch-outline" slot="prepend" />
                      </Input> </FormItem
                  ></Col>
                </Row>
              </Form>
            </Col>
          </Row>

          <button class="login_button" @click="handleRegister">
            <i class="el-icon-switch-button button_icon"></i>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { UserApi, userPowerApi } from "@/api/api";
export default {
  data() {
    return {
      isRegister: false,
      formData: {
        list: {
          userName: "",
          discount: "",
          password: "",
          telephone: "",
          gender: "",
          userRole: "",
          userGrade: "",
          userClass: "",
          stuID: "",
          major: "",
        },
        rules: {
          userName: [
            {
              required: true,
              message: "The name cannot be empty",
              trigger: "blur",
            },
          ],
          discount: [
            {
              required: true,
              message: "The name cannot be empty",
              trigger: "blur",
            },
          ],
          password: [
            {
              required: true,
              message: "The name cannot be empty",
              trigger: "blur",
            },
          ],
          telephone: [
            {
              required: true,
              message: "The name cannot be empty",
              trigger: "blur",
            },
          ],
          gender: [
            {
              required: true,
              message: "The name cannot be empty",
              trigger: "change",
            },
          ],
          userRole: [
            {
              required: true,
              message: "The name cannot be empty",
              trigger: "change",
            },
          ],
          userGrade: [
            {
              required: true,
              message: "The name cannot be empty",
              trigger: "blur",
            },
          ],
          userClass: [
            {
              required: true,
              message: "The name cannot be empty",
              trigger: "blur",
            },
          ],
          stuID: [
            {
              required: true,
              message: "The name cannot be empty",
              trigger: "blur",
            },
          ],
          major: [
            {
              required: true,
              message: "The name cannot be empty",
              trigger: "blur",
            },
          ],
        },
      },
      genderList: [
        {
          value: "1",
          label: "男",
        },
        {
          value: "0",
          label: "女",
        },
      ],
      roleList: [
        {
          value: "1",
          label: "老师",
        },
        {
          value: "0",
          label: "学生",
        },
      ],
    };
  },
  methods: {
    handleRegister() {
      this.isRegister = true;
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.formData.list.password = this.$md5(this.formData.list.password)
          UserApi.register({
            userData: this.formData.list
          })
          .then(res=>{
            this.$Message.success(res.data.msg);
            return userPowerApi.addData({
              discount: this.formData.list.discount,
              userName: this.formData.list.userName
            })
          })
          .then(res=>{
            console.log(res)
            this.$router.replace('/login');
          })
          .catch(err=>{
            this.$Message.error(err.data.msg);
          })
        } else {
          this.isRegister = false;
          this.$Message.error("请填写完合法的数据");
        }
      });
    },
    handleCheckDiscount() {
      if (this.formData.list.discount.length > 0 && this.isRegister == false) {
        UserApi.checkdiscount({
          discount: this.formData.list.discount,
        })
          .then((res) => {
            if (res.data.err != 0) {
              this.$Message.error("该用户名已被注册，请重新输入！");
              this.formData.list.discount = "";
            } else {
              this.$Message.success("该用户名未被注册，可以使用！");
            }
          })
          .catch((err) => {
            this.$Message.error(err.data.msg);
          });
      }
    },
  },
};
</script>

<style scoped>
.login_body {
  background: url(http://localhost:3000/static/img/background.jpg) no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  overflow: hidden;
  padding: 10% 20%;
  box-sizing: border-box;
  position: relative;
}
.middlelogin_body {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  min-width: 1000px;
  min-height: 560px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px #222;
  box-sizing: border-box;
}
.middlelogin_body_left,
.middlelogin_body_right {
  width: 50%;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
}
.middlelogin_body_left {
  background: rgba(31, 35, 34, 0.7);
  position: relative;
}
.login_title_positon {
  width: 400px;
  height: 400px;
  position: absolute;
  padding: 100px 0;
  left: 5%;
  top: 50%;
  transform: translateY(-50%);
  box-sizing: border-box;
}
.middlelogin_body_right {
  background: rgba(31, 35, 34, 0.7);
  padding: 30px 10px;
  box-sizing: border-box;
  position: relative;
}
.closelogin {
  top: 10px;
  right: 10px;
  position: absolute;
  height: 40px;
  width: 40px;
  text-align: center;
  cursor: pointer;
  box-sizing: border-box;
}
.closelogin i {
  font-size: 40px;
  color: #f7f1e3;
  opacity: 0.9;
}
.closelogin i:hover {
  color: #fff;
  transition: 0.5s;
  transform: scale(1.1);
}
.user_img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
  width: 200px;
  height: 200px;
  opacity: 0.5;
  cursor: pointer;
  border-radius: 100%;
  background: #eee;
  text-align: center;
  line-height: 260px;
}
.user_img:hover {
  opacity: 0.8;
  transition: 1s;
}
.user_img > img {
  width: 100%;
  height: 100%;
  box-shadow: 0 0 10px #212121;
  border-radius: 100%;
}
.user_img > i {
  font-size: 100px;
  color: rgb(112, 110, 110);
}
.deleteloginimg-enter-active,
.deleteloginimg-leave-active {
  transition: opacity 0.2s;
}
.deleteloginimg-enter,
.deleteloginimg-leave-to {
  opacity: 0;
}
.showlogin-enter-active,
.showlogin-leave-active {
  transition: opacity 1s;
}
.showlogin-enter,
.showlogin-leave-to {
  opacity: 0;
}
.login_title {
  font-size: 20px;
  color: rgba(247, 241, 227, 1);
  font-weight: 600;
  text-shadow: 0 0 20px #000;
  opacity: 0.9;
}
.login_title:nth-of-type(1) {
  font-size: 40px;
  margin-bottom: 20px;
}
.login_title:nth-of-type(2) {
  font-weight: 600;
}
.login_username,
.login_password {
  box-sizing: border-box;
  height: 40px;
}
.login_username,
.login_password i {
  font-size: 20px;
  color: #f7f1e3;
  opacity: 0.9;
  text-shadow: 0 0 20px #000;
}
.login_username_input,
.login_password_input {
  min-width: 250px;
  border-radius: 10px;
  box-shadow: 0 0 3px #2a3535;
  background: rgba(44, 52, 60, 0.9);
  color: #f7f1e3;
  outline: none;
  border: none;
  padding-left: 10px;
  height: 100%;
  margin-left: 20px;
  opacity: 0.9;
  font-size: 12px;
}

input::-webkit-input-placeholder {
  color: #f7f1e3;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #f7f1e3;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #f7f1e3;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #f7f1e3;
}
.login_username_input:focus,
.login_password_input:focus {
  opacity: 1;
}
.login_username_lable,
.login_password_lable {
  color: #f7f1e3;
  text-shadow: 0 0 20px #000;
  line-height: 30px;
  font-weight: 600;
  height: 30px;
  display: block;
  font-size: 16px;
  opacity: 0.9;
}
.login_password_lable {
  margin-top: 20px;
}
.login_isremember {
  margin-top: 30px;
  color: #f7f1e3;
  font-size: 14px;
  font-weight: 600;
  font-family: Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB,
    "\5B8B\4F53", sans-serif;
  text-shadow: 0 0 20px #000;
  opacity: 0.9;
}
.login_button_body {
  min-width: 200px;
}
.login_button {
  display: inline-block;
  width: 60px;
  height: 60px;
  outline: none;
  border: none;
  border-radius: 100%;
  background: rgba(31, 35, 34, 0.5);
  cursor: pointer;
  box-sizing: border-box;
}
.button_icon {
  font-size: 50px;
  color: #f7f1e3;
  text-shadow: 0 0 20px #000;
  opacity: 0.9;
}
.button_icon:hover {
  color: #fff;
  opacity: 1;
  transform: scale(1.1);
  transition: 1s;
}
.button_icon:active {
  color: #fff;
  transform: scale(1.1);
  transition: 1s;
}
::v-deep .ivu-form .ivu-form-item-label {
  color: #fff;
}
</style>