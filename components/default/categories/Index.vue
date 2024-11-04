<script setup lang="ts">

import {getHomeVehicles} from "~/composables/useCarApi";

const props = defineProps<{
  is_new: boolean;
  is_featured: boolean;
  title: String,
}>();

const {data} = await getHomeVehicles({
  is_new: props.is_new,
  is_featured: props.is_featured,
});
</script>

<template>
  <div class="md:mx-10 bg-white rounded-lg m-5 p-5 border border-purple-500" v-if="data">
    <h1 v-if="title" class="text-3xl font-bold text-purple-500">{{title}}</h1>
    <hr v-if="title" class="flex-grow border-t m-3 border-purple-500">
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