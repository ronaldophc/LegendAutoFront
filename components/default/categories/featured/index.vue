<script setup lang="ts">
const featuredVehicles = await getFeaturedVehicles();
</script>

<template>
  <div class="md:mx-10">
    <h1 class="text-3xl font-bold text-gray-800 m-5 text-center">Veículos em Destaque</h1>
    <div class="grid grid-cols-auto gap-5 m-5">
      <DefaultCategoriesFeaturedCard v-for="vehicle in featuredVehicles" :vehicle="vehicle" class="rounded-lg shadow-xl"/>
    </div>
  </div>
</template>

<style scoped>
.grid-cols-auto {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
</style>