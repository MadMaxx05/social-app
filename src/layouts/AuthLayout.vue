<script setup></script>

<template>
  <div
    class="md:px-12 flex flex-col md:flex-row md:items-center md:justify-start mx-auto bg-blue-600 min-h-screen"
  >
    <h1
      class="px-12 md:px-0 md:pr-12 pt-24 md:pt-0 mb-14 lg:mb-10 text-6xl text-white font-extrabold max-w-2xl mx-auto"
    >
      <slot name="title"></slot>
    </h1>
    <slot name="form"></slot>
  </div>
</template>
