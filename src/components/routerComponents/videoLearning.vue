<template>
   <div class="bg" >
      
      <el-button  class="bt" type="text" @click="openMooc">中国大学mooc</el-button>  
      <el-button  class="bt1" type="text" @click="openxuexi">学习通</el-button>
     
   </div>
   
  </template>
  
  <script>
  export default {  
  methods: {  
    openMooc() {  
      window.open('https://www.icourse163.org/', '_blank')  
    }  ,
    openxuexi() {  
      window.open('https://i.chaoxing.com/', '_blank')  
    }  
  }  }
    
 
  </script>
    
  
  <style>
  .bg{
      width: 100%;
      height: 90%;
      background-color: white;
      display: flex;  
      flex-direction: column;  
      /* align-items: flex-start;  */
      font-size: 20px;
      
      
      
  }
  .bt{
 
  
   font-size: 20px;
  }
  .bt1{


   
   font-size: 20px;
  }
  
  </style>