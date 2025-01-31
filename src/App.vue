<script setup>
</script>
<template>
  <div class="block-main ">
    <transition name="fade" mode="out-in">
      <router-view class="router-main"></router-view>
    </transition>
  </div>

</template>
<style>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.router-main {
  display: block;
}

.block-main {
  position: relative;
  min-height: 100vh;
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.50s ease-out;
}
</style>
