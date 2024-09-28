<script lang="ts" setup>
import SettingsForm from './SettingsForm.vue';
import SettingsHours from './SettingsHours.vue';


</script>

<template>
  <div class="admin-settings_body flex-1 flex flex-col md:flex-row">
    <div class="admin-settings_form flex-1 flex flex-col md:flex-row">
      <SettingsForm/>
    </div>
    <div class="admin-settings_hours flex-1 flex justify-center flex-col md:flex-row">
      <SettingsHours/>
    </div>
  </div>
</template>

<style scoped>

</style>