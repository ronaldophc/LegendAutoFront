<script setup lang="ts">
import car_default from '~/assets/images/default_car.png';
import type {UseFetchOptions} from "#app";

const cars = ref([]);
const config = useRuntimeConfig().public;
const API_ENDPOINT = config.apiBase + 'api/vehicles';
const nextUrl = ref();
const prevUrl = ref();
const search = ref();

const yearRange = ref([2000, 2025]);
const priceRange = ref([0, 100000]);
const kmRange = ref([0, 200000]);
const vehicleType = ref('CAR');
const DEFAULT_FETCH_PARAMS = {
  credentials: 'include',

};

async function fetchCarImage(car) {
  const response = await useApi(`api/vehicles/images/${car.id}`);

  if (response.status.value === 'success') {
    return config.apiBase + response.data.value.data.image_url;
  }

  return car_default;
}

async function requestCars<T>(url: string, options: UseFetchOptions<T> = {}) {
  const response = await useFetch(url, {
    ...DEFAULT_FETCH_PARAMS,
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
  nextUrl.value = data.next_page_url;
  prevUrl.value = data.prev_page_url;
  cars.value = data.data;

  for (const car of cars.value) {
    car.image_url = await fetchCarImage(car);
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

onMounted(async () => {
  await requestCars(API_ENDPOINT + '?page=1');
});

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
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <main class="p-3 mx-auto py-8">
      <div class="flex">
        <!-- Sidebar de Filtros -->
        <aside class="w-1/5 bg-white p-4 shadow rounded-lg">
          <h2 class="text-xl font-bold mb-4">Filtros</h2>
          <div class="mb-4">
            <h3 class="font-semibold mb-2">Tipo de veículo</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              <button @click="vehicleType = 'CAR'"
                      :class="{ 'bg-blue-500 text-white': vehicleType === 'CAR', 'bg-gray-200': vehicleType !== 'CAR' }"
                      class="px-4 py-2 rounded">CARRO
              </button>
              <button @click="vehicleType = 'MOTORCYCLE'"
                      :class="{ 'bg-blue-500 text-white': vehicleType === 'MOTORCYCLE', 'bg-gray-200': vehicleType !== 'MOTORCYCLE' }"
                      class="px-4 py-2 rounded">MOTO
              </button>
            </div>
          </div>
          <div class="mb-4">
            <h3 class="font-semibold mb-2">Faixa de Ano</h3>
            <div class="flex items-center mb-2 border-2 border-gray-200 border-solid rounded">
              <label for="year_min" class="w-10 mx-3">De</label>
              <input id="year_min" type="number" v-model="yearRange[0]" placeholder="Ano Mínimo"
                     class="w-full p-2 border-l" :min="1900" :max="new Date().getFullYear()">
            </div>
            <div class="flex items-center border-2 border-gray-200 border-solid rounded">
              <label for="year_max" class="w-10 mx-3">Até</label>
              <input id="year_max" type="number" v-model="yearRange[1]" placeholder="Ano Máximo"
                     class="w-full p-2 border-l" :min="1900" :max="new Date().getFullYear()">
            </div>
          </div>
          <div class="mb-4">
            <h3 class="font-semibold mb-2">Faixa de Preço</h3>
            <div class="flex items-center mb-2 border-2 border-gray-200 border-solid rounded">
              <label for="price_min" class="w-24 mx-3">Mínimo</label>
              <CurrencyInput id="price_min" type="text" v-model="priceRange[0]" :options="{ currency: 'BRL' }"
                             placeholder="Preço Mínimo"
                             class="w-full p-2 border-l"/>
            </div>
            <div class="flex items-center border-2 border-gray-200 border-solid rounded">
              <label for="price_max" class="w-24 mx-3">Máximo</label>
              <CurrencyInput id="price_max" type="text" v-model="priceRange[1]" :options="{ currency: 'BRL' }"
                             placeholder="Preço Máximo"
                             class="w-full p-2 border-l"/>
            </div>
          </div>
          <div class="mb-4">
            <h3 class="font-semibold mb-2">Faixa de Quilometragem</h3>
            <div class="flex items-center mb-2 border-2 border-gray-200 border-solid rounded">
              <label for="km_min" class="w-24 mx-3">Mínimo</label>
              <input id="km_min" type="number" v-model="kmRange[0]" placeholder="KM Mínimo"
                     class="w-full p-2 border-l" min="0">
            </div>
            <div class="flex items-center border-2 border-gray-200 border-solid rounded">
              <label for="km_max" class="w-24 mx-3">Máximo</label>
              <input id="km_max" type="number" v-model="kmRange[1]" placeholder="KM Máximo"
                     class="w-full p-2 border-l" min="0">
            </div>
          </div>
          <button class="text-white bg-blue-500 mb-2 rounded shadow px-4 py-2" @click="requestCars(API_ENDPOINT)">Filtrar
          </button>
        </aside>

        <!-- Conteúdo Principal -->
        <section class="w-4/5 px-4">
          <div class="flex flex-col gap-2">
            <form class="flex flex-row w-full">
              <div class="flex items-center w-full">
                <div class="w-2/3 flex flex-row bg-white items-center justify-center rounded-lg shadow">
                  <input type="text" v-model="search" placeholder="Pesquisar veículo" class="p-2 w-full bg-transparent">
                  <button @click="handleSearch(search)" class="btn flex items-center justify-center p-2">
                    <UIcon name="i-ic:twotone-search" class="m-auto"></UIcon>
                  </button>
                </div>
                <div>
                  <button class="flex items-center justify-center m-2">
                    <UIcon class="w-5 h-5" name="i-material-symbols-light:directory-sync"/>
                  </button>
                </div>
                <div class="flex justify-end w-1/3">
                  <AdminHomeDropDown @order-changed="handleOrderChange"/>
                </div>
              </div>
            </form>
            <!-- Cartão de Veículo -->
            <div class="grid grid-cols-1 gap-2">
              <!-- Repetir este bloco para cada veículo -->
              <div v-for="car in cars" :key="car.id"
                   class="bg-white p-2 shadow rounded-lg flex items-center justify-between">
                <div class="flex items-center">
                  <img :src="car.image_url" alt="Imagem do Veículo"
                       class="w-20 h-20 mr-4 rounded-lg">
                  <div>
                    <h3 class="text-lg font-bold">{{ carName(car) }}</h3>
                    <p class="text-sm text-gray-600">Ano: {{ car.model_year }} | {{ car.current_km }} KM | {{
                        car.id
                      }}</p>
                  </div>
                </div>
                <div>
                  <span class="text-xl font-bold">R$ {{ car.price }}</span>
                  <button class="bg-blue-500 text-white px-4 py-2 ml-4 rounded">Editar</button>
                  <button @click="deleteCar(car)" class="text-red-500 ml-2">Excluir</button>
                </div>
              </div>
              <!-- Fim do bloco de veículo -->
            </div>
            <!-- Paginação -->
            <div class="mt-6 flex justify-center">
              <button @click="requestCars(prevUrl)" class="p-2 border rounded mx-1">Anterior</button>
              <button @click="requestCars(nextUrl)" class="p-2 border rounded mx-1">Próxima</button>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<style scoped>

</style>