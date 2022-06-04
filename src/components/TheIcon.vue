<script setup>
const props = defineProps({
  icon: String,
});

function getIcon(icon) {
  return `src/assets/icons/${icon}.svg`;
}
</script>

<template>
  <img
    class="select-none"
    :src="getIcon(props.icon)"
    width="24"
    height="24"
    alt
  />
</template>
