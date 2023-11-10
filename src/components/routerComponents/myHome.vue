<template>  
<el-descriptions data="form" title="用户信息" class="myform">
    <el-descriptions-item label="用户名"><el-descriptions-item-content>{{ form.name }}</el-descriptions-item-content></el-descriptions-item>
    <el-descriptions-item label="地址"><el-descriptions-item-content>{{ form.address }}</el-descriptions-item-content></el-descriptions-item>
    <el-descriptions-item label="手机号"><el-descriptions-item-content>{{ form.phone }}</el-descriptions-item-content></el-descriptions-item>
    <el-descriptions-item label="邮件"><el-descriptions-item-content>{{ form.email }}</el-descriptions-item-content></el-descriptions-item>
    <el-descriptions-item label="介绍"><el-descriptions-item-content>{{ form.description }}</el-descriptions-item-content></el-descriptions-item>
    <el-descriptions-item label="奖杯"><el-descriptions-item-content>{{ form.trophy }}</el-descriptions-item-content></el-descriptions-item>
</el-descriptions>
</template>

<script>



export default {
    data() {
      return {
        form: {
          name: '',
          address: '',
          phone: '',
          email: '',
          description: '',
          trophy: '',
          
        }
      }
    },
    created(){
        this.fetchData()
   
    },
    methods: {

      fetchData(){
        this.form.name=this.$cookies.get('username');
        this.form.address=this.$cookies.get('userAddress');
        this.form.phone=this.$cookies.get('userPhone');
        this.form.email=this.$cookies.get('userEmail');
        this.form.description=this.$cookies.get('userDescription');
        this.form.trophy=this.$cookies.get('userTrophy');
        
      },

      onSubmit() {
        console.log('submit!');
      }
    }
  } 
</script>

<style>
.el-descriptions {  
    flex-direction: column;  
}  
  
.el-descriptions-item {  
    display: flex;  
    flex-direction: column;  
    /* align-items: center;  
    justify-content: flex-start;  */
}

.myform {  
  background-color: rgb(252, 251, 251);  
  height: 100%;

}

</style>