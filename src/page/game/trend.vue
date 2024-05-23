<template>
    <div class="main-box" style="max-width: 750px;">
        <div class="header">
            <div class="gotu">
                <van-icon name="arrow-left" size="34" @click="onClickLeft" />
            </div>
            <div class="tab">
                走势图
            </div>
            <div class="title">
                {{ gameinfo ? gameinfo.lotName : '游戏名' }}
            </div>
        </div>
        <div class="tabname">
            <div class="period">期号</div>
            <div class="data">
                <span>冠</span>
                <span>亚</span>
                <span>三</span>
                <span>四</span>
                <span>五</span>
                <span>六</span>
                <span>七</span>
                <span>八</span>
                <span>九</span>
                <span>十</span>
            </div>
        </div>
        <van-pull-refresh v-model="loading" @refresh="getOpenslist">
        <div class="tabdata">
            <div class="item" v-for="(item,index) in openslist" :key="index">
                <div class="period">{{ item.period }}</div>
                <div class="data">
                    <span v-for="(num, index) in item.content.split(',')" :key="index" class="pknum" :class="'num' + (parseInt(num))">{{ parseInt(num) }}</span>
                </div>
            </div>            
        </div>
        </van-pull-refresh>
    </div>

</template>

<script setup>
import { ref,computed,onMounted } from 'vue';
import { showToast,showSuccessToast, showFailToast,showLoadingToast } from 'vant';
//返回上一页
const onClickLeft = () => history.back();
//持久化
import { gameinfoStore } from '@/stores';
const gameStore = gameinfoStore();
const gameinfo = computed(() => gameStore.gameinfo);

import { apiprizeOpens } from '@/api/game';

//下拉刷新
const count = ref(0);
const loading = ref(false);





//获取开奖列表数据
const openslist = ref([
    {
    "content": "06,04,03,01,07,02,09,10,08,05",
    "period": 33139564
    },
    {
    "content": "02,08,04,03,10,06,05,01,09,07",
    "period": 33139563
    }
]);
const getOpenslist = async () => {
try {
    showLoadingToast({
      message: "请稍后...",
      forbidClick: true,
      duration: 500
    });
    const roomCode = gameinfo.value.setting.roomCode;
    const lotType = gameinfo.value.lotType;
    const res = await apiprizeOpens(roomCode,lotType,50);
    if (res.data.code != 200) {
        showFailToast("获取开奖信息失败");
        return;
    }
    openslist.value = res.data.data;
    showSuccessToast('刷新成功');
    loading.value = false;

} catch (error) {
    console.log(error);
}
}

//周期函数
onMounted(() => {    
    getOpenslist();
})

</script>

<style scoped>
.header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px;
      padding-right: 15px;
      height: 50px;
      font-size: 20px;
      background-image: url('@/assets/header-bg.png');
      background-size: cover;
      color: #fff;
  }
  .tabname {
    display: flex;
    background: #f8ce47;
    color: #651e04;
    padding: 10px;
    .period{
        width: 80px;
        text-align: center;
    }
    .data{
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
}
.tabdata {    
    .item{
        display: flex;
        align-items: center;
        padding: 10px;
    }
    .period{
        width: 80px;
        text-align: center;
    }
    .data{
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
}
.item:nth-child(2n) {
    background: #fff;
}
.pknum {
    width: 30px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 1px;
    font-size: 16px;
    font-weight: 600;
    background: #ff0000;
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
</style>