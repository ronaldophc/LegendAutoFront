<script setup lang="ts">
definePageMeta({
  layout: 'default',
  sanctum: {
    excluded: true,
    guestOnly: true
  }
});

</script>

<template>
  <DefaultContact/>
</template>

<style scoped>

</style>