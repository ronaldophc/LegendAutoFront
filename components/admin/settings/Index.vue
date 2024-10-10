<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const BREAKPOINT = 1025;
const isSmallScreen = ref(false);
const selectedComponent = ref('form');

const updateScreenSize = () => {
  isSmallScreen.value = window.innerWidth < BREAKPOINT;
};

const displayForm = () => {
  selectedComponent.value = 'form';
};

const displayHours = () => {
  selectedComponent.value = 'hours';
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
    <div v-if="isSmallScreen" class="admin-settings_menu flex justify-center gap-4 bg-blue-200 p-2">
      <button @click="displayForm" :class="{'text-blue-600': selectedComponent === 'form'}" class="px-4 py-2">Informações
      </button>
      <button @click="displayHours" :class="{'text-blue-600': selectedComponent === 'hours'}" class="px-4 py-2">Horários
      </button>
    </div>
    <div v-if="!isSmallScreen || selectedComponent === 'form'" class="admin-settings_form flex-1 flex">
      <AdminSettingsForm/>
    </div>
    <div v-if="!isSmallScreen || selectedComponent === 'hours'" class="admin-settings_hours flex-1 flex justify-center">
      <AdminSettingsHours/>
    </div>
  </div>
</template>