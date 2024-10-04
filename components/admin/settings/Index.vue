<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isSmallScreen = ref(false);
const selectedComponent = ref('form');

if (process.client) {
  isSmallScreen.value = window.innerWidth < 1025;

  const handleResize = () => {
    isSmallScreen.value = window.innerWidth < 1025;
  };

  onMounted(() => {
    window.addEventListener('resize', handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });
}

const showForm = () => {
  selectedComponent.value = 'form';
};

const showHours = () => {
  selectedComponent.value = 'hours';
};
</script>

<template>
  <div class="admin-settings_body flex-1 flex flex-col lg:flex-row">
    <div v-if="isSmallScreen" class="admin-settings_menu flex justify-center gap-4 bg-blue-200 p-2">
      <button @click="showForm" :class="{'text-blue-600': selectedComponent === 'form'}" class="px-4 py-2">Informações
      </button>
      <button @click="showHours" :class="{'text-blue-600': selectedComponent === 'hours'}" class="px-4 py-2">Horários
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