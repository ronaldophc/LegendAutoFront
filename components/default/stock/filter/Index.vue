<script setup lang="ts">

const props = defineProps({
  params: Object,
  showFilters: Boolean,
});

const emits = defineEmits(['update:vehicleType', 'update:params', 'requestVehicles']);

const updateVehicleType = (type) => {
  props.params.type = type;
};
const buttonClass = (type) => {
  return {
    'button': props.params.type === type,
    'bg-gray-200': props.params.type !== type
  };
};

const requestVehicles = () => {
  emits('requestVehicles');
};

</script>

<template>
  <aside id="sidebar-filters" class="block bg-white p-4 shadow rounded-md">
    <h2 class="text-xl font-bold mb-4">Filtros</h2>
    <div class="row row-cols-1">
      <div class="type mb-3">
        <h3 class="font-semibold mb-1">Tipo de veículo</h3>
        <div class="flex flex-col md:flex-row gap-2 w-full">
          <button @click="updateVehicleType('')" :class="buttonClass('')" class="flex-1 py-2 rounded text-sm">TODOS</button>
          <button @click="updateVehicleType('CAR')" :class="buttonClass('CAR')" class="flex-1 py-2 rounded text-sm">CARRO</button>
          <button @click="updateVehicleType('MOTORCYCLE')" :class="buttonClass('MOTORCYCLE')" class="flex-1 py-2 rounded text-sm">MOTO</button>
        </div>
      </div>
      <div class="year_range mb-3">
        <h3 class="font-semibold mb-1">Faixa de Ano</h3>
        <div class="flex flex-col md:flex-row gap-2 w-full">
          <input class="flex-1 p-2 border rounded w-full" v-model="params.year_min" placeholder="Ano minímo" id="year_min" type="number" :min="1900" :max="new Date().getFullYear()">
          <input class="flex-1 p-2 border rounded w-full" v-model="params.year_max" placeholder="Ano máximo" id="year_max" type="number" :min="1900" :max="new Date().getFullYear()">
        </div>
      </div>
      <div class="price_range mb-3">
        <h3 class="font-semibold mb-1">Faixa de Preço</h3>
        <div class="flex flex-col md:flex-row gap-2 w-full">
          <CurrencyInput class="flex-1 p-2 border rounded w-full" v-model="params.price_min" :options="{ currency: 'BRL' }" placeholder="Preço minímo" id="price_min" type="text"/>
          <CurrencyInput class="flex-1 p-2 border rounded w-full" v-model="params.price_max" :options="{ currency: 'BRL' }" placeholder="Preço máximo" id="price_max" type="text"/>
        </div>
      </div>
      <div class="km_range mb-3">
        <h3 class="font-semibold mb-1">Faixa de Km</h3>
        <div class="flex flex-col md:flex-row gap-2 w-full">
          <input class="flex-1 p-2 border rounded w-full" v-model="params.km_min" placeholder="Km minímo" id="km_min" type="number">
          <input class="flex-1 p-2 border rounded w-full" v-model="params.km_max" placeholder="Km máximo" id="km_max" type="number">
        </div>
      </div>
    </div>
    <button class="button mb-2 rounded shadow px-4 py-2 w-full" @click="requestVehicles()">Filtrar</button>
  </aside>

</template>

<style scoped>

</style>