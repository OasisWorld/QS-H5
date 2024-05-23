<template>
  <div class="mian-box">
    <div class="header">
      <div class="name">钱包中心</div>
      <!-- <div class="kefu">在线客服</div> -->
    </div>
    <div class="moneybox">
      <div class="asset">
        <div class="num">365525.80 <van-button type="success" size="small" class="qukuan" @click="$router.push('/money/charge')"><van-icon name="after-sale" /> 提现</van-button></div>
        <span>总资产(元)</span>
      </div>
      <div class="extend">
        <div class="l">
          <div class="num">325.80</div>
          <span>可用金额</span>
        </div>
        <div class="r">
          <div class="num">36553325.80</div>
          <span>累计收益</span>
        </div>
      </div>
    </div>
    <div class="tool">
      
    <van-button icon="gold-coin-o" type="primary" size="large" block @click="$router.push('/money/pay')">存款充值</van-button>
    </div>
  </div>
  <tabbar></tabbar>
</template>

<script setup>
 import { ref } from 'vue'
 import tabbar from "@/components/tabbar/tabbar.vue";
</script> 

<style scoped>
.header {
  display: flex;
    justify-content: space-between;
    background-image: url("@/assets/money.png");
    padding: 100px 20px 10px 20px;
    background-size: cover;
    height: 80px;
    border-radius: 0 0 10% 10%;
    color: #fff;
    .name{
      font-size: 22px;
      font-weight: 600;
    }
}
.moneybox {
    position: relative;
    background: #fff;
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
    border-radius: 14px;
    box-shadow: 1px 2px 10px #ededed;
    margin-top: -20px;
    overflow: hidden;
    .extend {
        display: flex;
    }
}
.name {
    margin: 0 auto;
}
.num {
    color: rgba(195, 64, 214, 1) !important;
}
.asset{
  .num{
    font-size: 36px;
    font-weight: 600;
    color: #3a3a3a;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  span{
    color: #969696;
  }
}
.extend{
  margin-top: 20px;
  .r{
    margin-left: 30px;
  }
  .num{
    font-size: 28px;
    font-weight: 600;
    color: #3a3a3a;
  }
  span{
    color: #969696;
  }
}
.tool{
  margin: 20px;
}
.num .qukuan {
    background: rgba(195, 64, 214, 1);
    border: navajowhite;
    padding: 20px;
    font-size: 15px;
    font-weight: 100;
    border-radius: 35px;
    margin-right: -21px;
}
</style>