<template>
  <Modal v-model="modalData.modalBoolean" width="660">
    <div slot="header">
      <Icon type="ios-information-circle"></Icon>
      <span style="font-size:20px">{{ modalData.title }}</span>
    </div>
    <div>
      <Form
        :label-colon="true"
        :model="FormData.data"
        ref="formList"
        :rules="FormData.rules"
        :label-width="80"
      >
        <FormItem label="评分">
          <Slider
            style="width:95%"
            v-model="FormData.data.grade"
            show-input
          ></Slider>
        </FormItem>
        <FormItem label="评语">
          <Input
            style="width:95%"
            type="textarea"
            autosize
            v-model="FormData.data.remark"
            placeholder="请输入"
          ></Input>
        </FormItem>
        <Card
          style="width:100%;margin-bottom:10px;background:#f8f8f9"
          v-for="(item, index) in FormData.data.problemsAnswer"
          :key="index"
        >
          <p slot="title">
            <Icon type="md-create"></Icon>
            {{ `第${index + 1}题` }}
          </p>
          <a href="#" slot="extra" @click.prevent="markAnswer(FormData.data.problemsAnswer[index],index)">
            <Icon type="ios-loop-strong"></Icon>
            添加备注
          </a>
          {{ FormData.data.problemsAnswer[index] }}
        </Card>
      </Form>
    </div>
    <div slot="footer">
      <Button size="large" @click="closeModal">取消</Button>
      <Button type="primary" size="large" @click="submitFn">确定</Button>
    </div>
    <editorAnswer ref="editorAnswer" @callBack="handleEditor" />
  </Modal>
</template>

<script>
import editorAnswer from './editorAnswer'
export default {
  components: {
    editorAnswer
  },
  data() {
    return {
      modalData: {
        title: "主观题评分",
        modalBoolean: false,
      },
      nowType: "",
      FormData: {
        rules: {},
        data: {},
      },
    };
  },
  methods: {
    init(type, data) {
      this.nowType = type;
      if(type === 'show') {
        this.modalData.title = '查看'
        this.FormData.data = data;
      } else if (type === 'add') {
        this.modalData.title = '添加批改'
        this.FormData.data = data;
      }
      this.modalData.modalBoolean = true
    },
    closeModal() {
      this.modalData.modalBoolean = false;
    },
    submitFn() {
      for (let i = 0; i < this.FormData.data.problemsAnswer.length; i++) {
        this.FormData.data.problemsAnswer[i] = this.FormData.data.problemsAnswer[i].replace(/\<.*?\>/g,"");
      }
      this.$nextTick(()=>{
        this.$emit("callBack", this.FormData.data);
      this.FormData.data = {};
      this.modalData.modalBoolean = false;
      })
    },
    markAnswer(data,index) {
      this.$refs.editorAnswer.init(data, index);
    },
    handleEditor(obj, index) {
      console.log(obj ,index)
      this.FormData.data.problemsAnswer.splice(index, 1, obj)
    }
  },
};
</script>
