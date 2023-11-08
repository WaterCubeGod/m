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
      <div class="questionList">
        <el-card class="question" v-for="(Question,index) in Questionnaire.questionList" :key="index">
          <!--单选题-->
          <div>
            <div slot="header" class="questionHead">
              <span  style="color: red"></span>
              <span>{{index+1}}、{{ Question.questionInfo }}</span>
            </div>
            <div v-for="(option,opIndex) in Question.questionList" :key="opIndex">
              <el-radio v-model="question.answer[0]" :label="opIndex">{{option}}</el-radio>
            </div>
          </div>
          
        </el-card>
      </div>
      <div class="footBtn">
        <el-button type="primary" @click="uploadAnswer()">提交</el-button>
      </div>
      <div style="height: 40px"></div> <!--占位,以后可以添加个人信息-->
    </div>
  </div>
  </template>
  
  <script>
  export default {
    name: "AnswerPaper",
    data(){
      return{
      
        Questionnaire:{},
       
      
      }
    },
    methods:{
      // 通过问卷id获取问卷问题
      async getPaperById(){
        this.QuestionnaireID = this.$route.params.questionnaireID; 
        
        // 通过paperId获取paper的信息
        let {data:res} = await this.$http.get(`http://localhost:8087/showQuestionnnaire${this.QuestionnaireId}`);
        // console.log(res);
        if (res.code !== 666){  // 获取问卷失败
          return this.$message.error(res.msg);
        }
    
        this.Questionnaire = res.data;
        console.log(this.Questionnaire);
      },
      // 上传问卷填写结果

      
      async uploadAnswer(){
        // 跳转到回答问卷成功页面
        await this.$router.push("/answerSuccess");
      }
    },
    created() {
      this.QuestionnaireId= this.$route.params.QuestionnaireId;
      // console.log(this.QuestionnaireId);
      this.getQuestionnaireId(this.QuestionnaireId);
    }
  }
  </script>
  
  <style scoped lang="less">
  
  .paperViewContainer{
    width: 100%;
    height: 100%;
    .paperBox{
      position: absolute;
      width: 50%;
      height: 100%;
      left: 50%;
      transform: translate(-50%);   // 向左移动自身宽度一半的距离
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
  
    }
  
  
  }
  
  </style>