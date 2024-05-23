<template>
    <van-nav-bar
        title="积分记录"
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
        </div>
        <div class="contanier">
            <div class="line">
                <span>全部记录</span>
                <span>筛选<van-icon name="arrow-down" /></span>
            </div>
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
</style>