<script setup>
// import { passwordStore } from "@/stores/passwordStore.js";
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";
// const route = useRoute();
// const passwordStore = useAuthStore();

// onBeforeMount(() => {
//   authService.checkCookies();
// });
</script>

<template>

  <div class="block-main ">
    <router-view class="router-main"></router-view>
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
