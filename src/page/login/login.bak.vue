<template>
  <div class="main-box">
    <div class="logo">
      <img src="@/assets/logo.png" alt="">
    </div>
    <h1>test</h1>
    <div class="hello">欢迎您</div>
    <div class="tab">
      <span @click="showLogin" :class="{ active: activeTab === 'login' }">登录</span>
      <span>|</span>
      <span @click="showRegister" :class="{ active: activeTab === 'register' }">注册</span>
    </div>
    <div class="form" v-if="activeTab === 'login'">
      <input class="inp" v-model="user" @input="checkContent" placeholder="请输入6-16位数字加字母组合账号" type="text">
      <input class="inp" v-model="password" @input="checkContent" placeholder="请输入6-16位数字加字母组合密码" type="password">
      <van-button round type="primary" @click="handleLogin">登录</van-button>
    </div>
    <div class="form" v-if="activeTab === 'register'">
      <input class="inp" v-model="user" @input="checkContent" placeholder="请输入6-16位数字加字母组合账号" type="text">
      <input class="inp" v-model="password" @input="checkContent" placeholder="请输入6-16位数字加字母组合密码" type="password">
      <input class="inp" v-model="queren" @input="checkContent" placeholder="请输入确认密码" type="password">
      <input class="inp" v-model="yzm" @input="checkContent" placeholder="请输入验证码" type="text">
      <van-button round type="primary" @click="handleRegister">注册</van-button>
    </div>
    <div class="kuozhan">
      <span @click="$router.push('/')">免费试玩</span>
      <span>找回密码</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const activeTab = ref('login');
const user = ref('');
const password = ref('');
const queren = ref('');
const yzm = ref('');
const router = useRouter();

const showLogin = () => {
  activeTab.value = 'login';
};

const showRegister = () => {
  activeTab.value = 'register';
};

const checkContent = () => {
  // Implement your content validation logic here
};

const handleRegister = async () => {
  if (password.value !== queren.value) {
    alert('Passwords do not match');
    return;
  }
  
  try {
    const response = await axios.post('http://index.cike.live/api/account/reg', {
      user: user.value,
      password: password.value,
      yzm: yzm.value
    });
    
    if (response.data.success) {
      router.push('/login');
    } else {
      alert('Registration failed: ' + response.data.message);
    }
  } catch (error) {
    console.error('Error during registration:', error);
    alert('Registration error: ' + error.message);
  }
};

const handleLogin = async () => {
  try {
    const response = await axios.post('http://index.cike.live/api/account/login', {
      user: user.value,
      password: password.value
    });
    
    if (response.data.success) {
      router.push('/home');
    } else {
      alert('Login failed: ' + response.data.message);
    }
  } catch (error) {
    console.error('Error during login:', error);
    alert('Login error: ' + error.message);
  }
};
</script>


<style scoped>
.main-box{
  max-width: 750px;
  height: 100vh;
  background-image: url('@/assets/loginBg.png');
  background-size: cover;
}
.logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    img{
      width: 80px;
    }
}
.hello{
  padding: 0 30px;
  font-size: 28px;
  color: #50a5f7;
}
.tab{
  display: flex;
  align-items: center;
  color: #666;
  margin-top: 10px;
  padding: 0 30px;
  span{
    margin-right: 10px;
    font-size: 18px;
  }
}
.form {
    display: flex;
    flex-direction: column;
    padding: 20px 30px;
}
input.inp {
    background: #fff;
    height: 45px;
    border-radius: 20px;
    margin: 6px 0;
    border: 1px #cccccc solid;
    padding: 0 16px;
}
.kuozhan {
    padding: 0 35px;
    display: flex;
    justify-content: space-between;
    color: #50a5f7;
}
.active {
  font-weight: bold;
  color: #50a5f7;
}
</style>