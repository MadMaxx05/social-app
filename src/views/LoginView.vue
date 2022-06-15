<script setup>
import { ref } from 'vue';
import router from '@/router/index';
import { useAuthStore } from '@/stores/auth';
import AuthLayout from '@/layouts/AuthLayout.vue';
import AuthForm from '@/components/AuthForm.vue';

const authStore = useAuthStore();
const errors = ref('');

async function onSubmit({ username, password }) {
  try {
    const response = (await authStore.login({ username, password })).data;
    await authStore.setToken(response.token);
    router.push({ name: 'home' });
  } catch ({ response }) {
    errors.value = response.data.message;
  }
}
</script>

<template>
  <AuthLayout>
    <template #title>Welcome back</template>
    <template #form
      ><AuthForm type="login" :errors="errors" @submit="onSubmit"
    /></template>
  </AuthLayout>
</template>
