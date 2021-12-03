<template>
  <div>
    
    <kiwi-button><kiwi-icon name="kiwi-icon-user" /></kiwi-button>
    <kiwi-input-num v-model="num"></kiwi-input-num>
    <kiwi-select v-model="data"></kiwi-select>
    <kiwi-checkbox v-model="data1"></kiwi-checkbox>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: ['A','B'],
      num: 0,
      data1: false,
      data: '',
      radioval:''
    }
  },
  methods: {
    
  },
  
};
</script>

<style scoped>
kiwi-icon{
  color: #000;
}
</style>
