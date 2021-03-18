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
      }
    }
  },
  methods:{
    // 入口函数
    init(row){
      // 设置此时点击的用户是谁-方便后期设置权限ajax
      this.userMenuConfig.discount = row.discount;
      // 查找用户对应的菜单配置情况并创建菜单树
      this.showUserMenuAjax();
      // 显示modal
      this.modalData.modalBoolean = true;
    },
    // 查询用户菜单配置情况
    showUserMenuAjax(){
      userPowerApi.showData({
        discount: this.userMenuConfig.discount
      })
      .then((res) => {
        this.treeNodes = res.data.list[0].RoleMenuArr
      })
      .catch(err=>{
        console.log(err)
      })
    },
    // 设置权限
    saveMenuPowerAjax(){
      userPowerApi.saveData({
        discount: this.userMenuConfig.discount,
        RoleMenuArr: this.userMenuConfig.RoleMenuArr
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
      this.modalData.modalBoolean = false;
    },
    submit(){
      // 设置权限
      this.saveMenuPowerAjax();
      this.treeNodes = [];
      this.modalData.modalBoolean = false;
    },
    // 选择的菜单
    checkMenuNodes(arr){
      console.log(arr)
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