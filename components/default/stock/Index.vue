<script setup lang="ts">

import {ref} from "vue";
import {getVehicles} from "~/composables/useCarApi";
import vehicle_default from "assets/images/default-vehicle.png";

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

  console.log(vehicles.value);
}



</script>

<template>
  <UContainer>
    <DefaultStockTopBar/>
    <div class="grid md:grid-cols-12">
      <div class="md:col-span-3">
        <div class="filters">
          <DefaultStockFilter :params="params" @update:params="params = $event" @requestVehicles="requestVehicles()"/>
        </div>
      </div>
      <div class="md:col-span-9">
        <div class="list-items">
          <UContainer>
            <div class="flex flex-col">
              <div v-for="vehicle in vehicles" :key="vehicle.id" class="mb-3">
                <DefaultStockItem :vehicle="vehicle"/>
              </div>
            </div>
          </UContainer>

        </div>
      </div>
    </div>
  </UContainer>
</template>