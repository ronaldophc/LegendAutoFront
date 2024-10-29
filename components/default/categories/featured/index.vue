<script setup lang="ts">
const featuredVehicles = await getFeaturedVehicles();
</script>

<template>
  <UContainer>
    <div>
      <h1 class="text-3xl font-bold text-gray-800 m-5 text-center">Veículos em Destaque</h1>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 m-5">
      <DefaultCategoriesFeaturedCard v-for="vehicle in featuredVehicles" :vehicle="vehicle" class="rounded-lg shadow-xl"/>
    </div>
  </UContainer>
</template>

<style scoped>

</style>