<template>
  <div>
    <div class="Icontainer" style="display: flex;flex-direction: column;">
      <div class="IcontainerTopRow">
        <div class="IcontainerTopTitle">查询列表</div>
        <div class="IcontainerTopBtns">
          <el-button type="primary">查询</el-button>
          <el-button type="primary">重置</el-button>
        </div>
      </div>
      <div class="searchFormBody">
        <Form
          :label-colon="true"
          :model="FormData.data"
          ref="formList"
          :rules="FormData.rules"
          :label-width="100"
        >
          <Row>
            <Col :span="6">
              <FormItem label="用户名">
                <Input
                  v-model="FormData.data.userCountName"
                  placeholder="请输入"
                ></Input>
              </FormItem>
            </Col>
            <Col :span="6">
              <FormItem label="姓名">
                <Input
                  v-model="FormData.data.userName"
                  placeholder="请输入"
                ></Input>
              </FormItem>
            </Col>
            <Col :span="6">
              <FormItem label="性别">
                <Select v-model="FormData.data.gender">
                  <Option value="男">男</Option>
                  <Option value="女">女</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
    <div class="Icontainer">
      <div class="IcontainerTopRow">
        <div class="IcontainerTopTitle">数据列表</div>
        <div class="IcontainerTopBtns">
          <el-button type="primary" @click="openUserFrom">添加用户</el-button>
        </div>
      </div>
      <Table
        :height="table.height"
        stripe
        border
        :columns="table.columns"
        :data="table.tableData"
      >
        <template slot-scope="{ row }" slot="userimg">
          <Avatar v-if="row.userimg.length>1" :src="row.userimg" />
          <Avatar v-else icon="ios-person" />
        </template>
        <template slot-scope="{ row }" slot="gender">
          <Tag v-if="row.gender===1" size="large" color="geekblue">男</Tag>
          <Tag v-else size="large" color="magenta">女</Tag>
        </template>
        <template slot-scope="{ row, index }" slot="userRole">
          <Tag v-if="row.userRole==='1'" color="cyan"  size="large">老师</Tag>
          <Tag v-else color="purple"  size="large">学生</Tag>
        </template>
        <template slot-scope="{ row }" slot="status">
          <Tag v-if="row.status==='1'" color="green"  size="large">启用</Tag>
          <Tag v-else color="red"  size="large">禁用</Tag>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button class="marginR10" type="info" @click="editFn(row)">编辑</Button>
          <Button class="marginR10" type="error" >禁用</Button>
          <Button type="success" >密码重置</Button>
        </template>
      </Table>
    </div>
    <Page :total="40" show-elevator show-sizer />
    <openUserFrom ref="openUserFrom" @callBack="handleAddNewUser" />
  </div>
</template>

<script>
import axios from 'axios';
import openUserFrom from './userCenter/userFrom'
export default {
  components:{ openUserFrom },
  data() {
    return {
      FormData: {
        data: {
          discount: "",
          userName: "",
          gender:''
        },
        rules: {},
      },
      table: {
        height: "560",
        columns: [
          {
            title:'序号',
            type: "index",
            width: 80,
            align: "center",
          },
          {
            title: "用户名",
            align: "center",
            key: "discount",
          },
          {
            title: "头像",
            align: "center",
            slot: "userimg",
            key: "userimg",
          },
          {
            title: "姓名",
            align: "center",
            key: "userName",
          },
          {
            title: "性别",
            align: "center",
            slot:'gender',
            key: "gender",
          },
          {
            title: "年级",
            align: "center",
            tooltip: true,
            key: "userGrade",
          },
          {
            title: "班级",
            align: "center",
            tooltip: true,
            key: "userClass",
          },
          {
            title: "角色",
            align: "center",
            tooltip: true,
            slot:'userRole',
            key: "userRole",
          },
          {
            title: "手机号",
            align: "center",
            tooltip: true,
            key: "telephone",
          },
          {
            title: "状态",
            align: "center",
            slot:'status',
            tooltip: true,
            key: "status",
          },
          {
            title: "操作",
            slot: "action",
            width: 280,
            align: "center",
          },
        ],
        tableData: [],
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods:{
    openUserFrom() {
      this.$refs.openUserFrom.init('add', '')
    },
    handleAddNewUser(data, type) {
      if(type === 'add') {
        this.addNewUserAjax(data)
      }
    },
    // 编辑人员
    editFn(row) {
      this.$refs.openUserFrom.init('edit', row)
    },
    // 添加人员
    addNewUserAjax(data) {
      this.$Spin.show()
      axios({
        url: "http://localhost:3000/ManagerCount/api/addNewUser",
        method: "POST",
        data: {
          data: data
        },
      }).then(res=>{
        this.getList()
        this.$Spin.hide()
        this.Message('success', res.data.msg)
      }).catch(err=>{
        this.getList()
        this.$Spin.hide()
        this.Message('error', err.data.msg)
      })
    },
    // 查询列表数据
    getList() {
      this.$Spin.show()
      axios({
        url: "http://localhost:3000/ManagerCount/api/getUserList",
        method: "GET",
      }).then(res=>{
        this.table.tableData = res.data.data;
        this.$Spin.hide()
      }).catch(err=>{
        this.$Spin.hide()
        this.Message('error', err.data.msg)
      })
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
  }
};
</script>

<style>
.marginR10{
  margin-right: 10px;
}
</style>
