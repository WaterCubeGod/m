<template> 
   <div class="con">
    <div class="register-form">  
      <h2>注册</h2>  
      <form @submit.prevent="register">  
        <div class="form-group">  
          <label for="username">用户名:</label>  
          <input type="text" id="username" v-model="username" required>  
        </div>  
        <div class="form-group">  
          <label for="password">密码:</label>  
          <input type="text" id="password" v-model="password" required>  
        </div>  
        <div class="form-group">  
          <label for="address">地址:</label>  
          <input type="text" id="address" v-model="address" required>  
        </div>
        <div class="form-group">  
          <label for="phone">电话:</label>  
          <input type="text" id="phone" v-model="phone" required>  
        </div>
        <div class="form-group">  
          <label for="email">邮箱:</label>  
          <input type="text" id="email" v-model="email" required>  
        </div>  
        
        <button type="submit">注册</button>  
      </form>  
    </div>  
  </div> 
  </template>  
    
  <script>  
  import axios from 'axios'; // 引入axios库  
  export default {  
    data() {  
      return {  
        username: '',  
        password: '',
        address:  '',
        phone:    '',
        email:    '',  


      };  
    },  
    methods: {  
      register() {  
        // 在这里添加注册逻辑，例如发送数据到服务器  
        console.log('username:', this.username);  
        console.log('email:', this.email);  
        console.log('password:', this.password);  
        console.log('address',this.address);
        console.log('phone',this.phone);
          
        


        try {  
        //向后台发送注册请求，，并且需要POST数据{username: this.username, password: this.password}  
        const response = axios
        .post('http://localhost:8087/addUserInfo', { username: this.username, password: this.password ,email: this.email,phone: this.phone,address:this.address})
        .then(response => {
            // 检查后台返回的数据中是否包含成功标志，例如一个特定的状态码或者字段。这里只是一个示例，具体的处理方式需要根据您的业务逻辑来确定。  
            if (response.data.msg === '成功') {  
                console.log(response.data.data)  
                this.$router.push({ path: '/userLogin', params: { id: 1 } })  
            } else {  
                console.log('失败：' + response.data.message)  
            }  
        });  
        // 根据响应结果进行处理，例如检查是否成功登录，然后给用户反馈。这里只是一个示例，具体的处理方式需要根据您的业务逻辑来确定。  
        console.log(response);
        
        
      
      } catch (error) {  
        // 处理错误，例如给用户反馈错误信息。这里只是一个示例，具体的处理方式需要根据您的业务逻辑来确定。  
        console.error(error);  
      }  




      }  
    }  
  };  
  </script>  
    
  <style scoped>  
  .con{
    background-image: url('../assets/back.jpg');
    height: 100%;
  }
  .register-form {  
    width: 300px;  
    margin: 0 auto;  
    padding: 20px;  
    
  }  
  .form-group {  
    margin-bottom: 15px;  
  }  
  label {  
    display: block;  
    margin-bottom: 5px;  
  }  
  input[type="text"], input[type="email"], input[type="password"],input[type="address"],input[type="phone"] {  
    width: 100%;  
    padding: 5px;  
  }  
  button {  
    width: 100%;  
    padding: 10px;  
    background-color: #409eff;  
    color: white;  
    border: none;  
    cursor: pointer;  
  }  
  button:hover {  
    opacity: 0.8;  
  }  
  </style>