<template>  
  <div>  
    <el-button @click="openQuestionnaireList">打开习题界面</el-button>  
    <el-button @click="openVideoLearning">打开视频学习界面</el-button>    
  </div>  
</template>  
  
<script>  
export default {  
  name: 'MyStudy',  
 
  methods: {  
    openQuestionnaireList() {  
      this.$router.push({ path: '/study/questionnaireList', params: { id: 1 } })  
    },  
    openVideoLearning() {  
      this.$router.push({ path: '/study/videoLearning', params: { id: 1 } })    
    }  
  }  
}  
</script>  
  
<style scoped>  
</style>