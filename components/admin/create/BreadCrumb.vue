<script setup lang="ts">

import { ref, onMounted, onUnmounted } from 'vue';

const register = useRegisterStore();

const isSmallScreen = ref(false);

if (process.client) {
  isSmallScreen.value = window.innerWidth < 900;

  const handleResize = () => {
    isSmallScreen.value = window.innerWidth < 900;
  };

  onMounted(() => {
    window.addEventListener('resize', handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });
}

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