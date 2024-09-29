<script setup lang="ts">
import {ref} from 'vue';
import {useApi} from "~/composables/useApi";

const register = useRegisterStore();

const carInfo = ref<Car>({
  model: 'Hb Active',
  manufacturer: 'Peugeot',
  fuel_type: 'Flex',
  color: 'Branco',
  steering_type: '',
  transmission: '',
  doors: '',
  manufacture_year: '2013',
  model_year: '2014',
  current_km: '',
  price: '29000',
  is_new: true,
  is_featured: false,
  license_plate: '123123',
  renavam: '',
  description: ''
});

console.log(carInfo.value.model);

async function saveCar() {
  const type = register.vehicleType;
  const info = register.vehicleInfo;
  const photos = register.vehiclePhotos;
  console.log(type);
  console.log(info);
  console.log(photos);
  console.log(...info);
  const car = await useApi('api/vehicles', {
    method: 'POST',
    body: {
      type: type,
      ...info
    }
  })
}

async function consoleLog() {
  const type = register.vehicleType;
  const info = register.vehicleInfo;
  const photos = register.vehiclePhotos;
  console.log(type);
  console.log(info);
  console.log(photos);
  const car = await useApi('api/vehicles', {
    method: 'POST',
    body: {
      type: type,
      model: info.model,
      manufacturer: info.manufacturer,
      fuel_type: info.fuel_type,
      color: info.color,
      steering_type: info.steering_type,
      transmission: info.transmission,
      doors: info.doors,
      manufacture_year: info.manufacture_year,
      model_year: info.model_year,
      current_km: info.current_km,
      price: info.price,
      is_new: info.is_new,
      is_featured: info.is_featured,
      license_plate: info.license_plate,
      renavam: info.renavam,
      description: info.description,
      store_id: 1,
    }
  })
}

function setLinks() {
  register.links[1].active = false;
  register.links[2].active = true;
}

function nextStep() {
  register.setVehicleInfo(carInfo.value);
  setLinks();
}

</script>

<template>
  <div class="admin-create_vehicle pb-10 text-xl flex flex-col justify-center items-center w-full">
    <div class="admin-create_form grid grid-cols-1 mt-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl">
      <div class="flex flex-col">
        <label for="model" class="mb-2 font-bold">Modelo</label>
        <input type="text"
               v-model="carInfo.model"
               id="model"
               class="px-2.5 pb-2.5 pt-4 w-full text-md rounded-lg border focus:outline-none"
               placeholder="Avenida Manoel Ribas - 554"/>
      </div>
      <div class="flex flex-col">
        <label for="manufacturer" class="mb-2 font-bold">Fabricante</label>
        <input type="text" v-model="carInfo.manufacturer" id="manufacturer"
               class="px-2.5 pb-2.5 pt-4 w-full text-md rounded-lg border focus:outline-none"/>
      </div>
      <div class="flex flex-col">
        <label for="fuel_type" class="mb-2 font-bold">Combustível</label>
        <input type="text" v-model="carInfo.fuel_type" id="fuel_type"
               class="px-2.5 pb-2.5 pt-4 w-full text-md rounded-lg border focus:outline-none"/>
      </div>
      <div class="flex flex-col">
        <label for="color" class="mb-2 font-bold">Cor</label>
        <input type="text" v-model="carInfo.color" id="color"
               class="px-2.5 pb-2.5 pt-4 w-full text-md rounded-lg border focus:outline-none"/>
      </div>
      <div class="flex flex-col">
        <label for="steering_type" class="mb-2 font-bold">Direção</label>
        <input type="text" v-model="carInfo.steering_type" id="steering_type"
               class="px-2.5 pb-2.5 pt-4 w-full text-md rounded-lg border focus:outline-none"/>
      </div>
      <div class="flex flex-col">
        <label for="transmission" class="mb-2 font-bold">Transmissão</label>
        <input type="text" v-model="carInfo.transmission" id="transmission"
               class="px-2.5 pb-2.5 pt-4 w-full text-md rounded-lg border focus:outline-none"/>
      </div>
      <div class="flex flex-col">
        <label for="doors" class="mb-2 font-bold">Número de Portas</label>
        <input type="number" min="0" v-model="carInfo.doors" id="doors"
               class="px-2.5 pb-2.5 pt-4 w-full text-md rounded-lg border focus:outline-none"/>
      </div>
      <div class="flex flex-col">
        <label for="manufacture_year" class="mb-2 font-bold">Ano Fabricação</label>
        <input type="number" min="1900" v-model="carInfo.manufacture_year" id="manufacture_year"
               class="px-2.5 pb-2.5 pt-4 w-full text-md rounded-lg border focus:outline-none"/>
      </div>
      <div class="flex flex-col">
        <label for="model_year" class="mb-2 font-bold">Ano Modelo</label>
        <input type="number" min="1900" v-model="carInfo.model_year" id="model_year"
               class="px-2.5 pb-2.5 pt-4 w-full text-md rounded-lg border focus:outline-none"/>
      </div>
      <div class="flex flex-col">
        <label for="current_km" class="mb-2 font-bold">Quilometragem</label>
        <input type="number" min="0" v-model="carInfo.current_km" id="current_km"
               class="px-2.5 pb-2.5 pt-4 w-full text-md rounded-lg border focus:outline-none"/>
      </div>
      <div class="flex flex-col">
        <label for="price" class="mb-2 font-bold">Preço</label>
        <input type="number" v-model="carInfo.price" id="price"
               class="px-2.5 pb-2.5 pt-4 w-full text-md rounded-lg border focus:outline-none"/>
      </div>
      <div class="flex flex-col">
        <label for="license_plate" class="mb-2 font-bold">Placa</label>
        <input type="text" v-model="carInfo.license_plate" id="license_plate"
               class="px-2.5 pb-2.5 pt-4 w-full text-md rounded-lg border focus:outline-none"/>
      </div>
      <div class="flex flex-col">
        <label for="renavam" class="mb-2 font-bold">Renavam</label>
        <input type="text" v-model="carInfo.renavam" id="renavam"
               class="px-2.5 pb-2.5 pt-4 w-full text-md rounded-lg border focus:outline-none"/>
      </div>
      <div class="flex flex-col sm:items-center sm:justify-center mt-5">
        <UCheckbox class="text-md sm:items-center sm:justify-center" label="Novidade" help="Aparecer como novidade"
                   v-model="carInfo.is_new" id="is_new"/>
        <UCheckbox class="text-md sm:items-center sm:justify-center" label="Destaque" help="Aparecer como destaque"
                   v-model="carInfo.is_featured"
                   id="is_featured"/>
      </div>
      <div class="flex flex-col">
        <label for="description" class="mb-2 font-bold">Descrição</label>
        <textarea v-model="carInfo.description" id="description"
                  class="px-2.5 pb-2.5 pt-4 w-full text-md rounded-lg border focus:outline-none"></textarea>
      </div>
      <div class="flex flex-col md:col-span-2 mt-5 items-center justify-center w-full">
        <button @click="nextStep"
                class="admin-create_button my-2 rounded w-full border py-2 px-5 text-lg font-semibold shadow">
          Salvar
        </button>
      </div>
    </div>
  </div>
</template>