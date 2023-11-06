<template>
    <el-table
      :data="tableData"
      height="250"
      
      style="width: 100%">
      <el-table-column
        prop="donationID"
        label="捐助编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="donationName"
        label="捐助物"
        width="180">
      </el-table-column>
      <el-table-column
        prop="number"
        label="数量"
        width="180">
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDonate(scope.row)">捐助详情</el-button>
          </template>
      </el-table-column>
    </el-table>
  </template>
  
  <script>
  export default {
    name: 'MyDonation',
    data() {
      return {
        tableData: [{
            donationID: '1',
            donationName: '王小虎',
            number: '上海市普陀区金沙江路 1518 弄'
        }, {
            donationID: '2016-05-02',
            donationName: '王小虎',
            number: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    },
    methods: {
      handleDonate(rowData) {

        console.log(rowData)
        // 发送 POST 请求到后端接口
        this.$axios.post('http://localhost:8087/donationDetail', {
            donationID:rowData.donationID
        })
        .then(response=>{
            console.log(response.data)
            this.$router.push({
              path:'/main/donationdetail',
              query:{donationData:response.data.data,}
          });
        }
        );
        
      
      }
    }
  }
  </script>
  
  <style>
  
  </style>