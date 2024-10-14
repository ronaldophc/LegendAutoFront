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

const yearRange = ref([2000, 2025]);
const priceRange = ref([0, 100000]);
const kmRange = ref([0, 200000]);
const vehicleType = ref('');

const BREAKPOINT = 1025;
const isSmallScreen = ref(false);
const isFilterOpen = ref(false);
const showFilters = ref(!isSmallScreen.value || isFilterOpen);

const fallbackCars = [
  {
    id: 1,
    name: 'Carro Exemplo 1',
    model_year: 2020,
    price: 50000,
    current_km: 10000,
    type: 'CAR',
    image_url: 'https://via.placeholder.com/150'
  },
  {
    id: 2,
    name: 'Carro Exemplo 2',
    model_year: 2019,
    price: 45000,
    current_km: 15000,
    type: 'CAR',
    image_url: 'https://via.placeholder.com/150'
  },
  {
    id: 3,
    name: 'Moto Exemplo 1',
    model_year: 2021,
    price: 30000,
    current_km: 5000,
    type: 'MOTORCYCLE',
    image_url: 'https://via.placeholder.com/150'
  }
];

async function requestCars<T>(url: string, options: UseFetchOptions<T> = {}) {
  if (!url) {
    return;
  }
  try {
    const response = await useFetch(url, {
      credentials: 'include',
      params: {
        year_min: yearRange.value[0],
        year_max: yearRange.value[1],
        price_min: priceRange.value[0],
        price_max: priceRange.value[1],
        km_min: kmRange.value[0],
        km_max: kmRange.value[1],
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
    cars.value = fallbackCars;
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
  // return car.name;
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

if (process.client) {
  onMounted(() => {
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
  });
  onUnmounted(() => {
    window.removeEventListener('resize', updateScreenSize);
  });
}

onMounted(() => {
  updateScreenSize();
  window.addEventListener('resize', updateScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize);
});


function toReais(price: number) {
  price = Math.round(price);
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
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
        <AdminFilters :showFilters="showFilters" :vehicleType="vehicleType" :yearRange="yearRange"
          :priceRange="priceRange" :kmRange="kmRange" :API_ENDPOINT="API_ENDPOINT"
          @update:vehicleType="vehicleType = $event" @update:yearRange="yearRange = $event"
          @update:priceRange="priceRange = $event" @update:kmRange="kmRange = $event" @requestCars="requestCars"
          class="mb-2 mx-2" />

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
            <div class="grid grid-cols-1 xl:grid-cols-2 gap-2">
              <!-- Repetir este bloco para cada veículo -->
              <div v-for="car in cars" :key="car.id" class="bg-white p-1 shadow rounded-lg flex items-center">
                <div class="flex items-center w-2/3">
                  <img :src="car.image_url" alt="Imagem do Veículo" class="w-20 h-20 mr-4 rounded-lg">
                  <div>
                    <h3 class="lg:text-lg font-bold">{{ carName(car) }}</h3>
                    <p class="text-sm text-gray-600">Ano: {{ car.model_year }} | {{ car.current_km }} KM | {{ car.id }}
                    </p>
                  </div>
                </div>
                <div class="md:flex flex-col items-center justify-center w-1/3">
                  <span class="lg:text-xl lg:font-bold font-semibold flex justify-center items-center">{{
                    toReais(car.price) }}</span>
                  <div class="flex flex-row justify-center items-center">
                    <AdminHomeEditModal :car="car" />

                    <UIcon name="i-material-symbols:delete-outline" class="text-red-500 cursor-pointer p-3 m-2"
                      @click="deleteCar(car)" />
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