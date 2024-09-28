<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  sanctum: {
    excluded: true,
    guestOnly: true
  }
});
</script>

<template>
  <AdminCreate />
</template>

<style scoped>

</style>