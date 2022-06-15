<script setup>
import router from '@/router/index';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import AuthLayout from '@/layouts/AuthLayout.vue';
import AuthForm from '@/components/AuthForm.vue';

const authStore = useAuthStore();

const errors = ref('');

async function onSubmit({ username, password }) {
  try {
    await authStore.register({ username, password });
    router.push({ name: 'info' });
  } catch ({ response }) {
    errors.value = response.data.message;
  }
}
</script>

<template>
  <AuthLayout>
    <template #title>Hi there!</template>
    <template #form
      ><AuthForm type="register" :errors="errors" @submit="onSubmit"
    /></template>
  </AuthLayout>
</template>
