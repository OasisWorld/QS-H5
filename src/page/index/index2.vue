<template>
  <div class="main-box">
    <div class="header">
        <div class="logo"><img src="@/assets/logo-tf.png" alt=""></div>
        <div class="kefu"><img src="@/assets/kefu.png" alt=""></div>
    </div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item><img src="@/assets/banner @2x.png" alt=""></van-swipe-item>
    </van-swipe>
    <div class="userinfo">
        <div class="avatar"><img src="@/assets/avatar.png" alt=""></div>
        <div class="info">
            <span>昵称：{{ userName }}</span>
            <span>余额：<span class="money">￥{{ balance }}</span></span>
        </div>
        <div class="caozuo">
            <span><img src="@/assets/chongzhi.png" alt=""> 充值</span>
            <span><img src="@/assets/tixian.png" alt="">提现</span>
        </div>
    </div>
    <div class="tutorial">
        <div class="gg"><img src="@/assets/gg.png" alt=""> 买卖详细教程</div>
        <div class="more">更多</div>
    </div>
    <div class="gamelist">
        <template v-for="(item, index) in gamelist" :key="index">
            <div class="item" @click="$router.push('/games/' + item.lotType)">
                
                <img :src="'http://houtai.lankou.xyz/mobile/' + item.image" alt=""> {{ item.lotName }}
            </div>
        </template>
        
    </div>
  </div>
  <tabbar></tabbar>
</template>

<script setup>
 import { ref,onMounted } from 'vue'
 import { showToast,showLoadingToast } from 'vant';
 import tabbar from "@/components/tabbar/tabbar.vue";
 import { apigamelist } from "../../api/game";
 import { apibalance } from "../../api/user";

 //持久化
import { gameinfoStore,useUserStore } from '@/stores';
const gameStore = gameinfoStore()
const userStore = useUserStore()

 //获取游戏列表
 const gamelist = ref([])
 const getgamelist = async () => {
    try {
        showLoadingToast({
            message: '加载中...',
            forbidClick: true,
            duration:300,
        });
        const res = await apigamelist();
        if (res.data.code != 200) {
        console.log("请求失败");
            return;
        }
        gameStore.setgamelist(res.data.data)
        gamelist.value = res.data.data;
    } catch (error) {
        
    } 
};

//用户数据
const userName = ref("");
const balance = ref("");
const getbalance = async () => {
    try {
        showLoadingToast({
            message: '加载中...',
            forbidClick: true,
            duration:300,
        });
        const res = await apibalance();
        if (res.data.code != 200) {
        console.log("请求失败");
            return;
        }
        //gameStore.setgamelist(res.data.data)
        balance.value = res.data.data;
    } catch (error) {
        
    } 
};


 onMounted(() => {
    getgamelist();
    getbalance();
    userName.value = userStore.userData.userName;
});
</script>

<style scoped>
.main-box {
    margin-bottom: 100px;
            background: #f8efff;
}
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-image: url('@/assets/header-bg.png');
    background-size: cover;
    padding: 6px 20px;
    .logo{
        display: flex;
        justify-content: space-between;
        img{
            width: 100px;
        }
    }
    .kefu{
        display: flex;
        justify-content: space-between;
        img{
        width: 40px;
    }
    }

}
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;    
    text-align: center;
    background-color: #fff;
    img{
        width: 100%;
        height: 100%;
    }
}
.userinfo {
    background: #fff;
    
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 6px;
   
    .avatar{
        img{
            width: 60px;
        }
    }
    .info {
        display: flex;
        flex-direction: column;
        margin-right: auto;
        margin-left: 10px;
        span{
            margin: 6px 0;
        }
    }
    .caozuo {
        display: flex;
        flex-direction: column;
        img{
            width: 25px;
            margin-right: 6px;
        }
        span{
            display: flex;
            align-items: center; 
            margin: 6px 0;
        }
    }
    .money{
        color: #b04bc1;
        font-weight: 600;
    }
}
.tutorial{
        padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    color: #b04bc1;
    background: #ffffff;
    margin: 15px 15px;
    border-radius: 0;
    border-radius: 100px;
    .gg{
        display: flex;
        align-items: center;
    }
    img{
        width: 35px;
        margin-right: 10px;
    }
}
.gamelist {
    display: flex;
    flex-wrap: wrap;
        background: #fff;
    justify-content: space-between;
    padding: 0 15px;
    .item{
        display: flex;
        align-items: center;
        width: 48%;
        padding: 10px;
            color: rgba(47, 48, 51, 1) ! IMPORTANT;
    font-size: 14.00px ! IMPORTANT;
        box-sizing: border-box;
        margin-bottom: 20px;
        background: #fff;
        
        border-radius: 6px;
        box-shadow:0px 3px 0px #dbd5df;
    }
    img{
        width: 50px;
        margin-right: 10px;
    }
}
.gamelist .item {
    border-bottom: 1px solid #e9e9e9;
    box-shadow: none !IMPORTANT;
    border-radius: unset !IMPORTANT;
}
</style>