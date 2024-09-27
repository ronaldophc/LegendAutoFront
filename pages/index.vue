<script setup lang="ts">
import AdminHeader from '~/components/admin/AdminHeader.vue';
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

<style scoped></style>