<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
  sanctum: {
    excluded: true,
    guestOnly: true
  }
});
</script>

<template>
    <AdminSettings/>
</template>