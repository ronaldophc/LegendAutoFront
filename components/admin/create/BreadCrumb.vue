<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import {useBreadCrumbStore} from "~/stores/breadCrumb";
const breadCrumb = useBreadCrumbStore();
const isSmallScreen = ref(false);
const BREAKPOINT_WIDTH = 900;

function checkScreenSize() {
  isSmallScreen.value = window.innerWidth < BREAKPOINT_WIDTH;
}

function registerResizeEvent() {
  window.addEventListener('resize', checkScreenSize);
  checkScreenSize();
}

function unregisterResizeEvent() {
  window.removeEventListener('resize', checkScreenSize);
}

if (process.client) {
  onMounted(registerResizeEvent);
  onUnmounted(unregisterResizeEvent);
}
</script>

<template>
  <div class="flex justify-center items-center w-full my-5">
    <UBreadcrumb :links="breadCrumb.vehicleLinks" :ui="{li: 'text-blue-500'}">
      <template #default="{ link, isActive, index }">
        <UBadge :class="link.active ? 'bg-green-400' : 'bg-gray-300'" class="rounded-full truncate">
          <span v-if="!isSmallScreen">{{ link.label }}</span>
        </UBadge>
      </template>
    </UBreadcrumb>
  </div>
</template>