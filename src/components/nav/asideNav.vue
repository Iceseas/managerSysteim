<template>
  <div class="asideNav_body">
    <!-- 根据查出来的用户菜单配置系统菜单 -->
    <Menu :active-name="activeName">
      <template v-for="item in this.$store.state.userMenus">
        <MenuGroup :key="item.key" :title="item.title" name="1">
          <template v-for="menuitem in item.children">
            <MenuItem v-if="menuitem.checked == true" :key="menuitem.key" :name="menuitem.pathName" :to="menuitem.path">
              <Icon type="ios-radio-button-on" />{{ menuitem.title }}
            </MenuItem>
          </template>
        </MenuGroup>
      </template>
    </Menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "",
    };
  },
  watch: {
    "$route.name": function () {
      this.activeName = this.$route.name;
    },
  },
  mounted() {
    this.activeName = this.$route.name;
  },
  methods: {

  },
};
</script>

<style scoped>
.asideNav_body {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  text-align: left;
  overflow: hidden;
}
>>> .ivu-menu {
  height: 100%;
}
</style>
