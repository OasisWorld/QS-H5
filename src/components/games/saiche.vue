<template>
  <div class="header">
        <div class="title">
            <van-icon name="arrow-left" size="34" @click="onClickLeft" /> <h2>{{ gameStore.gameinfo.name }}</h2> 
        </div>
        <div class="data">
            <div class="item"><p>积分:0.00</p><p>输赢:0.00</p></div>
            <div class="item"><p>流水:0.00</p><p>回水:0.00</p></div>
        </div>
    </div>
    <div class="startgame">
        <div class="data">
            <div class="order">{{ gameStore.gameinfo.next.issue.slice(-5) }}</div>
            <div class="state">封盘中</div>
        </div>
        <div class="button">
            <div class="btn" @click="onzhudan">注单</div>
            <div class="btn" @click="onchanglong">长龙</div>
            <div class="btn" @click="onyuce">预测</div>
        </div>
    </div>
    <div class="history">
        <div class="order">{{ historydata[0].id }}</div>
        <div class="carball">
            <div v-for="(num, index) in historydata[0].result.split(',')" :key="index" class="pknum" :class="'num' + (parseInt(num))">{{ parseInt(num) }}</div>
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
            <van-icon name="bars" color="#1989fa" size="26" />
        </div>
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
            <span >亚军</span>
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
        <div class="item list" v-for="(item, index) in historydata.slice(1,6)" :key="index">
            <div class="order">{{ item.id }}</div>
            <div class="carball">                    
                <div v-for="(num, index) in item.result.split(',')" :key="index" class="pknum" :class="'num' + (parseInt(num))">{{ parseInt(num) }}</div>
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

<script setup>
import { ref,onMounted } from 'vue'
//持久化
import { gameinfoStore } from '@/stores';
const gameStore = gameinfoStore()



const onClickLeft = () => history.back();
//注单开关
const iszhudan = ref(false)
const onzhudan = ()=>{
    iszhudan.value = !iszhudan.value
}

//长龙开关
const ischanglong = ref(false)
const onchanglong = ()=>{
    ischanglong.value = !ischanglong.value
}
//预测开关
const isyuce = ref(false)
const onyuce = ()=>{
    isyuce.value = !isyuce.value
}

//历史开关
const ishistorylist = ref(false)
const onhistorylist = ()=>{
    ishistorylist.value = !ishistorylist.value
}

//历史数据
const historydata = ref([
{
"id": 76360,
"game": 19,
"issue": 20240312121,
"result": "08,02,05,09,06,03,07,10,01,04",
"time": "2024-03-12 23:08:45",
"date": "2024-03-12 00:00:00",
"createTime": "2024-03-12 04:04:06",
"updateTime": "2024-03-12 23:09:03"
},
{
"id": 76359,
"game": 19,
"issue": 20240312120,
"result": "09,05,10,01,02,03,04,08,07,06",
"time": "2024-03-12 23:03:45",
"date": "2024-03-12 00:00:00",
"createTime": "2024-03-12 04:04:06",
"updateTime": "2024-03-12 23:04:03"
}
]);


onMounted(() => {    
    historydata.value = gameStore.gameinfo.history;
    console.log(historydata.value)
})

</script>

<style scoped>
.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    background-image: url('@/assets/nav-bg.png');
    background-size: cover;
    color: #fff;
    .title{
        display: flex;  
        align-items: center;
    }
    .data {
    display: flex;
    .item{
        margin-left: 10px;
    }
    p{
        margin: 6px 0;
        font-size: 18px;
    }
    }
}
.startgame {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 10px;
    .data{
        display: flex;
        align-items: center;
        font-size: 18px;
        .order{
            margin-right: 10px;
            color: #333;
            font-size: 16px;
        }
    }
    .button {
        display: flex;
        align-items: center;
        .btn{
            padding: 6px 10px;
            color: #fff;
            border-radius: 6px;
            background: -webkit-linear-gradient(180deg, #60d0f7,#50a5f7);
            background: linear-gradient(180deg, #60d0f7,#50a5f7);                                     
            margin-left: 10px;
        }
    }
}
.history {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 10px;
    border-bottom: 1px solid #eaeaea;
    border-top: 1px solid #eaeaea;
    .order{
        margin-right: 10px;
        color: #333;
        font-size: 16px;
    }
    .carball {
        display: flex;
    }
    .gyh{
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
    border-radius: 4px;
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
.xiao{
    color: #0092dd;
}
.da{
    color: #ff0000;
}
.dan{
    color: #0092dd;
}
.shuang{
    color: #ff0000;
}
.long{
    color: #ff0000; 
}
.hu{
    color: #0092dd;
}
.zhudan{
    border-bottom: 1px solid #eaeaea;
    .item{
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

.changlong{
    .top{
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
        span{
            width: 20%;
            text-align: center;
        }
    }
    
}
.yuce{
    .top{
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
        span{
            text-align: center;
        }
    }
    .order {
        width: 20%;
        text-align: center;
    }
    .time{
        width: 80%;
        text-align: center;
    }
    .max{
        color: #fff;
        background: #ff0000;
        padding: 5px 6px;
        font-size: 12px;
        border-radius: 4px;
    }
    .min{
        color: #fff;
        background: #2d22fe;
        padding: 5px 6px;
        font-size: 12px;
        border-radius: 4px;
    }
    .shuang{
        color: #fff;
        background: #ff0000;
        padding: 5px 6px;
        font-size: 12px;
        border-radius: 4px;
    }
    .dan{
        color: #fff;
        background: #2d22fe;
        padding: 5px 6px;
        font-size: 12px;
        border-radius: 4px;
    }
}
.historylist{
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
  background-color:#f3f3f3;
}

</style>