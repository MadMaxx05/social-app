<script setup>
import FooterNavigation from '@/components/FooterNavigation.vue';
</script>

<template>
  <main class="mx-auto px-4 py-8 min-h-screen max-w-5-xl">
    <div class="grid gap-8">
      <div v-for="item in 10" :key="item" class="flex gap-4">
        <img
          class="aspect-[9/16] w-[130px] object-cover object-left rounded-md"
          src="@/assets/images/photo1.jpg"
          alt
        />
        <div>
          <p class="text-xl text-slate-700 font-bold">John</p>
          <p class="mb-2.5 text-base text-slate-500">Odesa, Ukraine</p>
          <p class="mb-3 text-base text-slate-700">
            Looking for like-minded people around my area
          </p>
          <div class="flex items-center gap-2 flex-wrap">
            <span
              class="inline-block py-1.5 px-5 text-base text-white border border-solid border-transparent !leading-tight bg-cyan-500 rounded-full"
              >Billiard</span
            >
            <span
              class="inline-block py-1.5 px-5 text-base text-white border border-solid border-transparent !leading-tight bg-green-500 rounded-full"
              >Tennis</span
            >
            <span
              class="inline-block py-1.5 px-5 text-base text-white border border-solid border-transparent !leading-tight bg-violet-500 rounded-full"
              >Programming</span
            >
            <span
              class="inline-block py-1.5 px-5 text-gray-300 border border-solid border-gray-300 rounded-full"
              >+2</span
            >
          </div>
        </div>
      </div>
    </div>
  </main>
  <FooterNavigation class="sticky bottom-0" />
</template>
