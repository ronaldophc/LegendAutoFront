<!-- layouts/admin.vue -->
<template>
  <div class="min-h-screen flex flex-col" v-bind="$attrs">
    <AdminHeader />
    <slot />
    <NuxtSnackbar />
  </div>
</template>

<script setup lang="ts">
import AdminHeader from '~/components/admin/Header.vue';
import { defineComponent } from 'vue';

defineComponent({
  inheritAttrs: false,
});
</script>