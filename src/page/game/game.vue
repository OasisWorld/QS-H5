<template>
    <div class="main-box" style="max-width: 750px;">
        <div class="headerbox">
            <header_mpnt></header_mpnt>
        </div>
        <chatbox></chatbox>
        <!-- <wangtou></wangtou> -->
        <div class="box">
            <div class="HoverButton">
                <img @click="showgamelist" src="@/assets/chat/youxi.png" alt="">
                <img src="@/assets/chat/kefu.png" alt="">
                <img src="@/assets/chat/kaijiang.png" alt="">
                <img src="@/assets/chat/kuaijie.png" alt="">
                <img @click="hongbao = true" src="@/assets/chat/hongbao.png" alt="">
            </div>
        </div>

        <van-popup v-model:show="gamelist" position="right" closeable class="gamelist"
            :style="{ width: '65%', height: '80%' }">
            <div class="top" @click="$router.push('/')">
                <img src="@/assets/icon/fanhui.png" alt="">
                返回大厅
            </div>
            <div class="gamebox">
                <div class="item" v-for="(item, index) in gameStore.gamelist" :key="index">
                    <img :src="item.logo" alt="">
                    <div class="name">{{ item.title }}<p>{{ gameStore.period[item.id].nextPeriod }}</p>
                    </div>
                    <div class="state">距离封盘<div class="time">00:33</div>
                    </div>
                </div>
            </div>
        </van-popup>

        <!-- 红包 -->
        <van-overlay :show="hongbao" z-index="99999">
            <div class="wrapper">
                <div class="item">
                    <img class="hb" src="@/assets/chat/hongbao_bg.png" alt="">
                    <img class="guanbi" @click="hongbao = false" src="@/assets/chat/guanbi.png" alt="">
                </div>
            </div>
        </van-overlay>

    </div>
    <keyboard></keyboard>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { showToast, showLoadingToast } from 'vant';
import keyboard from "@/components/keyboard/keyboard.vue";
import saiche from "@/components/games/saiche.vue";
import header_mpnt from "@/components/games/header_mpnt.vue";
import chatbox from "@/components/games/chatbox.vue";
import wangtou from "@/components/games/wangtou.vue";
import { apigameinfodata } from '@/api/game';

//持久化
import { gameinfoStore } from '@/stores';
const gameStore = gameinfoStore()

//获取路由信息
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
const route = useRoute();
//定义游戏ID
const gameid = ref(route.params.id)




const gamelist = ref(false);
const showgamelist = () => {
    gamelist.value = !gamelist.value;
}


//红包
const hongbao = ref(false);
const onhongbao = () => {
    showToast('暂无红包');
}

//获取游戏数据
const gameinfodata = ref({});
const getgamesetinfo = async () => {
    showLoadingToast({
        message: '加载中...',
        forbidClick: true,
        duration: 500,
    });
    const id = gameid.value;
    const res = await apigameinfodata(id);
    if (res.data.code !== 200) {
        console.log("请求失败");
        return;
    }
    gameStore.setgameinfo(res.data.data)
    //console.log(res.data.data)
}

onMounted(() => {
    gameStore.removegameinfo();
    getgamesetinfo();
});

</script>

<style scoped>
.main-box {
    background: #fff;
    position: relative;
    height: 100vh;
    overflow: hidden !important;
}

.headerbox {
    max-width: 750px;
    left: 50%;
    transform: translateX(-50%);
    position: fixed;
       background: #42315f;
    width: 100%;
    top: 0px;
    z-index: 999;
}

.HoverButton {
    position: fixed;
    top: 250px;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 55px;
    }
}

.gamelist {
    border-radius: 10px 0 0 10px;
    position: absolute;

    .top {
        padding: 10px;
        display: flex;
        align-items: center;
        font-size: 18px;
        font-weight: 600;
        color: #198cff;
        border-bottom: 1px solid #e7e8f0;

        img {
            margin-right: 10px;
            width: 25px;
        }
    }

    .gamebox {
        overflow-y: scroll;

        .item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 10px;
            color: #181818;
            border-bottom: 1px solid #e7e8f0;
        }

        img {
            width: 50px;
            height: 50px;
            margin-right: 10px;
        }

        p {
            margin: 0;
        }

        .name {
            margin-right: auto;
            font-size: 20px;

            p {
                color: #808080;
                font-size: 18px;
                margin-top: 4px;
            }
        }

        .state {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .time {
            font-size: 22px;
            margin-top: 2px;
        }
    }
}

.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    .item {
        position: relative;
    }

    .hb {
        width: 350px;
    }

    .guanbi {
        position: absolute;
        right: 50px;
        top: -50px;
        width: 40px;
    }
}

</style>