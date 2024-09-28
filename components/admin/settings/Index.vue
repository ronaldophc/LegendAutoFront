<script lang="ts" setup>
import { ref } from 'vue';
import SettingsForm from './SettingsForm.vue';
import SettingsHours from './SettingsHours.vue';

const isSmallScreen = ref(window.innerWidth < 1025);
const selectedComponent = ref('form');

window.addEventListener('resize', () => {
  isSmallScreen.value = window.innerWidth < 1025;
});

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
      <button @click="showForm" :class="{'text-blue-600': selectedComponent === 'form'}" class="px-4 py-2">Informações</button>
      <button @click="showHours" :class="{'text-blue-600': selectedComponent === 'hours'}" class="px-4 py-2">Horários</button>
    </div>
    <div v-if="!isSmallScreen || selectedComponent === 'form'" class="admin-settings_form flex-1 flex">
      <SettingsForm/>
    </div>
    <div v-if="!isSmallScreen || selectedComponent === 'hours'" class="admin-settings_hours flex-1 flex justify-center">
      <SettingsHours/>
    </div>
  </div>
</template>