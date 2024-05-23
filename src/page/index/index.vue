<template>
  <div class="main-box">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in bannerdata" :key="index"><img :src="item" alt=""></van-swipe-item>
    </van-swipe>
    <template v-for="(item, index) in gamelist" :key="index">    
        <div class="gameinfo" v-if="item.status" @click="$router.push('/games')">
                <div class="piao">
                    <div class="logo"><img :src="item.logo" alt=""></div>
                    <div class="name">{{ item.title }}<span v-if="perioddata[item.id]">{{ perioddata[item.id].nextPeriod }}</span></div>
                    <div class="timestatus" v-if="!timestatus">已开奖</div>
                    <van-count-down v-else class="period" :time="time" @finish="onFinish">
                        <template #default="timeData">    
                            <span class="num">{{ timeData.minutes }}</span>
                            <span class="exp">:</span>
                            <span class="num">{{ timeData.seconds }}</span>
                        </template>
                    </van-count-down>
                </div>
                <div class="data">
                    <div class="text">最新开奖</div>
                    <div class="carball" v-if="item.module === 'car'">
                        <div v-if="perioddata[item.id]" v-for="(num, index) in perioddata[item.id].result.split(',')" :key="index" class="pknum" :class="'num' + (parseInt(num))">
                            {{ parseInt(num) }}
                        </div>
                    </div>
                    <div class="carball" v-if="item.module === 'marksix'">
                        <div v-if="perioddata[item.id]" v-for="(num, index) in perioddata[item.id].result.split(',')" :key="index" class="pknum" :class="'num' + (parseInt(num))">
                            {{ parseInt(num) }}
                        </div>
                    </div>
                    <div class="carball" v-if="item.module === 'ssc' || item.module === 'pcegg'">
                        <div v-if="perioddata[item.id]" v-for="(num, index) in perioddata[item.id].result.split(',')" :key="index" class="blue ball">
                            {{ parseInt(num) }}
                        </div>
                    </div>
                </div>
        </div>
    </template>

  </div>
  <tabbar></tabbar>
</template>

<script setup>
 import { ref,onMounted } from 'vue'
 import { showToast,showLoadingToast } from 'vant';
 import tabbar from "@/components/tabbar/tabbar.vue";
 import { getBanner,apigamelist,apiperiod } from "../../api/config";

//持久化
import { gameinfoStore } from '@/stores';
const gameStore = gameinfoStore()

//获取banner信息
 const bannerdata = ref([]);
 const banner = async () => {
    const res = await getBanner();
    if (res.data.code != 0) {
        console.log("请求失败");
        return;
    }
    //userStore.setData(res.data.data)
    bannerdata.value = res.data.data;
};

//获取游戏列表
const gamelist = ref([
    {
        "id": 19,
        "module": "car",
        "title": "幸运飞艇",
        "logo": "http://oss.jucaigame.com/logo/red/xyft.png",
        "sub_title": "",
        "hot": false,
        "room": false,
        "status": true
    },
    {
        "id": 20,
        "module": "car",
        "title": "极速赛车",
        "logo": "http://oss.jucaigame.com/logo/red/jssc.png",
        "sub_title": "",
        "hot": false,
        "room": false,
        "status": true
    }
]);
 const getgamelist = async () => {
    showLoadingToast({
        message: '加载中...',
        forbidClick: true,
        duration:500,
    });
    const res = await apigamelist();
    if (res.data.code != 0) {
        console.log("请求失败");
        return;
    }
    gameStore.setgamelist(res.data.data)
    gamelist.value = res.data.data;
};

//获取开奖数据
const perioddata = ref([]);
const getperiod = async () => {
    const res = await apiperiod();
    if (res.data.code != 0) {
        console.log("请求失败");
        return;
    }
    gameStore.setperiod(res.data.data.list)
    perioddata.value = res.data.data.list;
    //console.log(perioddata.value);
};

//处理开奖数据
const getPeriodData = (id) => {
  return perioddata[id];
};

const getLatestResult = (id) => {
  return perioddata[id]?.result.split(',') ?? [];
};

//倒计时
const time = ref(2 * 60 * 1000);
const timestatus = ref(true);
const onFinish = () => {
    timestatus.value = false;
}



onMounted(() => {
    banner();
    getgamelist();
    getperiod();
});

</script>

<style scoped>
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
.main-box {
    margin-bottom: 100px;
}
.gameinfo {
    background: #fff;
    padding: 10px;
    margin: 10px;
    border-radius: 10px;
    border: 1px solid #e3e3e3;
    box-shadow: 1px 2px 10px #ededed;
    .data {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 6px;
        .text {
            font-size: 14px;
        }
    }
}
.piao {
    display: flex;
    align-items: center;
    .logo img{
        width: 60px;
        height: 60px;
    }
    .name {
        display: flex;
        flex-direction: column;
        font-size: 20px;
        margin-left: 10px;
        span{
            font-size: 14px;
            margin-top: 4px;
            color: #999;
        }
    }
    .period {
        margin-left: auto;
        display: flex;
    }
}
.num {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 25px;
    border: 1px solid #ddd;
    font-weight: 600;
    border-radius: 5px;
    margin: 0 2px;
    background: #f9fafa;
}
.exp {
    font-size: 18px;
    margin: 0 2px;
    font-weight: 600;
}
.carball {
    display: flex;
}
.pknum {
    width: 22px;
    height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 1px;
    font-size: 16px;
    font-weight: 600;
    background: #ff0000;
    border-radius: 4px;
    color: #fff;
}
.num1{
    background: #e6de00;
}
.num2{
    background: #0092dd;
}
.num3{
    background: #4b4b4b;
}
.num4{
    background: #ff7600;
}
.num5{
    background: #17e2e5;
}
.num6{
    background: #5234ff;
}
.num7{
    background: #bfbfbf;
}
.num8{
    background: #ff2600;
}
.num9{
    background: #780b00;
}
.num10{
    background: #07bf00;
}
.ball{
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    font-size: 14px;
    font-weight: 900;
    border-radius: 50%;
    color: #fff;
}
.blue.ball {
    background: #0092dd;
}
.red.ball {
    background: #ff0000;
}
.timestatus{
    margin-left: auto;
    display: flex;
    color: #ff0000;
}
</style>