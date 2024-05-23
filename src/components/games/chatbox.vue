<template>
    <div class="chatbox">
        <template v-for="(item, index) in latestChatData" :key="index">
            <div class="item" v-if="item.type === 1">
                <div class="avatar">
                    <img :src="'http://houtai.lankou.xyz/homeImage' + item.avatar" alt="">
                </div>
                <div class="data">
                    <span>{{ item.userName }} {{ formatTime(item.createTime) }}</span>
                    <div class="content">
                        {{ item.content }}
                    </div>
                </div>
            </div>
            <div class="item" v-if="item.type === 2">
                <div class="avatar">
                    <img :src="'http://houtai.lankou.xyz/homeImage' + item.avatar" alt="">
                </div>
                <div class="data">
                    <span>{{ item.userName }} {{ formatTime(item.createTime) }}</span>
                    <div class="content">
                        {{ item.content }}
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { apichats } from '@/api/game';
//持久化
import { gameinfoStore } from '@/stores';
const gameStore = gameinfoStore()

// 格式化时间戳为正常时间的函数
function formatTime(timestamp) {
    const date = new Date(timestamp);
    // 这里是将时间戳格式化为正常时间的逻辑
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

//获取聊天数据
const chatdata = ref([]);
const getchats = async () => {
    const lotType = gameStore.gameinfo.lotType;
    const res = await apichats(lotType);
    if (res.data.code !== 200) {
        console.log("请求失败");
        return;
    }
    //gameStore.setgameinfo(res.data.data)
    chatdata.value = res.data.data;
}

//检测聊天记录变化
const latestChatData = ref([]);
watch(chatdata, (newValue) => {
    latestChatData.value = newValue.slice(-50);
});

onMounted(() => {
    getchats();
    setInterval(getchats, 5000);

})

</script>

<style scoped>
.chatbox {
    padding: 180px 46px 53px 10px;
    background: #efefef;
    overflow-y: scroll;
    margin-bottom: 147px;
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column-reverse;

    .item {
        display: flex;
      margin-bottom:18px;

        .avatar img {
            width: 40px;
            height: 40px;
        }

        .data {
            margin-left: 10px;
            margin-top: -10px;

            span {
                background: #4fa2f7;
                color: #fff;
                padding: 2px 4px;
                font-size: 12px;
                border-radius: 4px;
            }

            .content {
                position: relative;
              background-color: rgba(0, 0, 0, 0.300000) ! IMPORTANT;
                border-radius: 6px;
                padding: 10px;
                margin-top: 6px;
                margin-bottom: 10px;
                white-space: pre-wrap;
                color: rgba(233,236,238,1);
                font-size: 16.00px;
                letter-spacing: 1.2517462968826294px;
                 border-radius: 0;

                p {
                    margin: 4px 0;
                }
            }

          
        }
    }
}

.avatar img {
    border-radius: 6px;
}

.data span {
    background: transparent !IMPORTANT;
    color: rgb(255 255 255) ! IMPORTANT;
    font-size: 12.00px;
    letter-spacing: 0.05833332985639572px;
}
.chatbox {
    background-image: url(https://i.postimg.cc/qqgJy3Qc/4abc2069eb834330827dea92f0f5435b-merge-Image.png) !IMPORTANT;
    height: 100%;
    width: 100%;
    background-size: cover !IMPORTANT;
    background-position: center;
    background-repeat: no-repeat !IMPORTANT;
}
</style>