<template>
  <div class="showTable_box">
    <div class="Icontainer" style="display: flex;flex-direction: column;">
      <div class="IcontainerTopRow">
        <div class="IcontainerTopTitle">查询列表</div>
        <div class="IcontainerTopBtns">
          <Button class="marginR10" type="primary">查询</Button>
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
              <FormItem label="章节" prop="chapter">
                <Select v-model="FormData.data.chapter" filterable placeholder="请选择">
                  <Option
                    v-for="item in chapterList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></Option>
                </Select>
              </FormItem>
            </Col>
            <Col :span="6">
              <FormItem label="难度" prop="difficulty">
                <Select v-model="FormData.data.difficulty" filterable placeholder="请选择">
                  <Option key="1" label="简单" value="1"></Option>
                  <Option key="2" label="较难" value="2"></Option>
                  <Option key="3" label="困难" value="3"></Option>
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
          <Button class="marginR10" type="primary" @click="addNewQuestion()">添加</Button>
          <Button type="error" @click="delDatas">批量删除</Button>
        </div>
      </div>
      <Table
        :height="table.height"
        stripe
        border
        :columns="table.columns"
        @on-selection-change="handleSelect"
        :loading="table.loading"
        :data="table.tableData"
      >
        <template slot-scope="{ row, index }" slot="difficulty">
          <Tag v-if="row.difficulty==='简单'" size="large" color="green">简单</Tag>
          <Tag v-else-if="row.difficulty==='较难'" size="large" color="gold">较难</Tag>
          <Tag v-else size="large" color="red">困难</Tag>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button class="marginR10" type="info" @click="showFn(row)">查看</Button>
          <Button class="marginR10" type="success" @click="editFn(row)">修改</Button>
          <Button type="error" @click="delFn(row)">删除</Button>
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
    <decideQsForm ref="decideQsForm" @callBack="handleQsCallBack" />
  </div>
</template>

<script>
import decideQsForm from "./decide/decideQsForm";
import { questionApi } from "@/api/api";
export default {
  data() {
    return {
      // 查询条件
      FormData: {
        data: {
          chapter: "",
          difficulty: "",
        },
        rules: {},
      },
      ids: "",
      table: {
        total: 0,
        pageSize: 20,
        loading: false,
        page: 1,
        height: "545",
        columns: [
          {
            type: "selection",
            width: 60,
            align: "center",
          },
          {
            title: "序号",
            type: "index",
            width: 80,
            align: "center",
          },
          {
            title: "问题",
            align: "center",
            tooltip: true,
            key: "Question",
          },
          {
            title: "选项1",
            align: "center",
            width: "80",
            key: "Item1",
          },
          {
            title: "选项2",
            align: "center",
            width: "80",
            key: "Item2",
          },
          {
            title: "知识点",
            align: "center",
            width: "200",
            key: "KN",
          },
          {
            title: "章节",
            align: "center",
            tooltip: true,
            width: "100",
            key: "Chapter",
          },
          {
            title: "难度",
            align: "center",
            width: "100",
            slot: "difficulty",
            tooltip: true,
            key: "difficulty",
          },
          {
            title: "答案",
            align: "center",
            width: "100",
            tooltip: true,
            key: "Answer",
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
      selectionItems: [],
      // 章节
      chapterList: [
        {
          key: "Ch1",
          value: "Ch1",
          label: "第一章",
        },
        {
          key: "Ch2",
          value: "Ch2",
          label: "第二章",
        },
        {
          key: "Ch3",
          value: "Ch3",
          label: "第三章",
        },
        {
          key: "Ch4",
          value: "Ch4",
          label: "第四章",
        },
        {
          key: "Ch5",
          value: "Ch5",
          label: "第五章",
        },
        {
          key: "Ch6",
          value: "Ch6",
          label: "第六章",
        },
        {
          key: "Ch7",
          value: "Ch7",
          label: "第七章",
        },
        {
          key: "Ch8",
          value: "Ch8",
          label: "第八章",
        },
        {
          key: "Ch9",
          value: "Ch9",
          label: "第九章",
        },
        {
          key: "Ch10",
          value: "Ch10",
          label: "第十章",
        },
        {
          key: "Ch11",
          value: "Ch11",
          label: "第十一章",
        },
      ],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    addNewQuestion() {
      this.$refs.decideQsForm.init("add", {});
    },
    // 查看
    showFn(row) {
      questionApi
          .getDecideData({
            _id: row._id
          })
          .then((res) => {
            this.Message("success", res.data.msg);
            this.$refs.decideQsForm.init("show", res.data.data[0]);
          })
          .catch((err) => {
            this.Message("error", err.data.msg);
          });
    },
    // 重置搜索
    resetFn() {
      this.$refs.formList.resetFields()
    },
    // 修改
    editFn(row) {
      questionApi
          .getDecideData({
            _id: row._id
          })
          .then((res) => {
            this.Message("success", res.data.msg);
            this.$refs.decideQsForm.init("edit", res.data.data[0]);
          })
          .catch((err) => {
            this.Message("error", err.data.msg);
          });
    },
    handleQsCallBack(obj, type) {
      if (type === "add") {
        this.table.loading = true;
        questionApi
          .addDecideData({
            Question: obj.Question,
            Item1: obj.Item1,
            Item2: obj.Item2,
            KN: obj.KN,
            Chapter: obj.Chapter,
            difficulty: obj.difficulty,
            Answer: obj.Answer,
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
      } else if (type === 'edit') {
        this.table.loading = true;
        questionApi
          .updateDecideList({
            _id: obj._id,
            Question: obj.Question,
            Item1: obj.Item1,
            Item2: obj.Item2,
            KN: obj.KN,
            Chapter: obj.Chapter,
            difficulty: obj.difficulty,
            Answer: obj.Answer,
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
      }
    },
    // 表格选择
    handleSelect(selection) {
      this.selectionItems = selection;
      this.ids = selection
        .map(function (obj, index) {
          return obj._id;
        })
        .join(",");
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
    delDatas() {
      if (this.selectionItems.length === 0) {
        this.Message("warning", "请选择至少一项!");
        return;
      }
      this.$Modal.confirm({
        title: "批量删除",
        content: "<p>确定要删除已选项吗？</p>",
        onOk: () => {
          this.delDatasFnAjax();
        },
        onCancel: () => {
          this.Message("info", "取消删除");
        },
      });
    },
    // 批量删除Ajax
    delDatasFnAjax() {
      questionApi
        .delData({
          ids: this.ids,
          questionType: "decide",
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
    // 单项删除
    delFn(row) {
      this.$Modal.confirm({
        title: "批量删除",
        content: "<p>确定要删除吗？</p>",
        onOk: () => {
          this.delFnAjax(row._id);
        },
        onCancel: () => {
          this.Message("info", "取消删除");
        },
      });
    },
    // 单个删除Ajax
    delFnAjax(_id) {
      questionApi
        .delData({
          ids: _id,
          questionType: "decide",
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
    // 查询列表数据
    getList() {
      this.table.loading = true;
      questionApi
        .getDecideList({
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
    decideQsForm,
  },
};
</script>

<style scoped>
</style>
