<script setup lang="ts">
import car_default from '~/assets/images/default_car.png';
import type { UseFetchOptions } from "#app";
import { ref, onMounted, onUnmounted } from 'vue';

const cars = ref([]);
const config = useRuntimeConfig().public;
const API_ENDPOINT = config.apiBase + 'api/vehicles';
const nextUrl = ref();
const prevUrl = ref();
const current_page = ref(1);
const search = ref();

let params = ref(
  {
    year_min: null,
    year_max: null,
    price_min: null,
    price_max: null,
    km_min: null,
    km_max: null,
  }
);
const vehicleType = ref('');

const BREAKPOINT = 770;
const isSmallScreen = ref(false);
const isFilterOpen = ref(false);
const showFilters = ref(!isSmallScreen.value || isFilterOpen);

async function requestCars<T>(url: string, options: UseFetchOptions<T> = {}) {
  if (!url) {
    return;
  }
  try {
    const response = await useFetch(url, {
      credentials: 'include',
      params: {
        ...params.value,
        type: vehicleType.value,
        per_page: 10,
        ...options.params,
      },
      headers: {
        ...options?.headers,
        'Accept': 'application/json',
      },
    });

    const data = response.data.value.data;
    current_page.value = data.current_page;
    nextUrl.value = data.next_page_url;
    prevUrl.value = data.prev_page_url;
    cars.value = data.data;
  } catch (error) {
  }

  for (const car of cars.value) {
    if (car.cover_photo) {
      car.image_url = config.apiBase + car.cover_photo.image_url
      continue;
    }
    car.image_url = car_default
  }
}

async function handleSearch(query: string) {
  await requestCars(API_ENDPOINT + '?page=1',
    {
      params: {
        'query': query
      }
    });
}

async function handleOrderChange(criteria: string) {
  await requestCars(API_ENDPOINT + '?page=1', {
    params: {
      order_by: criteria,
    },
  });
}

function carName(car) {
  return `${car.manufacturer} ${car.model}`;
}

async function deleteCar(car) {
  const response = await useApi(`api/vehicles/${car.id}`, {
    method: 'DELETE',
  });
  if (response.status.value === 'success') {
    cars.value = cars.value.filter(c => c.id !== car.id);
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

onMounted( () => {
  updateScreenSize();
  setTimeout(() => {
    requestCars(API_ENDPOINT + '?page=1');
  }, 40);
  window.addEventListener('resize', updateScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize);
});


function toReais(price: number) {
  price = Math.round(price);
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function getInfos(car): string {
  let infos: String = '';
  if (car.model_year) {
    infos += `Ano: ${car.model_year} | `;
  }
  if (car.current_km) {
    infos += `KM: ${car.current_km} | `;
  }
  if (car.color) {
    infos += `Cor: ${car.color}`;
  }
  return infos;
}
</script>

<template>
  <div class="admin-home min-h-screen">
    <main class="p-3 mx-auto py-8">
      <div class="flex" :class="[isSmallScreen ? 'flex-col' : 'flex-row']">

        <div v-if="isSmallScreen" class="flex flex-row justify-between md:px-2">
          <button @click="toggleFilter" class="bg-white text-md p-2 rounded-lg shadow my-2">Filtros</button>
          <AdminHomeOrderDropdown @order-changed="handleOrderChange" class="p-2 my-2" />
        </div>
        <AdminFilters :showFilters="showFilters" :vehicleType="vehicleType" :params="params" :API_ENDPOINT="API_ENDPOINT"
          @update:params="params = $event" @requestCars="requestCars" class="mb-2" />

        <section class="md:px-2 w-full">
          <div class="flex flex-col gap-2">
            <form class="flex w-full flex-col ssm:flex-row items-center justify-center gap-2 ssm:gap-0">
              <div class="flex flex-row items-center justify-center w-full">
                <div class=" bg-white flex items-center justify-center rounded-lg shadow w-full">
                  <input type="text" v-model="search" placeholder="Pesquisar veículo" class="p-2 w-full bg-transparent">
                  <button @click="handleSearch(search)" class="btn flex items-center justify-center p-2">
                    <UIcon name="i-ic:twotone-search" class="m-auto"></UIcon>
                  </button>
                </div>
                <UIcon @click="requestCars(API_ENDPOINT + '?page=1')"
                  class="w-5 h-5 flex items-center justify-center m-2 hover:cursor-pointer"
                  name="i-material-symbols-light:directory-sync" />
              </div>
              <div class="flex justify-end w-1/3" v-if="!isSmallScreen">
                <AdminHomeOrderDropdown @order-changed="handleOrderChange" class="p-2" />
              </div>
            </form>
            <!-- Cartão de Veículo -->
            <div v-if="isSmallScreen" class="grid gap-2 flex justify-center">
              <!-- Repetir este bloco para cada veículo -->
              <div v-for="car in cars" :key="car.id"  class="w-80 bg-white rounded-lg shadow-md overflow-hidden">
                <!-- Foto do carro -->
                <img class="w-full h-52" :src="car.image_url" alt="Carro">

                <!-- Informações do carro -->
                <div class="p-4">
                  <h2 class="text-xl font-semibold text-gray-800">{{ carName(car) }}</h2>
                  <p class="text-gray-600">Km: {{ car.current_km }} km</p>
                  <p class="text-gray-600">Ano: {{ car.model_year }}</p>
                  <p class="text-gray-600">Cor: {{ car.color }}</p>
                  <p class="text-xl font-bold text-green-500">{{ toReais(car.price) }}</p>

                  <!-- Botões de ação -->
                  <div class="flex justify-between mt-4">
                    <AdminHomeEditModal :car="car" />
                    <button class="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600">
                      Excluir
                    </button>
                  </div>
                </div>
              </div>

            </div>

            <div v-if="!isSmallScreen" class="grid grid-cols-1 lg-custom:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-2">
              <!-- Repetir este bloco para cada veículo -->
              <div v-for="car in cars" :key="car.id" class="flex bg-white rounded-lg shadow-md overflow-hidden mb-4">
                <!-- Foto do carro -->
                <img class="w-2/6 h-auto object-cover max-w-64 rounded-lg" :src="car.image_url" alt="Carro">

                <!-- Informações do carro -->
                <div class="w-4/6 p-4 flex flex-col justify-between">
                  <div>
                    <h2 class="text-xl font-semibold text-gray-800">{{ carName(car) }}</h2>
                    <p class="text-gray-600">Km: {{ car.current_km }} km</p>
                    <p class="text-gray-600">Ano: {{ car.model_year }}</p>
                    <p class="text-gray-600">Cor: {{ car.color }}</p>
                    <p class="text-xl font-bold text-green-500 mt-2">{{ toReais(car.price) }}</p>
                  </div>

                  <!-- Botões de ação -->
                  <div class="flex justify-end space-x-4 mt-4">
                    <AdminHomeEditModal :vehicle="car" />
                    <button @click="deleteCar(car)" class="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600">
                      Excluir
                    </button>
                  </div>
                </div>
              </div>

            </div>

            <div class="mt-6 flex justify-center items-center gap-2">
              <button @click="requestCars(prevUrl)" class="p-2 border rounded mx-1">Anterior</button>
              <span>{{ current_page }}</span>
              <button @click="requestCars(nextUrl)" class="p-2 border rounded mx-1">Próxima</button>
            </div>
          </div>


        </section>
      </div>
    </main>
  </div>
</template>

<style scoped></style>