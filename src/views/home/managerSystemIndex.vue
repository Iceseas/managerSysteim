<template>
  <div class="layout">
    <Layout>
      <Header :style="{ background:'#fff',borderBottom: '1px solid #eee' }">
        <headerNav></headerNav>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{ background: '#fff' }">
          <asideNav></asideNav>
        </Sider>
        <Layout :style="{ padding: '0 24px 24px', minWidth: '1200px',overflowY: 'scroll',height:contentHeight +'px'  }">
          <Breadcrumb :style="{ margin: '24px 0'}">
            <BreadcrumbItem :to="path(index)" v-for="(item, index) in $route.meta.name" :key="index">{{item}}</BreadcrumbItem>
          </Breadcrumb>
          <Content
            :style="{ minHeight: '280px' }"
          >
          <!-- <keep-alive> -->
            <router-view class="animate__animated animate__fadeIn" ></router-view>
          <!-- </keep-alive> -->
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import headerNav from "@/components/nav/headernav";
import asideNav from "@/components/nav/asideNav";
export default {
  data() {
    return {
      contentHeight: 0
    };
  },
  components: {
    headerNav: headerNav,
    asideNav: asideNav,
  },
  mounted() {
    window.onresize = () => {
      this.$nextTick(() => {
        this.contentHeight = document.body.clientHeight - 65;
      });
    };
    this.$nextTick(() => {
      this.contentHeight = document.body.clientHeight - 65;
    });
  },
  methods: {},
  computed:{
    path(){
      return function(index) {
        return this.$route.meta.path[index]
      }
    }
  },
};
</script>

<style>
.clickdiv {
  width: 50px;
  height: 50px;
  background: burlywood;
}
.layout {
  background: #f5f7f9;
  position: relative;
  height: 915px;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
>>>.ivu-layout-header {
  background: #17233d;
}
</style>
