<script setup>
import { ref, computed, onMounted } from 'vue';
//持久化
import { gameinfoStore } from '@/stores';
const gameStore = gameinfoStore();
const gameinfo = computed(() => gameStore.gameinfo);
//导入API
import { apiprizeLatest, apiprizeNext, apiprizeOpen, apiprizeOpens, } from '@/api/game';


//倒计时结束事件
const onFinish = () => {
    console.log("倒计时结束了");
    getOpendata();
    getOpenLatest(); //更新最后一起开奖数据
}


//获取下一期开奖信息
const Latestdata = ref();
const CountDowntime = ref(0); //倒计时
const timestamp = Date.now(); //现行时间
const getLatestdata = async () => {
    try {
        const roomCode = gameinfo.value.setting.roomCode;
        const lotType = gameinfo.value.lotType;
        const res = await apiprizeNext(roomCode, lotType);
        if (res.data.code != 200) {
            showFailToast("获取开奖信息失败");
            return;
        }
        Latestdata.value = res.data.data;
        CountDowntime.value = Latestdata.value.openTime - timestamp;
        //console.log(Latestdata.value);

    } catch (error) {
        console.log(error);
    }
}

//获取开奖信息
const getOpendata = async () => {
    try {
        const roomCode = 1001;
        const lotType = gameinfo.value.lotType;
        const period = Latestdata.value.period;
        const res = await apiprizeOpen(roomCode, lotType, period);
        if (res.data.code != 200) {
            showFailToast("获取开奖信息失败");
            return;
        }

        //console.log(res.data.data);

    } catch (error) {
        //console.log(error);
    }
}

//获取开奖列表
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
        const roomCode = gameinfo.value.setting.roomCode;
        const lotType = gameinfo.value.lotType;
        const res = await apiprizeOpens(roomCode, lotType, 10);
        if (res.data.code != 200) {
            showFailToast("获取开奖信息失败");
            return;
        }
        openslist.value = res.data.data;
        console.log(res.data.data);

    } catch (error) {
        console.log(error);
    }
}

//获取房间最后一期开奖数据
const OpenLatest = ref([
    {
        "content": "09,05,03,01,02,07,10",
        "period": 33138296
    }
]);
const getOpenLatest = async () => {
    try {
        const roomCode = gameinfo.value.setting.roomCode;
        const lotType = gameinfo.value.lotType;
        const res = await apiprizeLatest(roomCode, lotType);
        if (res.data.code != 200) {
            showFailToast("获取开奖信息失败");
            return;
        }
        OpenLatest.value = res.data.data;
        console.log('开奖信息' + OpenLatest.value.period);
        gameStore.setperiod(OpenLatest.value.period)
        if (res.data.data.isFengPan) {
            CountDowntime.value = 0;
            getLatestdata(); //获取下一期开奖信息
            getOpenslist(); //更新开奖数据列表
        }
        //console.log(res.data.data);

    } catch (error) {
        console.log(error);
    }
}




const onClickLeft = () => history.back();
//注单开关
const iszhudan = ref(false)
const onzhudan = () => {
    iszhudan.value = !iszhudan.value
}

//长龙开关
const ischanglong = ref(false)
const onchanglong = () => {
    ischanglong.value = !ischanglong.value
}
//预测开关
const isyuce = ref(false)
const onyuce = () => {
    isyuce.value = !isyuce.value
}

//历史开关
const ishistorylist = ref(false)
const onhistorylist = () => {
    ishistorylist.value = !ishistorylist.value
}



onMounted(() => {
    getLatestdata();
    getOpenslist();
    getOpenLatest();
})

</script>


<template>
    <div class="header">
        <div class="gotu">
            <van-icon name="arrow-left" size="34" @click="onClickLeft" />
        </div>
        <div class="tab">
            <span class="activa">投注</span>
            <span>记录</span>
            <span @click="$router.push('/trend/' + gameinfo.lotType)">走势</span>
            <span>开奖</span>
        </div>
        <div class="title">
            {{ gameinfo ? gameinfo.lotName : '器件28' }}
        </div>

    </div>
    <div class="startgame">
        <div class="data">
            <div class="order">{{ Latestdata ? Latestdata.period.toString().slice(-5) : '001' }} 期</div>
            <div class="state">截至 <span><van-count-down :time="CountDowntime" @finish="onFinish" /></span></div>
        </div>
        <div class="jifen">
            <div class="item">
                <span>积分:48,000.71</span>
                <span class="up">输赢:+20,056.25</span>
            </div>
            <div class="item">
                <span>流水:7400</span>
                <span>回水:+0.25</span>
            </div>
        </div>

    </div>
    <div class="history">
        <div class="order">{{ OpenLatest.period ? OpenLatest.period.toString().slice(-5) : '001' }} 期</div>
        <div class="carball" v-if="OpenLatest.content">
            <div v-for="(num, index) in OpenLatest.content.split(',')" :key="index" class="pknum"
                :class="'num' + (parseInt(num))">{{ parseInt(num) }}</div>
        </div>
        <div class="carball" v-else>
            数据加载中...
        </div>
        <div class="gyh">
            <div class="name">冠亚和</div>
            <div class="item">
                <div class="num">11</div>
                <div class="daxiao da">大</div>
                <div class="danshuang dan">单</div>
            </div>
        </div>
        <div class="ico" @click="onhistorylist">
            <van-icon name="play" color="#c340d6" />
        </div>
    </div>
    <div class="kuozhan">
        <div class="wanfa">玩法说明</div>
        <div class="video"><img src="@/assets/chat/video.png" alt=""></div>
        <div class="button">
            <div class="btn" @click="onzhudan">注单</div>
            <div class="btn" @click="onchanglong">长龙</div>
            <div class="btn" @click="onyuce">预测</div>
        </div>
        <!-- <div class="anniu"><van-icon name="play" color="#c340d6" /></div> -->
    </div>
    <div class="zhudan" v-show="iszhudan">
        <div class="item">
            <div class="top">
                <div class="order">第3308066期</div>
                <div class="zhushu">注单总数：9注</div>
                <div class="shouyi">135822.00</div>
            </div>
            <div class="down">
                <div class="carball">
                    <div class="pknum num1">1</div>
                    <div class="pknum num2">2</div>
                    <div class="pknum num3">3</div>
                    <div class="pknum num4">4</div>
                    <div class="pknum num5">5</div>
                    <div class="pknum num6">6</div>
                    <div class="pknum num7">7</div>
                    <div class="pknum num8">8</div>
                    <div class="pknum num9">9</div>
                    <div class="pknum num10">10</div>
                </div>
                <div class="shuying">
                    输赢收益
                </div>
            </div>
        </div>
        <div class="item">
            <div class="top">
                <div class="order">第3308066期</div>
                <div class="zhushu">注单总数：9注</div>
                <div class="shouyi">135822.00</div>
            </div>
            <div class="down">
                <div class="carball">
                    <div class="pknum num1">1</div>
                    <div class="pknum num2">2</div>
                    <div class="pknum num3">3</div>
                    <div class="pknum num4">4</div>
                    <div class="pknum num5">5</div>
                    <div class="pknum num6">6</div>
                    <div class="pknum num7">7</div>
                    <div class="pknum num8">8</div>
                    <div class="pknum num9">9</div>
                    <div class="pknum num10">10</div>
                </div>
                <div class="shuying">
                    输赢收益
                </div>
            </div>
        </div>
        <div class="item">
            <div class="top">
                <div class="order">第3308066期</div>
                <div class="zhushu">注单总数：9注</div>
                <div class="shouyi">135822.00</div>
            </div>
            <div class="down">
                <div class="carball">
                    <div class="pknum num1">1</div>
                    <div class="pknum num2">2</div>
                    <div class="pknum num3">3</div>
                    <div class="pknum num4">4</div>
                    <div class="pknum num5">5</div>
                    <div class="pknum num6">6</div>
                    <div class="pknum num7">7</div>
                    <div class="pknum num8">8</div>
                    <div class="pknum num9">9</div>
                    <div class="pknum num10">10</div>
                </div>
                <div class="shuying">
                    输赢收益
                </div>
            </div>
        </div>
        <div class="tips">
            数据全部加载完成
        </div>
    </div>
    <div class="changlong" v-show="ischanglong">
        <div class="top">
            <span>序号</span>
            <span>位置</span>
            <span>结果</span>
            <span>连期</span>
        </div>
        <div class="item">
            <span>1</span>
            <span>第七名</span>
            <span>单</span>
            <span>5</span>
        </div>
        <div class="item">
            <span>2</span>
            <span>第七名</span>
            <span>单</span>
            <span>5</span>
        </div>
        <div class="item">
            <span>3</span>
            <span>亚军</span>
            <span>单</span>
            <span>5</span>
        </div>
        <div class="item">
            <span>4</span>
            <span>第八名</span>
            <span>单</span>
            <span>5</span>
        </div>
        <div class="item">
            <span>5</span>
            <span>第九名</span>
            <span>双</span>
            <span>5</span>
        </div>

    </div>
    <div class="yuce" v-show="isyuce">
        <div class="top">
            <div class="order">名次</div>
            <div class="time">开奖时间</div>
        </div>
        <div class="item">
            <span>冠军</span>
            <span>5,4,10,3,9</span>
            <span class="max">大</span>
            <span class="dan">单</span>
        </div>
        <div class="item">
            <span>亚军</span>
            <span>5,4,10,3,9</span>
            <span class="max">大</span>
            <span class="shuang">双</span>
        </div>
        <div class="item">
            <span>第三名</span>
            <span>5,4,10,3,9</span>
            <span class="min">大</span>
            <span class="dan">单</span>
        </div>
        <div class="item">
            <span>第四名</span>
            <span>5,4,10,3,9</span>
            <span class="max">大</span>
            <span class="shuang">双</span>
        </div>
        <div class="item">
            <span>第五名</span>
            <span>5,4,10,3,9</span>
            <span class="max">大</span>
            <span class="dan">单</span>
        </div>
    </div>

    <div class="historylist" v-show="ishistorylist">
        <div class="item hui">
            <div class="order">期号</div>
            <div class="carball">
                <div class="pknum2">一</div>
                <div class="pknum2">二</div>
                <div class="pknum2">三</div>
                <div class="pknum2">四</div>
                <div class="pknum2">五</div>
                <div class="pknum2">六</div>
                <div class="pknum2">七</div>
                <div class="pknum2">八</div>
                <div class="pknum2">九</div>
                <div class="pknum2">十</div>
            </div>
            <div class="gyh">
                冠亚和
            </div>
            <div class="longhu">
                1-5龙虎
            </div>
        </div>
        <div class="item list" v-for="(item, index) in openslist.slice(1, 10)" :key="index">
            <div class="order">{{ item.period.toString().slice(-5) }}</div>
            <div class="carball">
                <div v-for="(num, index) in item.content.split(',')" :key="index" class="pknum"
                    :class="'num' + (parseInt(num))">{{ parseInt(num) }}</div>
            </div>
            <div class="gyh">
                <span class="sum">11</span>
                <span class="max">大</span>
                <span class="dan">单</span>
            </div>
            <div class="longhu">
                <span class="long">龙</span>
                <span class="hu">虎</span>
                <span class="hu">虎</span>
                <span class="hu">虎</span>
                <span class="hu">虎</span>
            </div>
        </div>
    </div>

</template>



<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    height: 50px;
    background-image: url('@/assets/header-bg.png');
    background-size: cover;
    color: #fff;

    .tab {
        flex: 1;
        display: flex;
        justify-content: space-between;
        font-size: 18px;
        background: linear-gradient(360deg, #3D2A56 0%, #513D6F 48%, #3D2A56 100%);
        color: #dc59ef;
        margin: 0 10px;
        border-radius: 4px;

        span {
            width: 25%;
            padding: 8px 0;
            text-align: center;

        }

        .activa {
            background: linear-gradient(360deg, #735398 0%, #583d73 48%, #A95DC1 100%);
            margin: 2px;
            color: #fcfa81;
            font-weight: 600;
            border-radius: 4px;
            border: 1px solid;
            border-image-source: linear-gradient(132deg, #E3C9F8 0%, #9A6CCE 100%);
            border-image-slice: 1;
        }
    }

    .title {
        background: linear-gradient(360deg, #3D2A56 0%, #513D6F 48%, #3D2A56 100%);
        padding: 10px;
        border-radius: 4px;
        color: #dc59ef;
        font-size: 18px;
    }
}

.startgame {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 10px;

    .data {
        display: flex;
        align-items: center;
        font-size: 18px;

        .order {
            margin-right: 10px;
            color: #05c465;
            font-size: 16px;
            font-weight: 600;
        }
    }

    .jifen {
        display: flex;
        font-size: 15px;

        .item {
            display: flex;
            flex-direction: column;
            margin-left: 10px;
            color: #2f3033;
        }

        .up {
            color: #e55c5c;
        }
    }

    .state {
        display: flex;
        font-size: 14px;
        color: #fff !important;

        span {
            margin-left: 6px;
            color: #c340d6;
            font-size: 18px;
            font-weight: 600;
        }
    }
}

.history {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 10px;
    color: #fff !important;

    .order {
        margin-right: 10px;
        color: #333;
        font-size: 16px;
    }

    .carball {
        display: flex;
    }

    .gyh {
        font-size: 14px;
        color: #333;

        .item {
            display: flex;
            align-items: center;
        }
    }
}

.pknum2 {
    width: 22px;
    height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 1px;
    font-size: 16px;
    border-radius: 50%;
    color: #666;
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
    border-radius: 50%;
    color: #fff;
}

.num1 {
    background: #e6de00;
}

.num2 {
    background: #0092dd;
}

.num3 {
    background: #4b4b4b;
}

.num4 {
    background: #ff7600;
}

.num5 {
    background: #17e2e5;
}

.num6 {
    background: #5234ff;
}

.num7 {
    background: #bfbfbf;
}

.num8 {
    background: #ff2600;
}

.num9 {
    background: #780b00;
}

.num10 {
    background: #07bf00;
}

.xiao {
    color: #0092dd;
}

.da {
    color: #ff0000;
}

.dan {
    color: #0092dd;
}

.shuang {
    color: #ff0000;
}

.long {
    color: #ff0000;
}

.hu {
    color: #0092dd;
}

.zhudan {
    border-bottom: 1px solid #eaeaea;

    .item {
        padding: 10px;
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #eaeaea;

        .top {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
        }

        .down {
            display: flex;
            justify-content: space-between;

            .carball {
                display: flex;
            }
        }
    }

    .tips {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        color: #666666;
    }
}

.changlong {
    .top {
        padding: 10px 40px;
        display: flex;
        justify-content: space-between;
    }

    .item {
        display: flex;
        justify-content: space-between;
        padding: 8px 20px;
        color: #666;
        border-top: 1px solid #eaeaea;

        span {
            width: 20%;
            text-align: center;
        }
    }

}

.yuce {
    .top {
        padding: 10px;
        display: flex;
        justify-content: space-between;
    }

    .item {
        display: flex;
        border-top: 1px solid #eaeaea;
        padding: 10px 30px;
        align-items: center;
        justify-content: space-between;

        span {
            text-align: center;
        }
    }

    .order {
        width: 20%;
        text-align: center;
    }

    .time {
        width: 80%;
        text-align: center;
    }

    .max {
        color: #fff;
        background: #ff0000;
        padding: 5px 6px;
        font-size: 12px;
        border-radius: 4px;
    }

    .min {
        color: #fff;
        background: #2d22fe;
        padding: 5px 6px;
        font-size: 12px;
        border-radius: 4px;
    }

    .shuang {
        color: #fff;
        background: #ff0000;
        padding: 5px 6px;
        font-size: 12px;
        border-radius: 4px;
    }

    .dan {
        color: #fff;
        background: #2d22fe;
        padding: 5px 6px;
        font-size: 12px;
        border-radius: 4px;
    }
}

.historylist {
    padding: 0 0 10px 0;

    .item {
        display: flex;
        padding: 10px;
        font-size: 14px;
        justify-content: space-between;
        align-items: center;

        .carball {
            display: flex;
        }
    }
}

.item.hui {
    color: #666;
}

.historylist .item:nth-child(odd) {
    background-color: #f3f3f3;
}

.kuozhan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    padding: 6px 0;

    .wanfa {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        background-image: url('@/assets/chat/wanfa_bg.png');
        background-size: cover;
        height: 47px;
        width: 100px;
    }

    .video img {
        width: 35px;
    }

    .button {
        display: flex;
    }

    .btn {
        background: #c340d6;
        padding: 8px 16px;
        border-radius: 6px;
        color: #fff;
        margin: 6px;
    }

    .anniu {
        padding: 10px;
    }
}
.van-count-down {
    color: #fff !important;
}
.item span, .num {
    color: #fff !important;
}
.gyh .name {
    color: white !important;
}
.history .order {
    color: white !IMPORTANT;
}
</style>