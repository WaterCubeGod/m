<template>  
  <div>  
    <el-table :data="questionnaireList" style="width: 100%">  
      <el-table-column prop="name" label="试题名称"></el-table-column>  
      <el-table-column prop="description" label="描述"></el-table-column>  
      <el-table-column prop="date" label="发布日期"></el-table-column>  
      <el-table-column label="操作">  
        <template>  
          <el-button>作答</el-button>  

        </template>  
      </el-table-column>  
    </el-table>  
  </div>  
</template>  
  
<script>  
export default {  

};  
</script>