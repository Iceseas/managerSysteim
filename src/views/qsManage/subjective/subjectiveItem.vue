<template>
  <div class="showTable_box">
    <div class="Icontainer" style="display: flex;flex-direction: column;">
      <div class="IcontainerTopRow">
        <div class="IcontainerTopTitle">查询列表</div>
        <div class="IcontainerTopBtns">
          <Button class="marginR10" type="primary">查询</Button>
          <Button type="primary">重置</Button>
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
              <FormItem label="姓名">
                <Input
                  v-model="FormData.data.stuName"
                  placeholder="请输入"
                ></Input>
              </FormItem>
            </Col>
            <Col :span="6">
              <FormItem label="学号">
                <Input
                  v-model="FormData.data.stuID"
                  placeholder="请输入"
                ></Input>
              </FormItem>
            </Col>
            <Col :span="6">
              <FormItem label="专业">
                <Input
                  v-model="FormData.data.stuClass"
                  placeholder="请输入"
                ></Input>
              </FormItem>
            </Col>
            <Col :span="6">
              <FormItem label="作业名">
                <Input
                  v-model="FormData.data.problem_Title"
                  placeholder="请输入"
                ></Input>
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
        </div>
      </div>
      <Table :height="table.height" stripe border :columns="table.columns" :loading="table.loading" :data="table.tableData">
        <template slot-scope="{ row, index }" slot="difficulty">
          <Tag v-if="row.difficulty==='简单'" size="large" color="green">简单</Tag>
          <Tag v-else-if="row.difficulty==='较难'" size="large" color="gold">较难</Tag>
          <Tag v-else size="large" color="red">困难</Tag>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button class="marginR10" type="info">查看</Button>
          <Button type="success" @click="addNewQuestion(row)">批改</Button>
        </template>
      </Table>
    </div>
    <Page
      :total="table.total"
      :current="table.page"
      :page-size="table.pageSize"
      show-total
      show-elevator
      show-sizer
      @on-change="pageChange"
      @on-page-size-change="pageSizeChange"
    />
    <markSubjective ref="markSubjective" @callBack="handleQsCallBack" />
  </div>
</template>

<script>
import markSubjective from "./common/markSubjective";
import { questionApi } from "@/api/api";
export default {
  data() {
    return {
      // 查询条件
      FormData: {
        data: {
          stuName: "",
          stuID: "",
          stuClass: "",
          problem_Title: "",
        },
        rules: {},
      },
      table: {
        total: 0,
        pageSize: 20,
        loading: false,
        page: 1,
        height: "545",
        columns: [
          {
            title: "序号",
            type: "index",
            width: 80,
            align: "center",
          },
          {
            title: "专业",
            align: "center",
            tooltip: true,
            key: "stuClass",
          },
          {
            title: "学号",
            tooltip: true,
            align: "center",
            width:'200',
            key: "stuID",
          },
          {
            title: "姓名",
            align: "center",
            width:'200',
            tooltip: true,
            key: "stuName",
          },
          {
            title: "提交时间",
            align: "center",
            tooltip: true,
            width:'300',
            key: "submitTime",
          },
          {
            title: "作业",
            align: "center",
            width:'300',
            tooltip: true,
            key: "problem_Title",
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
  methods: {
    addNewQuestion(row) {
      this.$refs.markSubjective.init("add", row);
    },
    handleQsCallBack(obj, type) {
      this.table.loading = true;
      questionApi
        .addVacancyData(obj)
        .then((res) => {
          this.Message("success", res.data.msg);
          this.getList();
          this.table.loading = false;
        })
        .catch((err) => {
          this.Message("error", err.data.msg);
          this.getList();
          this.table.loading = false;
        });
    },
    // pageSize改变
    pageSizeChange(value) {
      this.table.pageSize = value;
      this.getList();
    },
    // page改变
    pageChange(value) {
      this.table.page = value;
      this.getList();
    },
    // 查询列表数据
    getList() {
      this.table.loading = true;
      questionApi
        .getSubjectiveList({
          pageSize: this.table.pageSize,
          page: this.table.page,
        })
        .then((res) => {
          this.table.tableData = res.data.info.list;
          this.table.total = res.data.info.count;
          this.table.loading = false;
        })
        .catch((err) => {
          this.Message("error", err.data.msg);
          this.table.loading = false;
        });
    },
    // 封装消息提示
    Message(type, content, duration, closable) {
      let msDuration, msClosable;
      if (duration === null || duration === undefined || duration === "") {
        msDuration = 1.5;
      } else {
        msDuration = duration;
      }
      if (closable === null || closable === undefined || closable === "") {
        msClosable = false;
      } else {
        msClosable = closable;
      }
      this.$Message.destroy();
      this.$Message[type]({
        content,
        duration: msDuration,
        closable: msClosable,
      });
    },
  },
  components: {
    markSubjective,
  },
};
</script>

<style scoped>
</style>
