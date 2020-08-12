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
          <el-button type="primary">添加用户</el-button>
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
          <Avatar :src="row.userimg" />
        </template>
        <template slot-scope="{ row }" slot="gender">
          <Tag v-if="row.gender==='男'" size="large" color="geekblue">男</Tag>
          <Tag v-else size="large" color="magenta">女</Tag>
        </template>
        <template slot-scope="{ row }" slot="status">
          <Tag v-if="row.status==='1'" color="green"  size="large">启用</Tag>
          <Tag v-else color="red"  size="large">禁用</Tag>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button class="marginR10" type="info" >编辑</Button>
          <Button class="marginR10" type="error" >禁用</Button>
          <Button type="success" >密码重置</Button>
        </template>
      </Table>
    </div>
    <Page :total="40" show-elevator show-sizer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      FormData: {
        data: {
          userCountName: "",
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
        tableData: [
          {
            discount:'iceseasyh',
            userimg:'https://i.loli.net/2017/08/21/599a521472424.jpg',
            userName:'icesea',
            gender:'男',
            userGrade:'16-软件工程',
            userClass:'3班',
            userRole:'老师',
            telephone:'',
            status:'1'
          },
          {
            discount:'icesea',
            userimg:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2076373339,2173673275&fm=26&gp=0.jpg',
            userName:'ice',
            gender:'女',
            userGrade:'16-软件工程',
            userClass:'3班',
            userRole:'老师',
            telephone:'',
            status:'1'
          }
        ],
      },
    };
  },
};
</script>

<style>
.marginR10{
  margin-right: 10px;
}
</style>
