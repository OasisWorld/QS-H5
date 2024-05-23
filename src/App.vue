<template>
  <transition name="slide">
    <router-view></router-view>
  </transition>
</template>


<script setup>
import { ref } from 'vue'
</script>

<style scoped>
.slide-enter-from, .slide-leave-to {
  transform: translateX(100%);
}
.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s ease-in-out;
}
</style>

