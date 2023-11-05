<template>  
  <div>  
    <button @click="openExercise">打开习题界面</button>  
    <button @click="openVideoLearning">打开视频学习界面</button>  
    学习  
  </div>  
</template>  
  
<script>  
export default {  
  name: 'MyStudy',  
 
  methods: {  
    openExercise() {  
      this.$router.push({ path: '/study/userExercise', params: { id: 1 } })  
    },  
    openVideoLearning() {  
      this.$router.push({ path: '/study/videoLearning', params: { id: 1 } })    
    }  
  }  
}  
</script>  
  
<style scoped>  
</style>