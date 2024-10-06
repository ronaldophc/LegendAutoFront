<script setup lang="ts">
definePageMeta({
    sanctum: {
        excluded: true,
        guestOnly: true
    }
});

</script>

<template>
  <UContainer class="text-black">
    <NuxtLink to="/meusite/login">Login Admin</NuxtLink>
  </UContainer>
</template>