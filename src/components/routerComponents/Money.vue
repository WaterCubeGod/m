<template>
    <div class="container">
    <div class="table-wrapper">
      <el-table :data="tableData" height="250" border style="width: 100%">
        <el-table-column prop="moneyID" label="捐款编号" width="180"></el-table-column>
        <el-table-column prop="amount" label="金额" width="180"></el-table-column>
        <el-table-column prop="fromID" label="捐款人编号"></el-table-column>
        <el-table-column prop="message" label="备注"></el-table-column>
      </el-table>
    </div>
    <div class="statistic-wrapper">
      <el-row :gutter="20">
        <el-col :span="6">
          <div>
            <el-statistic title="总资产" value="account">
              <template slot="formatter">{{ account }}</template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-statistic title="总收益" value="totalAmount">
              <template slot="formatter">{{ totalAmount }}</template>
              <template slot="prefix"><i class="el-icon-s-flag" style="color: red"></i></template>
              <template slot="suffix"><i class="el-icon-s-flag" style="color: blue"></i></template>
            </el-statistic>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>

  </template>
  
  <script>

  export default {
      name: 'MyPage',
      data() {
      return {
        tableData: [],
        account:getCookieValue('userAccount'),
        like: true,
        totalAmount:0,
      }
    },
    mounted() {
      this.fetchData();
      console.log(getCookieValue('userAccount'))
    },
    methods:{
      fetchData() {
      this.$axios({
        method: 'POST',
        url: 'http://localhost:8087/getMoney',
        params: {
          id: getCookieValue('userID')
        }
      })
      .then(response => {
        console.log(response.data);
        if (response.data.code === 1) {
          const money = response.data.data;
          const tableData = money.map(money => ({
            moneyID: money.moneyID,
            amount: money.amount,
            fromID: money.fromID,
            message:money.message
          }));
          this.tableData = tableData;

          this.totalAmount = money.reduce((sum, money) => sum + money.amount, 0);
        } else {
          console.log(response.data.msg);
        }
      })
      .catch(error => {
        console.log('错误', error.message);
      });
    }
    }
  }

  function getCookieValue(cookieName) {
  var cookies = document.cookie.split('; ');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].split('=');
    if (cookie[0] === cookieName) {
      return cookie[1];
    }
  }
  return null;
}
  </script>
  
  <style>
  .container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 500px;
}

.table-wrapper {
  flex-grow: 1;
}

.statistic-wrapper {
  margin-top: 20px;
}
  </style>