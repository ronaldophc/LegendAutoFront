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
  <Default />
</template>