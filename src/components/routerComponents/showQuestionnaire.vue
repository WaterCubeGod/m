<template>
  <div class="paperViewContainer">
    <div class="paperBox">
      <div class="paperTitle">
        <h2>{{Questionnaire.questionnaireName}}</h2>
      </div>
      <div class="paperIntroduce">
        <span>&ensp;&ensp;&ensp; {{Questionnaire.questionnaireInfo}}</span>
      </div>
      <!--问题列表-->
      <!-- <div class="questionaire-container"> -->
      <div class="questionList">
        <el-card class="question" v-for="(Question,index) in Questionnaire.questionList" :key="index">
          <!--单选题-->
          <div >
            <div slot="header" class="questionHead">
              <span  style="color: red"></span>
              <span>{{index+1}}、{{ Question.questionInfo }}</span>
            </div>
            <div v-for="(option,opIndex) in Question.optionList" :key="opIndex">
              <el-radio  v-model="Question.answerOptionID"  :label="option.optionID" >{{option.optionInfo}}</el-radio>
            </div>
          </div>
          
        </el-card>
      </div>
      <div class="footBtn">
        <el-button type="primary" @click="uploadAnswer()">提交</el-button>
      </div>
    </div>
      

    </div>
  <!-- </div> -->
  </template>
  
  <script>
  export default {
    name: "AnswerPaper",
    data(){
      return{
        QuestionnaireID:null ,
        Score: 0,
        Questionnaire:{},
        userId: null
      
      }
    },
    methods:{
      getUserID() {  
      const cookieArr = document.cookie.split(";");  
      for(let i=0; i<cookieArr.length; i++) {  
        let cookiePair = cookieArr[i].split("=");  
        if(cookiePair[0].trim() === "userID") {  
          this.userId = cookiePair[1];  
          break;  
        }  
      }  
    }  ,
      
    
    
      getScore(){
        for (let Question of this.Questionnaire.questionList) {  
          if(Question.rightOptionID==Question.answerOptionID)
          this.Score++;
        
        
          
      }  
      console.log(this.Score)

      },


      fetchData() {  
  this.$axios({  
    method: 'GET',  
    url: 'http://localhost:8087/showQuestionnaire',  
    params: {  
      QuestionnaireID:this.QuestionnaireID
    }  
  })  
  .then(response => {  
    console.log(response.data);  
    if (response.data.code === 666) {  
       this.Questionnaire = response.data.data;  
       
   
    } else {  
      console.log(response.data.msg);  
    }  
  })  
  .catch(error => {  
    console.log('错误', error.message);  
  });  
  },
      async uploadAnswer(){
        // 跳转到回答问卷成功页面
        this.getUserID()
        this.getScore()
        let score=Number(this.Score)
        score=score*20
        console.log(score)
        console.log(this.userId)
        if(score>=60){
          this.$axios({  
          method: 'POST',  
          url: 'http://localhost:8087/addTrophy',  
          params: {  
          score,
          userID:this.userId
        }  
        })
        this.$cookies.set('userTrophy', Number(this.$cookies.get('userTrophy'))+1)


          this.$router.push({ path: 'answerSuccesse', query: { Score: this.Score*20  } });
        }
        else
          this.$router.push({ path: 'answerFail', query: { Score: this.Score*20 } });
      }
    },
    created() {
      this.QuestionnaireID= this.$route.query.QuestionnaireID;
      
      this.fetchData();
      
      
      
      
      
   
     
    }
  }
  </script>
  
  <style scoped lang="less">
   
  
   .paperViewContainer{
    width: 100%;
    height: 80%;
    .paperBox{
      position: absolute;
      width: 87%;
      height: 90%;
      left: 50%;
      transform: translate(-43%);   // 向左移动自身宽度一半的距离
      background-color: rgba(245, 248, 248, 0.8);
      .paperTitle{
        text-align: center;
      }
      .paperIntroduce{
        border-bottom: 3px solid #409EFF;
        padding-bottom: 12px;
        margin-bottom: 12px;
      }
      // 问题样式
      .question{
        margin: 10px 0;
        .questionHead{
          margin-bottom: 16px;
        }
        // 单选题和多选题设置宽度和外边距
        .el-radio, .el-checkbox{
          width: 100%;
          margin-bottom: 8px;
        }
      }
  
      // 底部按钮
      .footBtn{
        display: flex;   // 弹性盒子布局
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 40px;
      }
      // .questionaire-container{
      //   background-color: antiquewhite;
      //   width: 100%;
      // }
  
    }
  
  
  } 
  
  </style>