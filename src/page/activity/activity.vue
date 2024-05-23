<template>
  <div class="main-box">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <div class="kefu">
        <div class="title">在线客服</div>
        <div class="img">
            客服二维码
        </div>
        <div class="tips">
            联系方式：888888 (微信支付宝)
        </div>
    </div>
  </div>
  <tabbar></tabbar>
</template>

<script setup>
 import { ref } from 'vue'
 import tabbar from "@/components/tabbar/tabbar.vue";
</script>

<style scoped>
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 200px;
    text-align: center;
    background-color: #39a9ed;
}
.kefu {
    background: #fff;
    margin: 10px;
    padding: 0 20px 20px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    box-shadow: 1px 2px 10px #ededed;
    .title{
        width: 100%;
        text-align: center;
        font-size: 18px;
        font-weight: 600;
        padding: 10px;
        color: grey;
        border-bottom: 1px solid #e5e5e5;
    }
    .img {
    width: 200px;
    height: 200px;
    background: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
}
}
</style>