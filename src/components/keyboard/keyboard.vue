<template>
    <div class="overlay" v-show="isoverlay" @click="toggleHeight"></div>
    <div class="key-box" :class="{ expanded: isExpanded }">
        <div class="editBox">
            <img class="jianpan" src="@/assets/key-icon.svg" @click="toggleHeight">
            <input class="inp" v-model="touzhu" @input="checkContent" type="text" @click="toggleHeight">
            <img v-if="hasContent" @click="postsubmit" class="submit" src="@/assets/tijiao.svg" alt="">
            <img v-else class="submit" src="@/assets/submit.svg" alt="">
        </div>
        <div class="keysbox">
            <div class="used">
                <span>上分</span>
                <span>取消</span>
                <span>梭哈</span>
                <span>重复</span>
                <span>下分</span>
            </div>
            <div class="keys">
                <van-button type="default" class="item" @click="keys('大')">大</van-button>
                <van-button type="default" class="item" @click="keys('1')">1</van-button>
                <van-button type="default" class="item" @click="keys('2')">2</van-button>
                <van-button type="default" class="item" @click="keys('3')">3</van-button>
                <van-button type="default" class="item" @click="deletekey"><img class="shanchu"
                        src="@/assets/shanchu.svg" alt=""></van-button>
                <van-button type="default" class="item" @click="keys('小')">小</van-button>
                <van-button type="default" class="item" @click="keys('4')">4</van-button>
                <van-button type="default" class="item" @click="keys('5')">5</van-button>
                <van-button type="default" class="item" @click="keys('6')">6</van-button>
                <van-button type="default" class="item" @click="keys('龙')"  >龙</van-button>
                <van-button type="default" class="item" @click="keys('单')">单</van-button>
                <van-button type="default" class="item" @click="keys('7')">7</van-button>
                <van-button type="default" class="item" @click="keys('8')">8</van-button>
                <van-button type="default" class="item" @click="keys('9')">9</van-button>
                <van-button type="default" class="item" @click="keys('虎')" >虎</van-button>
                <van-button type="default" class="item" @click="keys('双')">双</van-button>
                <van-button type="default" class="item" @click="keys(' ')">空格</van-button>
                <van-button type="default" class="item" @click="keys('0')">0</van-button>
                <van-button type="default" class="item" @click="keys('/')">/</van-button>
                <van-button type="default" class="item he" @click="keys('冠亚和')" color="rgb(195, 64, 214)">冠亚和</van-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { showToast, showLoadingToast } from 'vant';
import { apitouzhu } from '@/api/touzhu';

//持久化
import { gameinfoStore } from '@/stores';
const gameStore = gameinfoStore()

//键盘弹出
const isExpanded = ref(false);
const isoverlay = ref(false);
const toggleHeight = () => {
    isExpanded.value = !isExpanded.value;
    isoverlay.value = !isoverlay.value;

};


//输入框跟按钮逻辑
const touzhu = ref('');
const keys = (e) => {
    touzhu.value += e;
}
const deletekey = () => {
    touzhu.value = touzhu.value.slice(0, -1);
};

//提交参数处理
const postsubmit = async () => {
    showLoadingToast({
        message: '投注中...',
        forbidClick: true,
        duration: 500,
    });

    console.log(gameStore.gameinfo);
    const data = {
        isGai: true,
        lotType: gameStore.gameinfo.lotType,
        msg: touzhu.value,
        period: gameStore.period
    }
    const res = await apitouzhu(data);
    if (res.data.code != 200) {
        showFailToast("注册失败");
        return;
    }
}


// 监控输入框内容变化
const hasContent = ref(false);
const checkContent = () => {
    hasContent.value = touzhu.value.trim().length > 0;
};
watch(touzhu, (newValue, oldValue) => {
    checkContent();
});
</script>

<style scoped>
.overlay {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 99;
}

.key-box {
    max-width: 750px;
    left: 50%;
    transform: translateX(-50%);
    position: fixed;
    background: #fff;
    border-top: 1px solid #eaeaea;
    width: 100%;
    bottom: 0px;
    height: 52px;
    transition: height 0.3s ease;
    z-index: 999;
}

.key-box.expanded {
    height: 312px;
}

.editBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;

    img {
        width: 30px;
        height: 30px;
    }

    input.inp {
        background: #f5f5f5;
        border: 0;
        height: 35px;
        width: 100%;
        margin: 0 10px;
        padding: 0 10px;
        border-radius: 6px;
    }
}

.keysbox {
    color: #808080;

    .used {
        padding: 10px 20px;
        display: flex;
        justify-content: space-around;
    }
}

.keys {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 5px;
    background: #ededed;

    .item {
        flex: 0 0 calc(20% - 5px);
        margin: 2px;
        padding: 10px 6px;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        border-radius: 6px;
        font-size: 22px;
        color: #808080;
        border: 0;
        height: 48px;
    }

    .long {
        background: #ff453a;
        color: #fff;
    }

    .hu {
        background: #198cff;
        color: #fff;
    }

    .he {
        background: #29a634;
        color: #fff;
        padding: 0;
    }
}

.shanchu {
    display: flex;
    width: 35px;
}
</style>