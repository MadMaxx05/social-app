<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';

import TheIcon from '@/components/TheIcon.vue';

const userStore = useUserStore();
const query = ref('');
const isFocused = ref(false);

async function resetInput() {
  query.value = '';
  isFocused.value = false;
  await searchUsers();
}

async function searchUsers() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (query.value.length > 0) {
    try {
      userStore.users = (await userStore.findUsers(query.value)).data;
    } catch (errors) {
      console.log(errors);
    }
  } else {
    try {
      userStore.users = (await userStore.fetchUsers()).data;
    } catch (errors) {
      console.log(errors);
    }
  }
}
</script>

<template>
  <div class="py-5 px-4 bg-white border-b border-solid border-gray-200">
    <div :class="{ 'pl-9': isFocused }" class="relative transition-all">
      <button
        @click="resetInput"
        v-show="isFocused"
        class="absolute top-1/2 -translate-y-1/2 left-0"
      >
        <TheIcon icon="arrow-left" />
      </button>
      <input
        class="py-2 px-5 w-full border border-solid border-gray-300 focus:border-blue-600 rounded-full text-lg text-slate-700 placeholder-gray-400 outline-0"
        type="text"
        placeholder="Search for interest"
        v-model="query"
        @keyup="searchUsers"
        @focus="isFocused = true"
      />
    </div>
  </div>
</template>
