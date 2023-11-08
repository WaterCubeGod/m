<template>
     
    <div>    
      <el-table :data="Data" style="width: 100%">    
        <el-table-column prop="questionnaireID" label="问卷ID"></el-table-column>    
        <el-table-column prop="questionnaireName" label="问卷名称"></el-table-column>    
        <el-table-column prop="questionnaireInfo" label="问卷介绍"></el-table-column>    
        <el-table-column label="操作">    
          <template  slot-scope="scope">    
            <el-button @click="goToAnswerPage(scope.$index)">作答</el-button>    
          </template>    
        </el-table-column>    
      </el-table>    
    </div>    
  </template>  
    
  <script>    
 
    export default {
      name: 'MyQuestionnaireList',
      data() {
        return {
            Data: []
        }
    },
    mounted() {
    this.fetchData();
  },
   
    methods: {
      goToAnswerPage(index) {  
      const questionnaireID = this.Data[index].questionnaireID;  
      this.$router.push({ path : 'study/showQuestionnaire', params: { questionnaireID } });  
    }  
  },  


      fetchData() {
      this.$axios({
        method: 'POST',
        url: 'http://localhost:8087/getQuestionnaireList',
        params: {
          
        }
      })
      .then(response => {
        console.log(response.data);
        if (response.data.code === 666) {
          const questionnaires = response.data.data;
          const Data = questionnaires.map(questionnaire => ({
            questionnaireID: questionnaire.questionnaireID,
            questionnaireName: questionnaire.questionnaireName,
            questionnaireInfo: questionnaire.questionnaireInfo
          }));
          this.Data = Data;
        } else {
          console.log(response.data.msg);
        }
      })
      .catch(error => {
        console.log('错误', error.message);
      });
    }
  }
  </script>