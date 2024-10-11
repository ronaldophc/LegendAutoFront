<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const BREAKPOINT = 1025;
const isSmallScreen = ref(false);
const selectedComponent = ref('form');

const updateScreenSize = () => {
  isSmallScreen.value = window.innerWidth < BREAKPOINT;
};

if (process.client) {
  updateScreenSize();
  onMounted(() => {
    window.addEventListener('resize', updateScreenSize);
  });
  onUnmounted(() => {
    window.removeEventListener('resize', updateScreenSize);
  });
}
</script>

<template>
  <div class="admin-settings_body flex-1 flex flex-col lg:flex-row">
    <div v-if="!isSmallScreen || selectedComponent === 'form'" class="admin-settings_form flex-1 flex">
      <AdminSettingsForm/>
    </div>
  </div>
</template>