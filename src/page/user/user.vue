<template>
  <div class="main-box">
    <div class="header">
      <van-icon name="envelop-o" size="30" />
      <div class="title">个人中心</div>
      <van-icon name="setting-o" size="30" />
    </div>
    <div class="moneybox">
      <div class="user">
        <div class="avatar">
          <img src="@/assets/avatar.png" alt="">
          <span>修改资料 <van-icon name="edit" /></span>
        </div>
        <div class="ifno">
          <div class="item"><span>账号</span>{{ userinfo.loginName }}</div>
          <div class="item"><span>昵称</span>{{ userinfo.userName }}</div>
          <div class="item"><span>UID</span>{{ userinfo.autoId }}</div>
          <div class="item"><span>时间</span>11231231231</div>
        </div>  
      </div>
      <div class="data">
        <div class="item">金额:<span>0.00</span></div>
        <div class="item">今日盈亏:<span>0.00</span></div>
        <div class="item">今日流水:<span>0.00</span></div>
      </div>
    </div>
    <div class="menu">
      <div class="title">更多服务</div>
      <van-grid :column-num="4">
        <van-grid-item @click="$router.push('/record/balance')">
          <img class="tubiao" src="@/assets/user/shangxia.png" alt="">
          上分下分
        </van-grid-item>
        <van-grid-item @click="$router.push('/record/gamelog')">
          <img class="tubiao" src="@/assets/user/shangfen.png" alt="">
          上分记录
        </van-grid-item>
        <van-grid-item @click="$router.push('/record/guess')">
          <img class="tubiao" src="@/assets/user/xiafen.png" alt="">
          下分记录
        </van-grid-item>
        <van-grid-item @click="$router.push('/record/integral')">
          <img class="tubiao" src="@/assets/user/qianbao.png" alt="">
          我的钱包
        </van-grid-item>
        <van-grid-item @click="ontishi">
          <img class="tubiao" src="@/assets/user/denglu.png" alt="">
          登录账号
        </van-grid-item>
        <van-grid-item @click="ontishi">
          <img class="tubiao" src="@/assets/user/jincai.png" alt="">
          竞猜记录
        </van-grid-item>
        <van-grid-item @click="ontishi">
          <img class="tubiao" src="@/assets/user/daili.png" alt="">
          代理系统
        </van-grid-item>
        <van-grid-item @click="onLogout">
          <img class="tubiao" src="@/assets/user/tuichu.png" alt="">
          退出登录
        </van-grid-item>
      </van-grid>
    </div>
  </div>
  <tabbar></tabbar>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import tabbar from "@/components/tabbar/tabbar.vue";
import { showToast } from 'vant';
import { useRouter } from 'vue-router';

//持久化
import { useUserStore } from '@/stores';
const userStore = useUserStore();
const router = useRouter();

const ontishi = () => {
  showToast('暂无内容');
}

//获取用户信息
const userinfo = ref({});

onMounted(() => {
  if (userStore.userData) {
    userinfo.value = userStore.userData;
    console.log(userinfo.value);
  }
});

const onLogout = () => {
  userStore.removeuserData(); // Clear user data
  showToast('Log out successfully');
  
  window.sessionStorage.setItem('logout', 'true');
  
  localStorage.clear();
  
  router.push('/login');
}


</script>
    
<style scoped>
.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-image: url("@/assets/header-bg.png");
    padding: 10px 20px;
    background-size: cover;
    height: 35px;
    font-size: 18px;
    color: #fff;
}

.moneybox{
    background: #fff;
    padding: 20px;
    .avatar img {
        width: 140px;
    }
    .avatar {
        display: flex;
        flex-direction: column;
        align-items: center;
        span{
            margin-top: 10px;
            color: #b24ec1;
        }
    }
    .user {
        display: flex;
        .ifno {
            margin-left: 20px;
            width: 100%;
        }
        .item {
            display: flex;
            align-items: center;
            background: linear-gradient(180deg, #392B4D 0%,#513D70 50%,#392B4D 100%);
            margin: 5px 0;
            height: 47px;
            border-radius: 6px;
            color: #cdc5e5;
            span{
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                width: 60px;
                height: 90%;
                margin: 2px;
                margin-right: 10px;
                background: linear-gradient(180deg, #705194 0%,#5c3e75 50%,#a662be 100%);
                border-radius: 6px;
            }
        }
    }
    .data {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        .item{
            background: linear-gradient(180deg, #76549c 0%,#5a3d73 50%,#a864c0 100%);
            height: 35px;
            width: 28%;
            border-radius: 6px;
            color: #fff;
            display: flex;
            align-items: center;
            font-size: 14px;
            padding: 0 6px;
            span{
                color: #af4eca;
                font-size: 18px;
                font-weight: 600;
                
            }
        }
    }
}
.menu{
    margin-top: 10px;
    background: #fff;
    padding: 6px;
    box-shadow: 1px 2px 10px #ededed;
    .title {
        padding: 10px;
        padding-bottom: 20px !IMPORTANT;
    }
    img{
        width: 55px;
        height: 55px;
        margin-bottom: 6px;
    }
}

.ifno .item span {
    border: 2px solid #000;
}
.ifno {
    margin-left: 54px !IMPORTANT;
}
.data .item {
    border: 2px solid #000;
    height: 40px !IMPORTANT;
    border-radius: 0 !IMPORTANT;
}
img.tubiao {
    height: 70px !IMPORTANT;
    width: 70px !important;
}
.van-grid-item__content--center {
    font-size: 14px;
    color: rgba(47,48,51,1);
}
.data .item span {
    margin-left: 10px;
    font-size: 14px;
    white-space: nowrap;
    line-height: 17.00px;
}
.ifno .item {
    height: 40px !IMPORTANT;
}
.avatar span {
    color: rgba(195,64,214,1);
    font-size: 12.00px;
}
.main-box {
    background: #faf3fe!IMPORTANT;
    padding-bottom: 300px;
}
.van-grid-item__content--center {
    border-right: 1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
}
.main-box .menu{
    padding-bottom: 20px;
}

</style>    