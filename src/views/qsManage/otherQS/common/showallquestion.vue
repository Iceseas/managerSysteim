<template>
  <div :style="`height:${listHeight}`" class="showQuestions">
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      listHeight: 0,
    };
  },
  methods: {

  },
  mounted() {
    window.onresize = () => {
      this.$nextTick(() => {
        this.listHeight = document.body.clientHeight - 157 + "px";
      });
    };
    this.$nextTick(() => {
      this.listHeight = document.body.clientHeight - 157 + "px";
    });
  },
};
</script>

<style scoped>
.showQuestions {
  height: 100%;
  width: 100%;
}
</style>
