<template>
  <Modal v-model="modalData.modalBoolean" width="660">
    <div slot="header">
      <Icon type="md-create"></Icon>
      <span style="font-size:20px">{{ modalData.title }}</span>
    </div>
    <Editor ref="Editor" v-model="editorData"></Editor>
    <div slot="footer">
      <Button size="large" @click="closeModal">取消</Button>
      <Button type="primary" size="large" @click="submitFn">确定</Button>
    </div>
  </Modal>
</template>

<script>
import Editor from "./editor";
export default {
  components: {
    Editor,
  },
  data() {
    return {
      modalData: {
        title: "添加备注",
        modalBoolean: false,
      },
      editorData: '',
      nowIndex:0
    };
  },
  methods:{
      init(data, index) {
          this.editorData = data;
          this.nowIndex = index;
          this.$refs.Editor.init(data);
          this.modalData.modalBoolean = true;
      },
      closeModal() {
          this.modalData.modalBoolean = false;
      },
      submitFn() {
          this.editorData = this.editorData.slice(3);
          this.editorData = this.editorData.substring(0, this.editorData.length - 4);
          this.$emit("callBack", this.editorData, this.nowIndex);
          this.modalData.modalBoolean = false;
      }
  }
};
</script>

<style></style>
