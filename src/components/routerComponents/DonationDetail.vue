<template>
    <div>
      <el-descriptions title="捐助详情" direction="vertical" :column="4" border>
        <el-descriptions-item label="捐助编号">{{this.donationData.donationID}}</el-descriptions-item>
        <el-descriptions-item label="捐助人ID">{{this.donationData.fromID}}</el-descriptions-item>
        <el-descriptions-item label="捐助物" :span="2">{{this.donationData.donationName}}</el-descriptions-item>
        <el-descriptions-item label="捐助数量">{{this.donationData.number}}</el-descriptions-item>
        <el-descriptions-item label="备注">{{this.donationData.message}}</el-descriptions-item>
        <el-descriptions-item >
        <span v-if="!this.donationData.sign" class="red-text">未签收</span>
        <span v-if="this.donationData.sign" class="green-text">已签收</span>
      </el-descriptions-item>
      </el-descriptions>
  
      <el-button type="primary" @click="() => handleButtonClick(this.donationData.donationID)">签收</el-button>
    </div>
  </template>
  
  <script>
  export default {
      name: 'MyDonationDetail',
      data() {
        return {
            donationData: null
        }
    },
    created() {
        this.donationData = this.$route.query.donationData;
        console.log(this.donationData)
    },
    methods: {
      handleButtonClick(donationID) {

        console.log(donationID)
        if (this.donationData.sign) {
        alert('该捐助物已签收');
        return;
        }
        //发送 POST 请求到后端接口
        this.$axios({
                method: 'GET',
                url: 'http://localhost:8087/signDonation',
                params: {
                  id:donationID
                }
            }).then(response => {
              console.log(response.data)
              alert('签收成功');
              this.$router.push({
              path:'/main/donation',
          });
            }, error => {
                console.log('错误', error.message)
            })
      }
    }
  }
  </script>
  
  <style>
  .red-text {
  color: red;
}

.green-text {
  color: green;
}
  </style>