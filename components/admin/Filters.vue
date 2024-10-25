<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  params: [],
  showFilters: Boolean,
  vehicleType: String,
  API_ENDPOINT: String
});

const emits = defineEmits(['update:vehicleType', 'update:params', 'requestCars']);

const updateVehicleType = (type) => {
  emits('update:vehicleType', type);
};

const buttonClass = (type) => {
  return {
    'button': props.vehicleType === type,
    'bg-gray-200': props.vehicleType !== type
  };
};

const requestCars = (endpoint) => {
  emits('requestCars', endpoint);
};
</script>

<template>
  <aside class="xl:w-1/5 block bg-white p-4 shadow rounded-lg" :class="{'hidden': !showFilters}">
    <h2 class="text-xl font-bold mb-4">Filtros</h2>
    <div class="mb-4">
      <h3 class="font-semibold mb-2">Tipo de veículo</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
        <button @click="updateVehicleType('')" :class="buttonClass('')" class="px-4 py-2 rounded text-sm flex items-center justify-center">TODOS</button>
        <button @click="updateVehicleType('CAR')" :class="buttonClass('CAR')" class="px-4 py-2 rounded text-sm flex items-center justify-center">CARRO</button>
        <button @click="updateVehicleType('MOTORCYCLE')" :class="buttonClass('MOTORCYCLE')" class="px-4 py-2 rounded text-sm flex items-center justify-center">MOTO</button>
      </div>
    </div>
    <div class="mb-4">
      <h3 class="font-semibold mb-2">Faixa de Ano</h3>
      <div class="flex items-center mb-2 border-2 border-gray-200 border-solid rounded">
        <label for="year_min" class="w-10 mx-3">De</label>
        <input id="year_min" type="number" v-model="params.year_min" placeholder="Ano Mínimo" class="w-full p-2 border-l" :min="1900" :max="new Date().getFullYear()">
      </div>
      <div class="flex items-center border-2 border-gray-200 border-solid rounded">
        <label for="year_max" class="w-10 mx-3">Até</label>
        <input id="year_max" type="number" v-model="params.year_max" placeholder="Ano Máximo" class="w-full p-2 border-l" :min="1900" :max="new Date().getFullYear()">
      </div>
    </div>
    <div class="mb-4">
      <h3 class="font-semibold mb-2">Faixa de Preço</h3>
      <div class="flex items-center mb-2 border-2 border-gray-200 border-solid rounded">
        <label for="price_min" class="w-24 mx-3">Mínimo</label>
        <CurrencyInput id="price_min" type="text" v-model="params.price_min" :options="{ currency: 'BRL' }" placeholder="Preço Mínimo" class="w-full p-2 border-l" />
      </div>
      <div class="flex items-center border-2 border-gray-200 border-solid rounded">
        <label for="price_max" class="w-24 mx-3">Máximo</label>
        <CurrencyInput id="price_max" type="text" v-model="params.price_max" :options="{ currency: 'BRL' }" placeholder="Preço Máximo" class="w-full p-2 border-l" />
      </div>
    </div>
    <div class="mb-4">
      <h3 class="font-semibold mb-2">Faixa de Quilometragem</h3>
      <div class="flex items-center mb-2 border-2 border-gray-200 border-solid rounded">
        <label for="km_min" class="w-24 mx-3">Mínimo</label>
        <input id="km_min" type="number" v-model="params.km_min" placeholder="KM Mínimo" class="w-full p-2 border-l" min="0">
      </div>
      <div class="flex items-center border-2 border-gray-200 border-solid rounded">
        <label for="km_max" class="w-24 mx-3">Máximo</label>
        <input id="km_max" type="number" v-model="params.km_max" placeholder="KM Máximo" class="w-full p-2 border-l" min="0">
      </div>
    </div>
    <button class="button mb-2 rounded shadow px-4 py-2 w-full" @click="requestCars(API_ENDPOINT)">Filtrar</button>
  </aside>
</template>