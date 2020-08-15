<template>
  <Modal v-model="modalData.modalBoolean" width="30%">
    <div slot="header">
      <span style="font-size:20px">{{modalData.title}}</span>
    </div>
    <div>
      <Form
        :label-colon="true"
        :model="FormData.data"
        ref="formList"
        :rules="FormData.rules"
        :label-width="80"
      >
        <Row>
          <Col :span="12">
            <FormItem label="姓名" prop="userName">
              <Input v-model="FormData.data.userName" placeholder="请输入"></Input>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="用户名" prop="discount">
              <Input v-model="FormData.data.discount" placeholder="请输入"></Input>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="密码" prop="password">
              <Input type="password" v-model="FormData.data.password" placeholder="请输入"></Input>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="电话" prop="telephone">
              <Input v-model="FormData.data.telephone" placeholder="请输入"></Input>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="性别" prop="gender">
              <Select v-model="FormData.data.gender">
                <Option value=1 label="男性">
                  <span>男性</span>
                  <span style="float:right;color:#ccc">male</span>
                </Option>
                <Option value=0 label="女性">
                  <span>女性</span>
                  <span style="float:right;color:#ccc">female</span>
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="角色" prop="userRole">
              <Select v-model="FormData.data.userRole">
                <Option value="1" label="老师">
                  <span>老师</span>
                  <span style="float:right;color:#ccc">Teacher</span>
                </Option>
                <Option value="0" label="学生">
                  <span>学生</span>
                  <span style="float:right;color:#ccc">Student</span>
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="年级" prop="userGrade">
              <Input v-model="FormData.data.userGrade" placeholder="请输入"></Input>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="班级" prop="userClass">
              <Input v-model="FormData.data.userClass" placeholder="请输入"></Input>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="头像" prop="userimg">
              <Input v-model="FormData.data.userimg" placeholder="请输入"></Input>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="状态" prop="status">
              <Select v-model="FormData.data.status">
                <Option value="1" label="启用">
                  <span>启用</span>
                  <span style="float:right;color:#ccc">use</span>
                </Option>
                <Option value="0" label="禁用">
                  <span>禁用</span>
                  <span style="float:right;color:#ccc">useless</span>
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="学号" v-if="FormData.data.userRole==0" prop="stuID">
              <Input v-model="FormData.data.stuID" placeholder="请输入"></Input>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="专业" v-if="FormData.data.userRole==0" prop="major">
              <Input v-model="FormData.data.major" placeholder="请输入"></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
    <div slot="footer">
      <Button size="large" @click="closeModal">取消</Button>
      <Button type="primary" size="large" @click="addNewQS">确定</Button>
    </div>
  </Modal>
</template>

<script>
export default {
  data() {
    return {
      modalData: {
        title: "添加用户",
        modalBoolean: false,
      },
      nowType: "",
      rePassword: "",
      FormData: {
        rules: {},
        data: {
          userName: "",
          discount: "",
          password: "",
          telephone: "",
          gender: 0,
          userRole: "1",
          userGrade: "",
          userClass: "",
          userimg: "",
          status: "1",
          stuID: "",
          major: "",
        },
      },
    };
  },
  methods: {
    init(type, data) {
      this.nowType = type;
      if (type === "edit") {
        this.modalData.title = "更新用户信息";
        console.log(data)
        this.FormData.data = data;
      } else if (type === "add") {
        this.$refs.formList.resetFields();
        this.modalData.title = "添加用户";
      } else if (type === "show") {
        this.FormData.data = data;
        this.modalData.title = "查看用户";
      }
      this.modalData.modalBoolean = true;
    },
    closeModal() {
      this.modalData.modalBoolean = false;
    },
    addNewQS() {
      this.$emit("callBack", this.FormData.data, this.nowType);
      this.modalData.modalBoolean = false;
    },
  },
};
</script>

<style scoped>
>>> .ivu-modal-body {
  padding-right: 50px;
}
</style>