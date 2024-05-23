<template>
    <van-nav-bar
        title="提现"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <div class="main-box">
        <div class="title">上分金额</div>
        <van-field v-model="number" type="number" placeholder="请输入提现金额(100-50000)" />
        <div class="amount">当前额度：0</div>
        <van-button type="primary" size="large" block >提交请求</van-button>
        <p></p>
        <van-button plain type="primary" block @click="onClickLeft">返回钱包</van-button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const onClickLeft = () => history.back();
const number = ref('')
</script>

<style scoped>
.main-box {
    padding: 10px 15px;
}
.title{
    margin: 10px 0;
}
.amount{
    margin: 10px 0;
    color: #1ca8e9;
}
</style>