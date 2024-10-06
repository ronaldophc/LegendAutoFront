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
    <AdminSettings />
</template>