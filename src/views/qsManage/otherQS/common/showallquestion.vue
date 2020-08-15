<template>
  <div :style="`height:${listHeight}`" class="showQuestions">
    <div class="questionTab">
      <Row :gutter="20">
        <Col :span="3">
          <div @click="showQsList('single')" class="cardBody">
            
          </div>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col :span="3">
          <div @click="showQsList('vacancy')" class="cardBody">
            
          </div>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col :span="3">
          <div @click="showQsList('decide')" class="cardBody">
        
          </div>
        </Col>
        <Col :span="3">
          <div @click="showQsList('application')" class="cardBody">
       
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listHeight: 0,
      showQuestionData: false,
    };
  },
  methods: {
    showSingle(questionType) {
      window.localStorage.setItem('questionType',questionType)
      this.$store.commit("changeNowQuestionType", questionType);
      this.$store.dispatch("get_PageInfo_AJAX");
      this.$store.dispatch("get_listData_AJAX");
      this.showQuestionData = true;
      this.$router.push("showTable");
    },
    showdecide() {
      window.localStorage.setItem('questionType','decide')
      this.$store.commit("changeNowQuestionType", "decide");
      this.$store.dispatch("get_PageInfo_AJAX");
      this.$store.dispatch("get_listData_AJAX");
      this.showQuestionData = true;
      this.$router.push("showTable");
    },
    showvacancy(questionType) {
      window.localStorage.setItem('questionType',questionType)
      this.$store.commit("changeNowQuestionType", questionType);
      this.$store.dispatch("get_PageInfo_AJAX");
      this.$store.dispatch("get_listData_AJAX");
      this.showQuestionData = true;
      this.$router.push("showTable");
    },
    showApplicationQuestion() {
      window.localStorage.setItem('questionType','applicationQuestion')
      this.$store.commit("changeNowQuestionType", "applicationQuestion");
      this.$store.dispatch("get_PageInfo_AJAX");
      this.$store.dispatch("get_listData_AJAX");
      this.showQuestionData = true;
      this.$router.push("showTable");
    },
    showAllsingleQuestion() {
      window.localStorage.setItem('questionType','single_models')
      this.$store.commit("changeNowQuestionType", "single_models");
      this.$store.dispatch("get_PageInfo_AJAX");
      this.$store.dispatch("get_listData_AJAX");
      this.showQuestionData = true;
      this.$router.push("showTable");
    },
  },
  mounted() {
    window.onresize = () => {
      this.$nextTick(() => {
        this.listHeight = document.body.clientHeight - 155 + "px";
      });
    };
    this.$nextTick(() => {
      this.listHeight = document.body.clientHeight - 155 + "px";
    });
  },
  destroyed() {
    this.tableData = [];
  },
};
</script>

<style scoped>
.showQuestions {
  height: 100%;
  box-shadow: 0 1px 8px #ebeef5;
  background: #d3dce6;
  border-radius: 20px;
  width: 100%;
}
</style>
