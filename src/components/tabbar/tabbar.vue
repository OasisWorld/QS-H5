<template>
  <van-tabbar v-model="active" route>
    <van-tabbar-item to="/activity" icon="envelop-o">消息</van-tabbar-item>
    <van-tabbar-item to="/">
      <span>游戏</span>
      <template #icon="props">
        <img :src="props.active ? icon.active : icon.inactive" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/money" icon="gold-coin">钱包</van-tabbar-item>
    <van-tabbar-item to="/user" icon="user">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { ref } from 'vue';
const active = ref(0);
const icon = {
    active: '/src/assets/tabbar/index-a.png',
    inactive: '/src/assets/tabbar/index.png',
};
</script>

<style scoped>

</style>