<script setup lang="ts">
import vehicle_default from 'assets/images/default-vehicle.png';
import {ref, onMounted } from 'vue';
import {getVehicles} from "~/composables/useCarApi";

const API_ENDPOINT = 'api/vehicles';
const vehicles = ref([]);
const config = useRuntimeConfig().public;
const nextUrl = ref();
const prevUrl = ref();
const current_page = ref(1);

let params = ref(
    {
      year_min: null,
      year_max: null,
      price_min: null,
      price_max: null,
      km_min: null,
      km_max: null,
      search: null,
      type: '',
      order_by: null,
    }
);

const BREAKPOINT = 770;
const isSmallScreen = ref(false);
const isFilterOpen = ref(false);
const showFilters = ref(!isSmallScreen.value || isFilterOpen);

async function requestVehicles<T>(url: string = API_ENDPOINT + '?page=1') {

  const response = await getVehicles(url, {
    params: {
      ...params.value,
    }
  });

  const data = response.data.value.data;
  current_page.value = data.current_page;
  nextUrl.value = data.next_page_url;
  prevUrl.value = data.prev_page_url;
  vehicles.value = data.data;

  for (let vehicle of vehicles.value) {
    let {cover_photo} = vehicle;
    if (cover_photo) {
      vehicle.image_url = config.apiBase + cover_photo.image_url
      continue;
    }
    vehicle.image_url = vehicle_default
  }
}

function vehicleName(vehicle) {
  return `${vehicle.manufacturer} ${vehicle.model}`;
}

async function deleteCar(vehicle) {
  const response = await useApi(API_ENDPOINT + '/' + vehicle.id, {
    method: 'DELETE',
  });
  if (response.status.value === 'success') {
    vehicles.value = vehicles.value.filter(c => c.id !== vehicle.id);
  }
}

const updateShowFilters = () => {
  showFilters.value = !isSmallScreen.value || isFilterOpen.value;
};

const updateScreenSize = () => {
  isSmallScreen.value = window.innerWidth < BREAKPOINT;
  updateShowFilters();
};

function toggleFilter() {
  isFilterOpen.value = !isFilterOpen.value;
  updateShowFilters();
}

onMounted(() => {
  updateScreenSize();
  setTimeout(() => {
    requestVehicles();
  }, 40);
  window.addEventListener('resize', updateScreenSize);
});
//
// onUnmounted(() => {
//   window.removeEventListener('resize', updateScreenSize);
// });


function toReais(price: number) {
  price = Math.round(price);
  return price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
}

</script>

<template>
  <div class="admin-home min-h-screen">
    <main class="p-3 mx-auto py-8">
      <div class="flex" :class="[isSmallScreen ? 'flex-col' : 'flex-row']">

        <div v-if="isSmallScreen" class="flex flex-row justify-between md:px-2">
          <button @click="toggleFilter" class="bg-white text-md p-2 rounded-lg shadow my-2">Filtros</button>
          <OrderDropdown @order-changed="requestVehicles()" class="p-2 my-2"/>
        </div>
        <AdminFilters :showFilters="showFilters" :params="params" @update:params="params = $event" @requestVehicles="requestVehicles()" class="mb-2"/>

        <section class="md:px-2 w-full">
          <div class="flex flex-col gap-2">

            <!-- Barra de pesquisa, botão de sincronização e ordenação -->
            <div class="flex w-full flex-col ssm:flex-row items-center justify-center gap-2 ssm:gap-0">
              <div class="flex flex-row items-center justify-center w-full">
                <div class=" bg-white flex items-center justify-center rounded-lg shadow w-full">
                  <input type="text" v-model="params.search" placeholder="Pesquisar veículo" class="p-2 w-full bg-transparent">
                  <button @click="requestVehicles()" class="btn flex items-center justify-center p-2">
                    <UIcon name="i-ic:twotone-search" class="m-auto"></UIcon>
                  </button>
                </div>
                <UIcon @click="requestVehicles()"
                       class="w-5 h-5 flex items-center justify-center m-2 hover:cursor-pointer"
                       name="i-material-symbols-light:directory-sync"/>
              </div>
              <div class="flex justify-end w-1/3" v-if="!isSmallScreen">
                <OrderDropdown @order-changed="requestVehicles()" class="p-2"/>
              </div>
            </div>

            <!-- Cartão de Veículo -->
            <div v-if="isSmallScreen" class="grid gap-2 flex justify-center">
              <!-- Repetir este bloco para cada veículo -->
              <div v-for="vehicle in vehicles" :key="vehicle.id"
                   class="w-80 bg-white rounded-lg shadow-md overflow-hidden">
                <!-- Foto do vehicle -->
                <img class="w-full h-52" :src="vehicle.image_url" alt="Carro">

                <!-- Informações do vehicle -->
                <div class="p-4">
                  <h2 class="text-xl font-semibold text-gray-800">{{ vehicleName(vehicle) }}</h2>
                  <p class="text-gray-600">Km: {{ vehicle.current_km }} km</p>
                  <p class="text-gray-600">Ano: {{ vehicle.model_year }}</p>
                  <p class="text-gray-600">Cor: {{ vehicle.color }}</p>
                  <p class="text-xl font-bold text-green-500">{{ toReais(vehicle.price) }}</p>

                  <!-- Botões de ação -->
                  <div class="flex justify-between mt-4">
                    <AdminHomeEditModal :vehicle="vehicle"
                                        @update-vehicles="requestVehicles()"/>
                    <button class="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600">
                      Excluir
                    </button>
                  </div>
                </div>
              </div>

            </div>

            <!-- Cartão de Veículo Mobile -->
            <div v-if="!isSmallScreen" class="grid grid-cols-1 lg-custom:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-2">
              <!-- Repetir este bloco para cada veículo -->
              <div v-for="vehicle in vehicles" :key="vehicle.id"
                   class="flex bg-white rounded-lg shadow-md overflow-hidden mb-4">
                <!-- Foto do vehicle -->
                <img class="w-2/6 h-auto object-cover max-w-64 rounded-lg" :src="vehicle.image_url" alt="Carro">

                <!-- Informações do vehicle -->
                <div class="w-4/6 p-4 flex flex-col justify-between">
                  <div>
                    <h2 class="text-xl font-semibold text-gray-800">{{ vehicleName(vehicle) }}</h2>
                    <p class="text-gray-600">Km: {{ vehicle.current_km }} km</p>
                    <p class="text-gray-600">Ano: {{ vehicle.model_year }}</p>
                    <p class="text-gray-600">Cor: {{ vehicle.color }}</p>
                    <p class="text-xl font-bold text-green-500 mt-2">{{ toReais(vehicle.price) }}</p>
                  </div>

                  <!-- Botões de ação -->
                  <div class="flex justify-end space-x-4 mt-4">
                    <AdminHomeEditModal :vehicle="vehicle"
                                        @update-vehicles="requestVehicles()"/>
                    <button @click="deleteCar(vehicle)"
                            class="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600">
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-6 flex justify-center items-center gap-2">
              <button @click="requestVehicles(prevUrl)" class="p-2 border rounded mx-1">Anterior</button>
              <span>{{ current_page }}</span>
              <button @click="requestVehicles(nextUrl)" class="p-2 border rounded mx-1">Próxima</button>
            </div>
          </div>


        </section>
      </div>
    </main>
  </div>
</template>

<style scoped></style>