<script setup lang="ts">

const props = defineProps<{
  facebook: string;
  instagram: string;
  tiktok: string;
  backgroundColor: string
}>();
</script>

<template>
  <div class="flex gap-2">
    <a v-if="facebook" :href="facebook" target="_blank">
      <UIcon name="i-ic:baseline-facebook" :class="backgroundColor" class="w-10 h-10"></UIcon>
    </a>
    <a v-if="instagram" :href="instagram" target="_blank">
      <UIcon name="i-mdi:instagram" :class="backgroundColor" class="w-10 h-10"></UIcon>
    </a>
    <a v-if="tiktok" :href="tiktok" target="_blank">
      <UIcon name="i-ic:baseline-tiktok" :class="backgroundColor" class="w-10 h-10"></UIcon>
    </a>
  </div>
</template>
