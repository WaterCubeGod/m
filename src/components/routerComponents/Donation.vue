<template>
  <el-table
    :data="tableData"
    height="800"
    border
    style="width: 100%">
    <el-table-column
      prop="donationID"
      label="捐助编号"
      width="400">
    </el-table-column>
    <el-table-column
      prop="donationName"
      label="捐助物"
      width="400">
    </el-table-column>
    <el-table-column
      prop="number"
      label="数量"
      width="400">
    </el-table-column>
    <el-table-column>
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
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
      tableData: []
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$axios({
        method: 'POST',
        url: 'http://localhost:8087/getDonations',
        params: {
          id: getCookieValue('userID')
        }
      })
      .then(response => {
        console.log(response.data);
        if (response.data.code === 1) {
          const donations = response.data.data;
          const tableData = donations.map(donation => ({
            donationID: donation.donationID,
            donationName: donation.donationName,
            number: donation.number
          }));
          this.tableData = tableData;
        } else {
          console.log(response.data.msg);
        }
      })
      .catch(error => {
        console.log('错误', error.message);
      });
    },
    handleDonate(rowData) {
      this.$axios.post('http://localhost:8087/donationDetail', {
        donationID: rowData.donationID
      })
      .then(response => {
        console.log(response.data);
        this.$router.push({
          path: '/main/donationdetail',
          query: { donationData: response.data.data }
        });
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

</style>