<template>
  <div>
    <div class="Icontainer" style="display: flex; flex-direction: column">
      <div class="IcontainerTopRow">
        <div class="IcontainerTopTitle">查询列表</div>
        <div class="IcontainerTopBtns">
          <Button class="marginR10" type="primary" @click="searchFn"
            >查询</Button
          >
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
              <FormItem label="模糊搜索" prop="kw">
                <Input
                  clearable
                  v-model="FormData.data.kw"
                  placeholder="用户名/姓名/角色"
                />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
    <div class="Icontainer">
      <div class="IcontainerTopRow">
        <div class="IcontainerTopTitle">数据列表</div>
      </div>
      <Table
        :height="table.height"
        stripe
        border
        :loadin="table.loading"
        :columns="table.columns"
        :data="table.tableData"
      >
        <template slot-scope="{ row }" slot="userimg">
          <Avatar v-if="row.userimg.length > 1" :src="row.userimg" />
          <Avatar v-else icon="ios-person" />
        </template>
        <template slot-scope="{ row }" slot="userRole">
          <Tag v-if="row.userRole === '1'" color="cyan" size="large">老师</Tag>
          <Tag
            v-else-if="row.userRole === 'admin'"
            color="geekblue"
            size="large"
            >超管</Tag
          >
          <Tag v-else color="purple" size="large">学生</Tag>
        </template>
        <template slot-scope="{ row }" slot="status">
          <Tag v-if="row.status === '1'" color="green" size="large">启用</Tag>
          <Tag v-else color="red" size="large">禁用</Tag>
        </template>
        <template slot-scope="{ row }" slot="action">
          <Button
            class="marginR10"
            type="info"
            @click="openMenuControlModal(row)"
            >菜单权限</Button
          >
          <Button class="marginR10" type="error">按钮权限</Button>
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
    <menuControlModal ref="menuControlModal"></menuControlModal>
  </div>
</template>

<script>
import { managerApi } from "@/api/api";
import menuControlModal from "./powerControl/menuControl";

export default {
  components: {
    menuControlModal,
  },
  data() {
    return {
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
        pageSize: 20,
        page: 1,
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
            slot: "userRole",
            key: "userRole",
          },
          {
            title: "状态",
            align: "center",
            slot: "status",
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
  methods: {
    getList() {
      this.FormData.data.pageSize = this.table.pageSize;
      this.FormData.data.page = this.table.page;
      this.table.loading = true;
      managerApi
        .getList(this.FormData.data)
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
    // 菜单配置
    openMenuControlModal(row) {
      this.$refs.menuControlModal.init(row);
    },
    // 查询fn
    searchFn() {
      this.table.page = 1;
      this.getList();
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
};
</script>

<style scoped>
</style>