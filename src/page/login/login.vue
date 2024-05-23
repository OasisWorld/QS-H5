  <template>
    <div class="main-box">
      <div class="header"></div>
      <div class="form" v-if="activeTab === 'login'">
        <div class="inputbox">
          <img src="@/assets/login/user.png" alt="">
          <input class="inp" v-model="user" @input="checkContent" placeholder="请输入用户名" type="text">
        </div>
        <div class="inputbox">
          <img src="@/assets/login/mima.png" alt="">
          <input class="inp" v-model="pass" @input="checkContent" autocomplete="new-password" placeholder="请输入6-16位数字加字母组合密码" type="password">
        </div>
        <div class="kuozhan">      
          <span @click="$router.push('/')">免费试玩</span>
          <span>忘记密码?</span>
        </div>
        <van-button color="#c240d6" class="btn shadow" size="large" @click="onlogin">登录</van-button>
        <van-button color="#e7e7e7" class="btn" size="large" @click="showRegister">注册</van-button>
      </div>
      <div class="form" v-if="activeTab === 'register'">
        <div class="inputbox">
          <img src="@/assets/login/user.png" alt="">
          <input class="inp" v-model="nickName" @input="checkContent" placeholder="请输入昵称" type="text">
        </div>
        <div class="inputbox">
          <img src="@/assets/login/user.png" alt="">
          <input class="inp" v-model="user" @input="checkContent" placeholder="请输入账号" type="text">
        </div>
        <div class="inputbox">
          <img src="@/assets/login/mima.png" alt="">
          <input class="inp" v-model="pass" @input="checkContent" autocomplete="new-password" placeholder="请输入6-16位数字加字母组合密码" type="password">
        </div>
        <div class="inputbox">
          <img src="@/assets/login/mima.png" alt="">
          <input class="inp" v-model="yzm" @input="checkContent" placeholder="确认密码" type="text">
        </div>
        
        <van-button color="#c240d6" class="btn shadow" size="large" @click="onregister">注册</van-button>
        <van-button color="#e7e7e7" class="btn" size="large" @click="showLogin">登录</van-button>
      </div>
      <van-divider :style="{ color: '#79717e', borderColor: '#eae5ec', padding: '0 20px' }">第三方登录</van-divider>
      <div class="auth">
        <img src="@/assets/login/weixin.png" alt="">
        <img src="@/assets/login/QQ.png" alt="">
        <img src="@/assets/login/douyin.png" alt="">
      </div>
    </div>
  </template>

  <script setup>
  import { ref } from 'vue';
  import { showFailToast, showLoadingToast,showSuccessToast } from "vant";
  import { apilogin,apireg } from "../../api/user";

  //路由
  import { useRouter } from "vue-router";
  const router = useRouter();
  //持久化
  import { useUserStore } from '@/stores';
  const userStore = useUserStore()

  const activeTab = ref('login');

  const showLogin = () => {
    activeTab.value = 'login';
  };

  const showRegister = () => {
    activeTab.value = 'register';
  };

  //用户登录
  const user = ref('');
  const pass = ref('');
  const roomCode = ref('10001');
  const onlogin = async () => {
    try {
      if (user.value === "" || pass.value === "") {
        showFailToast("账号密码不能为空");
        return;
      }
      showLoadingToast({
        message: "请稍后...",
        forbidClick: true,
        duration: 500
      });
      const data = {
        user: user.value,
        pass: pass.value,
        roomCode: roomCode.value
      }
      const res = await apilogin(data);
      if (res.data.code === 200) {
        console.log(res.data.data)
        userStore.setuserData(res.data.data)
        router.push("/");
      } else {
        // 登录失败的处理
        showFailToast("登录失败");
      }
    } catch (error) {
      // 请求失败或网络错误的处理
      // console.error("登录请求失败:", error);
      showFailToast(error.msg);
    }
  };

  //账号注册
  const nickName = ref('');
  const onregister = async () => {
    try {
      if (user.value === "" || pass.value === "") {
        showFailToast("账号密码不能为空");
        return;
      }
      showLoadingToast({
        message: "请稍后...",
        forbidClick: true,
        duration: 500
      });
      const data = {
        nickName: nickName.value,
        user: user.value,
        pass: pass.value,
        roomCode: roomCode.value
      }
      const res = await apireg(data);
      if (res.data.code != 200) {
            showFailToast("注册失败");
            return;
      }
      showSuccessToast("注册成功 请登录");
      activeTab.value = 'login';
    } catch (error) {
      showFailToast("注册失败" + error.msg);
    }
  }

  </script>

<style scoped>
.header{
  height: 450px;
}
.main-box{
  max-width: 750px;
  height: 100vh;
  background-image: url('@/assets/login-bg.png');
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
    width: 100%;
    border-radius: 6px;
    margin: 6px 0;
    border: 0;
    padding: 0 16px;
}
.inputbox{
  display: flex;
    align-items: center;
  background: #fff;
  height: 45px;
  border-radius: 6px;
  margin: 6px 0;
  border: 1px #cccccc solid;
  padding: 0 16px;
  img{
    width: 22px;
  }
}
.kuozhan {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    color: #c240d6;
    margin-bottom: 10px;
}
.active {
  font-weight: bold;
  color: #50a5f7;
}
.btn{
  margin: 6px 0;
  color: #676767!important;
}
.btn.shadow{
  margin-top: 20px;
  box-shadow: 0px 3px 0px #7a1d88;
  color: #fff!important;
}
.auth {
    padding-bottom: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      width: 40px;
      margin: 0 20px;
      margin-top: 30px;
    }
}

@media screen and (max-width: 750px) {
.header{
height: 250px;
}
}
</style>