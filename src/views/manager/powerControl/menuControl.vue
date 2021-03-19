<template>
  <Modal v-model="modalData.modalBoolean" width="30%" @on-cancel="cancel">
    <div slot="header">
      <span style="font-size:18px">{{modalData.title}}</span>
    </div>
    <Tree :data="treeNodes" show-checkbox @on-check-change="checkMenuNodes"></Tree>
    <div slot="footer">
      <Button size="large" @click="cancel">取消</Button>
      <Button type="primary" size="large" @click="submit">确定</Button>
    </div>
  </Modal>
</template>

<script>
import { userPowerApi } from '@/api/api'

export default {
  data(){
    return{
      modalData:{
        modalBoolean: false,
        title: '菜单权限配置',
      },
      // 菜单显示的树
      treeNodes:[],
      // userMenuConfig
      userMenuConfig:{
        discount: '',
        RoleMenuArr: null
      },
      // 临时存放用户配置的菜单情况
      cacheTreeNodes: []
    }
  },
  methods:{
    // 入口函数
    init(row){
      // 设置此时点击的用户是谁-方便后期设置权限ajax
      this.userMenuConfig.discount = row.discount;
      // 查找用户对应的菜单配置情况并创建菜单树
      this.showUserMenuAjax(row);
      // 显示modal
      this.modalData.modalBoolean = true;
    },
    // 查询用户菜单配置情况
    showUserMenuAjax(row){
      userPowerApi.showData({
        discount: row.discount
      })
      .then((res) => {
        this.treeNodes = [...res.data.list[0].RoleMenuArr]
      })
      .catch(err=>{
        console.log(err)
      })
    },
    // 设置权限
    saveMenuPowerAjax(){
      // 存放配置的菜单
      let ajaxMenuArr = [];
      // 什么都没有修改的情况下-首页是必须有的项
      if (this.cacheTreeNodes.length === 1) {
        ajaxMenuArr = [{
          "title" : "首页",
          "pathName" : "index",
          "expand" : true,
          "disabled" : true,
          "checked" : false,
          "key" : "title首页pathNameindex",
          "path" : "/Managerindex/index"
        }];
      // 去掉所有菜单的情况下或者是那么都没有修改过的情况下
      } else if(this.cacheTreeNodes.length === 0){
        return;
      } else {
        // 处理配置情况
        for(let i = 0; i < this.cacheTreeNodes.length; i++) {
          if(!this.cacheTreeNodes[i].children){
            ajaxMenuArr.push({  
              "title" : this.cacheTreeNodes[i].title,
              "pathName" : this.cacheTreeNodes[i].pathName,
              "expand" : this.cacheTreeNodes[i].expand,
              "checked" : this.cacheTreeNodes[i].checked,
              "key" : this.cacheTreeNodes[i].key,
              "path" : this.cacheTreeNodes[i].path
            })
          }
        }
      }
      // 设置菜单配置情况ajax
      userPowerApi.saveData({
        discount: this.userMenuConfig.discount,
        userRoleMenuArr: ajaxMenuArr
      })
      .then(res=>{
        this.Message('success', res.data.msg)
      })
      .catch(err=>{
        this.Message('error', err.data.msg)
      })
    },
    cancel(){
      this.treeNodes = [];
      this.cacheTreeNodes = [];
      this.modalData.modalBoolean = false;
    },
    submit(){
      // 设置权限
      this.saveMenuPowerAjax();
      this.treeNodes = [];
      this.cacheTreeNodes = [];
      this.modalData.modalBoolean = false;
    },
    // 选择的菜单
    checkMenuNodes(arr){
      this.cacheTreeNodes = [...arr];
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
    },
  },
  beforeDestroy(){
    this.treeNodes = [];
  }
}
</script>

<style>

</style>