<template>
    <van-nav-bar
        title="收款管理"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <div class="main-box">
        <div class="type">
            <div class="item">
                <img src="@/assets/money/alipay.png" alt="">
                <span>支付宝</span>
            </div>
            <div class="item">
                <img src="@/assets/money/weixin.png" alt="">
                <span>微信</span>
            </div>
            <div class="item">
                <img src="@/assets/money/yunshanfu.png" alt="">
                <span>云闪付</span>
            </div>
            <div class="item">
                <img src="@/assets/money/yinhangka.png" alt="">
                <span>银行卡</span>
            </div>
            <div class="item">
                <img src="@/assets/money/usdt.png" alt="">
                <span>USDT</span>
            </div>
        </div>
        <div class="qrbox">
            <van-uploader>
                <img src="@/assets/money/qr.png" alt="">
            </van-uploader>
            <span class="tips">点击图案添加收款二维码</span>
            
        </div>
        <van-cell-group inset>
            <van-field v-model="text" label="姓名" placeholder="请输入真实姓名" />
            <van-field v-model="tel" type="tel" label="手机号" placeholder="请输入手机号" />
        </van-cell-group>
    </div>
    <div class="btn">      
      <van-button type="primary" size="large" block >提交绑定</van-button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const onClickLeft = () => history.back();
const number = ref('')
</script>

<style scoped>

.title{
    margin: 10px 0;
}
.amount{
    margin: 10px 0;
    color: #1ca8e9;
}
.type{
    background: #fff;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    .item{
        display: flex;
        flex-direction: column;
        align-items: center;
        img{
            width: 30px;
            height: 30px;
            margin-bottom: 10px;
        }
        span{
            background: #ededed;
            border-radius: 15px;
            padding: 4px 12px;
            font-size: 12px;
        }
    }
}
.qrbox {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background: #fff;
    margin: 15px;
    border-radius: 10px;
    padding: 10px;
    .tips{
        margin-top: 10px;
        color: #808080;
    }
}
.btn{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 15px;
    text-align: center;
    padding: 13px 0;
}
</style>