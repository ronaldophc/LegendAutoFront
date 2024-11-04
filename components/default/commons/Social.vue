<script setup lang="ts">

const props = defineProps<{
  icon: string;
  link: string;
  backgroundColor: string
}>();
</script>

<template>

  <a :href="link" target="_blank">
    <UIcon :name="icon" :class="backgroundColor" class="w-10 h-10"></UIcon>
  </a>
</template>
