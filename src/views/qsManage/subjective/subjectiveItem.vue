<template>
  <div class="showTable_box">
    <div class="Icontainer" style="display: flex;flex-direction: column;">
      <div class="IcontainerTopRow">
        <div class="IcontainerTopTitle">查询列表</div>
        <div class="IcontainerTopBtns">
          <Button class="marginR10" type="primary" @click="searchFn">查询</Button>
          <Button type="primary" @click="resetFn">重置</Button>
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
              <FormItem label="模糊搜索" prop="kw">
                <Input
                  v-model="FormData.data.kw"
                  placeholder="请输入名称/姓名/学号/日期"
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
      :current="FormData.data.page"
      :page-size="FormData.data.pageSize"
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
          kw: "",
          pageSize: 20,
          page: 1,
        },
        rules: {},
      },
      table: {
        total: 0,
        loading: false,
        height: "515",
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
      questionApi
          .getSubjectiveData({
            _id: row._id
          })
          .then((res) => {
            this.Message("success", res.data.msg);
            this.$refs.markSubjective.init("add", res.data.data[0]);
          })
          .catch((err) => {
            this.Message("error", err.data.msg);
          });
    },
    searchFn() {
      this.FormData.data.page = 1;
      this.getList()
    },
    handleQsCallBack(obj, type) {
      this.table.loading = true;
      questionApi
        .updateSubjectiveList({
          _id: obj._id,
          grade: obj.grade,
          problem_Title: obj.problem_Title,
          problemsAnswer: obj.problemsAnswer,
          remark: obj.remark,
          stuClass: obj.stuClass,
          stuID: obj.stuID,
          stuName: obj.stuName,
          submitTime: obj.submitTime,
        })
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
    // 重置搜索
    resetFn() {
      this.$refs.formList.resetFields()
    },
    // pageSize改变
    pageSizeChange(value) {
      this.FormData.data.pageSize = value;
      this.getList();
    },
    // page改变
    pageChange(value) {
      this.FormData.data.page = value;
      this.getList();
    },
    // 查询列表数据
    getList() {
      this.table.loading = true;
      questionApi
        .getSubjectiveList(this.FormData.data)
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
