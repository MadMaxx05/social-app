<script setup>
import TheIcon from '@/components/TheIcon.vue';
import FooterNavigation from '@/components/FooterNavigation.vue';
</script>

<template>
  <main class="relative mx-auto px-5 py-8 min-h-screen max-w-5-xl">
    <div class="grid justify-items-center gap-5">
      <TheIcon icon="no-results" />
      <div>
        <span class="block text-2xl text-slate-700 text-center font-semibold"
          >Chat is being developed now</span
        >
        <span class="block text-lg text-slate-500 text-center"
          >Stay tuned for updates!</span
        >
      </div>
    </div>
  </main>
  <FooterNavigation class="sticky bottom-0" />
</template>
