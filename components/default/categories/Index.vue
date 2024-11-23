<script setup lang="ts">

import {getHomeVehicles} from "~/composables/useCarApi";

const props = defineProps<{
  is_new: boolean;
  is_featured: boolean;
  title?: String,
}>();

const {data} = await getHomeVehicles({
  is_new: props.is_new,
  is_featured: props.is_featured,
});
</script>

<template>
  <div class="default-categories md:mx-10 bg-white rounded-lg m-5 p-5" v-if="data">
    <div v-if="title">
      <h1 class="text-3xl font-bold default-categories_text">{{title}}</h1>
      <hr class="flex-grow border-t m-3 default-categories_divider">
    </div>
    <div class="grid grid-cols-auto gap-5">
      <DefaultCategoriesVehicleCard v-for="vehicle in data" :vehicle="vehicle"
                                    class="rounded-lg shadow-xl border border-gray-200"/>
    </div>
  </div>
</template>

<style scoped>
.grid-cols-auto {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>