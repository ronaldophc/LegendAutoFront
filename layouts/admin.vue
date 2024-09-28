<!-- layouts/admin.vue -->
<template>
  <div class="min-h-screen flex flex-col">
    <AdminHeader/>
    <slot />
    <NuxtSnackbar />
  </div>
</template>

<script setup lang="ts">
import AdminHeader from '~/components/admin/AdminHeader.vue';
</script>