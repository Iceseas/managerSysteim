<template>
  <Modal v-model="modalData.modalBoolean" width="660">
    <div slot="header">
      <Icon type="ios-information-circle"></Icon>
      <span style="font-size:20px">{{modalData.title}}</span>
    </div>
    <div>
      <Form :label-colon="true" :model="FormData.data" ref="formList" :rules="FormData.rules" :label-width="80">
        <FormItem label="评分">
          <Slider style="width:95%" v-model="FormData.data.grade" show-input></Slider>
        </FormItem>
        <FormItem label="评语" >
          <Input style="width:95%" type="textarea" autosize v-model="FormData.data.remark" placeholder="请输入"></Input>
        </FormItem>
        <FormItem :label="`第${index+1}题`"  v-for="(item, index) in FormData.data.problemsAnswer" :key="index">
          <Input style="width:95%" type="textarea" autosize v-model="FormData.data.problemsAnswer[index]"></Input>
          <Row>
        <Col span="8" offset="19"><Button type="text">添加备注</Button></Col>
        </Row>
        </FormItem>
      </Form>
    </div>
    <div slot="footer">
      <Button size="large" @click="closeModal">取消</Button>
      <Button type="primary" size="large" @click="submitFn">确定</Button>
    </div>
  </Modal>
</template>

<script>
export default {
  data() {
    return{
      modalData:{
        title:'主观题评分',
        modalBoolean: false
      },
      nowType: '',
      FormData:{
        rules:{},
        data:{}
      }
    }
  },
  methods:{
    init(data) {
      this.FormData.data = data;
      this.modalData.modalBoolean = true
    },
    closeModal() {
      this.modalData.modalBoolean = false
    },
    submitFn() {
      this.$emit('callBack', this.FormData.data)
      this.FormData.data = {};
      this.modalData.modalBoolean = false
    }
  }
}
</script>
