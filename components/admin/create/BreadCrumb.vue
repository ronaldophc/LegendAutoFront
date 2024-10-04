<!-- nuxt/components/admin/create/BreadCrumb.vue -->
<script setup lang="ts">
import { useRegisterStore } from '~/stores/register';
import {ref} from "#imports";

const register = useRegisterStore();
const isSmallScreen = ref(window.innerWidth < 900);

window.addEventListener('resize', () => {
  isSmallScreen.value = window.innerWidth < 900;
});
</script>

<template>
  <div class="flex justify-center items-center w-full my-5">
    <UBreadcrumb :links="register.links" :ui="{li: 'text-blue-500'}">
      <template #default="{ link, isActive, index }">
        <UBadge :class="link.active ? 'bg-green-400' : 'bg-gray-300'" class="rounded-full truncate">
          <span v-if="!isSmallScreen">{{ link.label }}</span>
        </UBadge>
      </template>
    </UBreadcrumb>
  </div>
</template>