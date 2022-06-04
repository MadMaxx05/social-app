<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue';
import AuthForm from '@/components/AuthForm.vue';
</script>

<template>
  <AuthLayout>
    <template #title>Hi there!</template>
    <template #form><AuthForm type="register" /></template>
  </AuthLayout>
</template>
