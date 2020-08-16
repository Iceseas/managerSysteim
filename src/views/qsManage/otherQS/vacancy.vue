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
              <FormItem label="章节">
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
              <FormItem label="难度">
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
          <Button type="primary" @click="addNewQuestion()">添加</Button>
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
          <Button class="marginR10" type="success">编辑</Button>
          <Button type="error">删除</Button>
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
    <vacancyQsForm ref="vacancyQsForm" @callBack="handleQsCallBack" />
  </div>
</template>

<script>
import vacancyQsForm from "./vacancy/vacancyQsFrom";
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
            title: "问题",
            align: "center",
            tooltip: true,
            key: "Question",
          },
          {
            title: "空位1",
            tooltip: true,
            align: "center",
            width:'100',
            key: "Space1Answer",
          },
          {
            title: "空位2",
            align: "center",
            width:'100',
            tooltip: true,
            key: "Space2Answer",
          },
          {
            title: "空位3",
            align: "center",
            tooltip: true,
            width:'100',
            key: "Space3Answer",
          },
          {
            title: "空位4",
            align: "center",
            width:'100',
            tooltip: true,
            key: "Space4Answer",
          },
          {
            title: "遵循顺序",
            align: "center",
            width:'100',
            key: "Issequence",
          },
          {
            title: "知识点",
            align: "center",
            width:'200',
            tooltip: true,
            key: "KN",
          },
          {
            title: "章节",
            align: "center",
            tooltip: true,
            width:'100',
            key: "Chapter",
          },
          {
            title: "难度",
            align: "center",
            width:'100',
            slot: "difficulty",
            tooltip: true,
            key: "difficulty",
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
      this.$refs.vacancyQsForm.init("add", {});
    },
    handleQsCallBack(obj, type) {
      this.table.loading = true;
      questionApi
        .addVacancyData({
          Question: obj.Question,
          Space1Answer: obj.Space1Answer,
          Space2Answer: obj.Space2Answer,
          Space3Answer: obj.Space3Answer,
          Space4Answer: obj.Space4Answer,
          Issequence: obj.Issequence,
          KN: obj.KN,
          Chapter: obj.Chapter,
          difficulty: obj.difficulty,
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
        .getVacancyList({
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
    vacancyQsForm,
  },
};
</script>

<style scoped>
</style>
