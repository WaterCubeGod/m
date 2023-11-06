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
            <el-statistic group-separator="," :precision="2" :value="value2" :title="账户金额"></el-statistic>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-statistic title="收益">
              <template slot="formatter">456/2</template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-statistic group-separator="," :precision="2" decimal-separator="." :value="value1" :title="title">
              <template slot="prefix"><i class="el-icon-s-flag" style="color: red"></i></template>
              <template slot="suffix"><i class="el-icon-s-flag" style="color: blue"></i></template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-statistic :value="like ? 521 : 520" title="Feedback">
              <template slot="suffix">
                <span @click="like = !like" class="like">
                  <i class="el-icon-star-on" style="color:red" v-show="!!like"></i>
                  <i class="el-icon-star-off" v-show="!like"></i>
                </span>
              </template>
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
        tableData: [{
            moneyID: '2016-05-03',
            amount: '王小虎',
            fromID: '上海市普陀区金沙江路 1518 弄',
            message:'666'
        }, {
            moneyID: '2016-05-02',
            amount: '王小虎',
            fromID: '上海市普陀区金沙江路 1518 弄',
            message:'666'
        }, {
            moneyID: '2016-05-04',
            amount: '王小虎',
            fromID: '上海市普陀区金沙江路 1518 弄',
            message:'666'
        }, {
            moneyID: '2016-05-01',
            amount: '王小虎',
            fromID: '上海市普陀区金沙江路 1518 弄',
            message:'666'
        }],
        like: true,
        value1: 4154.564,
        value2: 1314,
      }
    }
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