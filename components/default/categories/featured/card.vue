<script setup lang="ts">
import car_default from 'assets/images/default-car.png';
import type {Vehicle} from "~/types/Vehicle";

const config = useRuntimeConfig().public;
const props = defineProps<{
  vehicle: Vehicle;
}>();

const image_url = ref(config.apiBase + props.vehicle.cover_photo.image_url || car_default);

function vehicleName() {
  return `${props.vehicle.manufacturer} ${props.vehicle.model}`;
}

function toReais(price: number) {
  price = Math.round(price);
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

</script>

<template>
  <a href="#" class="rounded overflow-hidden shadow-lg">
    <div class="h-52 lg:h-72 w-full">
      <img class="w-full h-full object-cover" :src="image_url" alt="Vehicle Image">
    </div>
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{vehicleName()}}</div>
      <p class="text-gray-700 text-base flex items-center"><UIcon name="i-ion:speedometer" class="me-1"/>{{ vehicle.current_km }} km</p>
      <p class="text-gray-700 text-base flex items-center"><UIcon name="i-material-symbols:calendar-month-outline-sharp" class="me-1"/> {{ vehicle.model_year }} / {{ vehicle.manufacture_year}}</p>
      <p class="text-xl font-bold text-green-500">{{ toReais(vehicle.price) }}</p>
    </div>
    <div class="px-6 p2-4 pb-2">
      <span class="inline-block bg-black rounded-full px-5 py-3 text-md font-semibold text-white mr-2 mb-2">Ver mais</span>
    </div>
  </a>
</template>