<script setup lang="ts">
const featuredVehicles = await getFeaturedVehicles();
</script>

<template>
  <div class="md:mx-10 bg-white rounded-lg m-5 p-5">
    <div class="grid grid-cols-auto gap-5">
      <DefaultCategoriesFeaturedCard v-for="vehicle in featuredVehicles" :vehicle="vehicle" class="rounded-lg shadow-xl border border-gray-200"/>
    </div>
  </div>
</template>

<style scoped>
.grid-cols-auto {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
</style>