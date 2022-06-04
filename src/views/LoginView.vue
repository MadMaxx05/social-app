<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue';
import AuthForm from '@/components/AuthForm.vue';
</script>

<template>
  <AuthLayout>
    <template #title>Welcome back</template>
    <template #form><AuthForm type="login" /></template>
  </AuthLayout>
</template>
