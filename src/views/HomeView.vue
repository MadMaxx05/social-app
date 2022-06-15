<script setup>
import router from '@/router/index';
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import SearchUser from '@/components/SearchUser.vue';
import FooterNavigation from '@/components/FooterNavigation.vue';
import TheIcon from '@/components/TheIcon.vue';

const userStore = useUserStore();

onMounted(async () => {
  window.scrollTo(0, 0);
  try {
    userStore.users = (await userStore.fetchUsers()).data;
  } catch (errors) {
    console.log(errors);
  }
});
</script>

<template>
  <SearchUser class="sticky top-0 z-10" />
  <main class="relative mx-auto px-5 py-8 min-h-screen max-w-5-xl">
    <div v-if="userStore.users?.length" class="grid gap-8">
      <div
        v-for="user in userStore.users"
        :key="user"
        class="flex gap-5"
        @click="
          router.push({ name: 'user', params: { username: user.username } })
        "
      >
        <img
          class="w-[80px] h-[80px] rounded-full"
          src="@/assets/images/no-avatar.png"
          alt
        />
        <div>
          <p class="text-xl text-slate-700 font-bold">{{ user.fullName }}</p>
          <div v-if="user.country || user.city" class="mb-1">
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
          <p class="mb-3 text-base text-slate-700">{{ user.description }}</p>
          <div class="flex items-center gap-2 flex-wrap">
            <span
              v-for="(interest, index) in user.interests.slice(0, 3)"
              :key="interest"
              :class="[
                index === 0
                  ? 'bg-green-500'
                  : index === 1
                  ? 'bg-blue-500'
                  : index === 2
                  ? 'bg-violet-500'
                  : '',
              ]"
              class="inline-block py-1.5 px-5 text-base text-white border border-solid border-transparent !leading-tight rounded-full"
              >{{ interest }}</span
            >
            <span
              v-if="user.interests.length - 3 > 0"
              class="inline-block py-1.5 px-5 text-gray-300 border border-solid border-gray-300 rounded-full"
              >+{{ user.interests.length - 3 }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <div v-if="!userStore.users?.length">
      <div class="grid justify-items-center gap-5">
        <TheIcon icon="no-results" />
        <div>
          <span class="block text-2xl text-slate-700 text-center font-semibold"
            >No results</span
          >
          <span class="block text-lg text-slate-500 text-center"
            >Try a more generic interest</span
          >
        </div>
      </div>
    </div>
  </main>
  <FooterNavigation class="sticky bottom-0" />
</template>
