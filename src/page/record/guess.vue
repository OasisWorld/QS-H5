<template>
    <van-nav-bar
        title="竞猜记录"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <div class="main-box">
        <div class="header">
            <div class="tab">
            <div class="item active">今日</div>
            <div class="item">昨日</div>
        </div>
        <div class="date">{{ convertedDate }} - {{ convertedDate }}</div>
        <div class="total">
            <div class="item">
                <span>0</span>
                总注单
            </div>
            <div class="item">
                <span>0</span>
                总注额
            </div>
            <div class="item">
                <span>0</span>
                有效额
            </div>
        </div>
        <div class="total-sub">
            <div class="iconbiao"></div>
            <div class="result">
                <div class="item">投注总结果<span>0</span></div>
                <div class="item">投注返利<span>0</span></div>
            </div>            
        </div>
        </div>
        <div class="contanier">
            <div class="nodata">
                <van-empty image-size="100" description="暂无更多" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const onClickLeft = () => history.back();

const today = new Date().toLocaleDateString();
const convertedDate = today.replace(/\//g, '-').replace(/(?<=\d)-(?=\d)/g, '-');

</script>

<style scoped>
.header{
    background: #fff;
    padding: 20px;
    .tab{
        display: flex;
        justify-content: space-around;
        border: 1px solid #4fa2f7;
        border-radius: 15px;
        color: #4fa2f7;
        font-size: 16px;
        align-items: center;
    }
    .date {
    background: #f5f9ff;
    margin-top: 10px;
    color: #79828d;
    font-size: 13px;
    text-align: center;
    border-radius: 15px;
    padding: 5px 0;
}
}
.tab .item:last-child {
    border-radius: 0 15px 15px 0;
}
.tab .item:first-child {
    border-radius: 15px 0 0 15px;
}
.tab .item {
    flex: 1 1 auto;
    text-align: center;
    padding: 5px 0;
}
.tab .item.active {
    color: #fff;
    background: #4fa2f7;
}
.contanier {
    background: #fff;
    margin-top: 10px;
    padding: 10px;
    .line {
        padding: 10px;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #5e5e5e;
        border-bottom: 1px solid #eee;
    }
    .nodata {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}
.total {
    display: flex;
    justify-content: space-around;
    margin: 12px 0;
    .item{
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #79828d;
        font-size: 14px;
        span{
            color: #000;
            font-size: 18px;
            font-weight: 600;
        }
    }
}
.total-sub {
    margin-top: 15px;
    position: relative;
}
.total-sub .result {
    background: #f5f9ff;
    margin-top: 10px;
    color: #79828d;
    font-size: 13px;
    text-align: center;
    border-radius: 15px;
    padding: 5px 0;
    display: flex;
    justify-content: space-around;
    span{
        margin-left: 5px;
        color: green;
    }
}
.total-sub .iconbiao {
    position: absolute;
    bottom: 26px;
    left: 0;
    width: 0;
    margin: auto;
    right: 0;
    height: 0;
    display: inline-block;
    border: 15px solid transparent;
    border-bottom: 15px solid #f5f9ff;
}
</style>