<script lang="ts" setup>
import SettingsForm from './SettingsForm.vue';
import SettingsHours from './SettingsHours.vue';


</script>

<template>
    <div class="flex-1 flex bg-gray-300">
        <div class="flex-1 bg-white flex items-center">
            <SettingsForm/>
        </div>
        <div class="flex-1 flex items-center justify-center">
            <SettingsHours />
        </div>
    </div>
</template>

<style scoped>

</style>