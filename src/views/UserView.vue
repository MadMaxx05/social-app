<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';

import TheIcon from '@/components/TheIcon.vue';
import HeaderNavigation from '@/components/HeaderNavigation.vue';
import FooterNavigation from '@/components/FooterNavigation.vue';

const route = useRoute();
const userStore = useUserStore();
const username = ref(route.params.username);
const user = ref({});

onMounted(async () => {
  window.scrollTo(0, 0);
  try {
    user.value = (await userStore.fetchUserByUsername(username.value)).data;
  } catch (error) {
    console.log(error);
  }
});

function colorPallette(index) {
  const colors = {
    0: 'bg-cyan-500',
    1: 'bg-yellow-500',
    2: 'bg-purple-500',
    3: 'bg-green-500',
    4: 'bg-orange-500',
  };

  return colors[index];
}
</script>

<template>
  <HeaderNavigation class="sticky top-0 z-10" />
  <main class="relative mx-auto px-5 py-8 min-h-screen max-w-5-xl">
    <div v-if="user" class="grid gap-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-4">
          <img
            class="w-[70px] h-[70px] rounded-full"
            src="@/assets/images/no-avatar.png"
            alt
          />
          <div>
            <p class="text-xl text-slate-700 font-bold">{{ user.fullName }}</p>
            <p class="text-base text-slate-500">@{{ user.username }}</p>
          </div>
        </div>
        <div>
          <span
            class="inline-block py-1.5 px-5 text-blue-500 border border-solid border-blue-500 rounded-full"
            >Follow</span
          >
        </div>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <span
          v-for="interest in user.interests"
          :key="interest"
          :class="colorPallette(Math.floor(Math.random() * 5))"
          class="inline-block py-1.5 px-5 text-base text-white border border-solid border-transparent !leading-tight rounded-full"
          >{{ interest }}</span
        >
      </div>
      <div class="flex items-center gap-1">
        <TheIcon icon="location" />
        <div v-if="user.country || user.city">
          <span v-if="user.country" class="mb-2.5 text-base text-slate-500">{{
            user.country
          }}</span>
          <span
            v-if="user.country && user.city"
            class="mb-2.5 text-base text-slate-500"
            >,
          </span>
          <span v-if="user.city" class="mb-2.5 text-base text-slate-500">{{
            user.city
          }}</span>
        </div>
      </div>
      <div class="flex items-center gap-1">
        <TheIcon icon="document" />
        <p class="text-base text-slate-700">
          {{ user.description }}
        </p>
      </div>
      <div class="flex items-center gap-1">
        <TheIcon icon="message" />
        <p class="text-base text-slate-700">
          {{ user.contact }}
        </p>
      </div>
    </div>
  </main>
  <FooterNavigation class="sticky bottom-0" />
</template>
