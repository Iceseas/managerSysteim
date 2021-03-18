import Vue from "vue";
import Vuex from "vuex";
import { systemApi } from '@/api/system/systemApi'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    systemMenus:[],
    userMenus:[]
  },
  mutations: {
    setUserMenus(state, loop) {
      state.userMenus = loop;
    }
  },
  actions: {
    // 查询系统所有菜单
    showSystemMenu(store){
      systemApi.getMenu()
      .then(res=>{
        store.state.systemMenus = res.data.list[0].RoleMenuArr
      })
      .catch(err=>{
        console.log('错误:',err)
      })
    },
  },
  plugins: [],
});
