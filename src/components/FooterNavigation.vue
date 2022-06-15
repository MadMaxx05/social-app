<script setup>
import TheIcon from '@/components/TheIcon.vue';
</script>

<template>
  <div
    class="py-5 flex justify-around z-10 bg-white border-t border-solid border-gray-200"
  >
    <router-link class="relative" to="/chat">
      <TheIcon icon="chat" />
      <span
        class="absolute -bottom-3 left-1/2 -translate-x-1/2 inline-block w-[7px] h-[7px] bg-purple-500 rounded-full opacity-0"
      ></span>
    </router-link>
    <router-link class="relative" to="/">
      <TheIcon icon="discovery" />
      <span
        class="absolute -bottom-3 left-1/2 -translate-x-1/2 inline-block w-[7px] h-[7px] bg-violet-500 rounded-full opacity-0"
      ></span>
    </router-link>
    <router-link class="relative" to="/settings">
      <TheIcon icon="settings" />
      <span
        class="absolute -bottom-3 left-1/2 -translate-x-1/2 inline-block w-[7px] h-[7px] bg-blue-500 rounded-full opacity-0"
      ></span>
    </router-link>
  </div>
</template>

<style scoped>
.router-link-active span {
  opacity: 100%;
}
</style>
