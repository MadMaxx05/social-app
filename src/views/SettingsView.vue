<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';

import InfoLayout from '@/layouts/InfoLayout.vue';
import ChangeInfo from '@/components/ChangeInfo.vue';
import FooterNavigation from '@/components/FooterNavigation.vue';

const user = ref({});
const interests = ref('');
const interestsToString = computed(() => {
  return user.value.interests.join(', ');
});

const authStore = useAuthStore();
const userStore = useUserStore();

onMounted(async () => {
  window.scrollTo(0, 0);
  try {
    user.value = (await userStore.fetchUser()).data;
  } catch ({ errors }) {
    console.log(errors);
  }

  interests.value = interestsToString.value;
});

async function logout() {
  await authStore.logout();
}
</script>

<template>
  <InfoLayout>
    <template #form>
      <ChangeInfo
        type="editInfo"
        :user="user"
        :interests="interests"
        @logout="logout"
      />
    </template>
    <template #footer>
      <FooterNavigation class="sticky bottom-0" />
    </template>
  </InfoLayout>
</template>
