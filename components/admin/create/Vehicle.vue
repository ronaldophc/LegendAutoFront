<script setup lang="ts">
import type { Vehicle } from "~/types/Vehicle";
import { useBreadCrumbStore } from "~/stores/breadCrumb";
const breadCrumb = useBreadCrumbStore();
const snackbar = useSnackbar();
const register = useRegisterStore();

// Constants
let INIT_CAR_INFO: Vehicle = {model: 'Hb Active', manufacturer: 'Peugeot', fuel_type: 'Flex', color: 'Branco', steering_type: 'Elétrico', transmission: 'Manual', doors: '0', manufacture_year: '2013', model_year: '2014', current_km: '12312', price: '29000', is_new: true, is_featured: false, license_plate: '', renavam: '123123', description: '123123'};

// Reactive variables
const carInfo = ref<Vehicle>(INIT_CAR_INFO);
const errors = ref<Record<string, string[]>>({});

// Helper functions
function addErrorClassToFields() {
  for (const field in errors.value) {
    if (errors.value.hasOwnProperty(field)) {
      const inputElement = document.getElementById(field);
      if (inputElement) {
        inputElement.classList.add('error-border');
      }
    }
  }
}

async function handleNextStep() {
  const response = await useRegisterCar(carInfo.value, register.vehicleType, 1);
  if (!response.success) {
    errors.value = response['errors'];
    addErrorClassToFields();
    return;
  }
  proceedToNextStep();
}

function proceedToNextStep() {
  register.setVehicleInfo(carInfo.value);
  breadCrumb.setActiveLink(3);
  showSuccessSnackbar();
}

function showSuccessSnackbar() {
  snackbar.add({
    type: 'success',
    text: 'Veiculo cadastrado com sucesso',
  });
}
</script>

<template>
  <div class="admin-create_vehicle pb-10 text-xl flex flex-col justify-center items-center w-full">
    <div class="admin-create_form grid grid-cols-1 mt-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl">
      <div class="model flex flex-col">
        <label for="model" class="mb-2 font-bold">Modelo</label>
        <input type="text"
               v-model="carInfo.model"
               id="model"
               class="px-2.5 pb-2.5 pt-4 w-full text-md rounded-lg border focus:outline-none"/>
        <span v-if="errors.model" class="text-sm text-red-500">{{ errors.model[0] }}</span>
      </div>
      <div class="manufacturer flex flex-col">
        <label for="manufacturer" class="mb-2 font-bold">Fabricante</label>
        <input type="text" v-model="carInfo.manufacturer" id="manufacturer"
               class="px-2.5 pb-2.5 pt-4 w-full text-md rounded-lg border focus:outline-none"/>
        <span v-if="errors.manufacturer" class="text-sm text-red-500">{{ errors.manufacturer[0] }}</span>
      </div>
      <div class="fuel_type flex flex-col">
        <label for="fuel_type" class="mb-2 font-bold">Combustível</label>
        <input type="text" v-model="carInfo.fuel_type" id="fuel_type"
               class="px-2.5 pb-2.5 pt-4 w-full text-md rounded-lg border focus:outline-none"/>
        <span v-if="errors.fuel_type" class="text-sm text-red-500">{{ errors.fuel_type[0] }}</span>
      </div>
      <div class="color flex flex-col">
        <label for="color" class="mb-2 font-bold">Cor</label>
        <input type="text" v-model="carInfo.color" id="color"
               class="px-2.5 pb-2.5 pt-4 w-full text-md rounded-lg border focus:outline-none"/>
        <span v-if="errors.color" class="text-sm text-red-500">{{ errors.color[0] }}</span>
      </div>
      <div class="steering_type flex flex-col">
        <label for="steering_type" class="mb-2 font-bold">Direção</label>
        <input type="text" v-model="carInfo.steering_type" id="steering_type"
               class="px-2.5 pb-2.5 pt-4 w-full text-md rounded-lg border focus:outline-none"/>
        <span v-if="errors.steering_type" class="text-sm text-red-500">{{ errors.steering_type[0] }}</span>
      </div>
      <div class="transmission flex flex-col">
        <label for="transmission" class="mb-2 font-bold">Transmissão</label>
        <input type="text" v-model="carInfo.transmission" id="transmission"
               class="px-2.5 pb-2.5 pt-4 w-full text-md rounded-lg border focus:outline-none"/>
        <span v-if="errors.transmission" class="text-sm text-red-500">{{ errors.transmission[0] }}</span>
      </div>
      <div class="doors flex flex-col">
        <label for="doors" class="mb-2 font-bold">Portas</label>
        <input type="number" min="0" v-model="carInfo.doors" id="doors"
               class="px-2.5 pb-2.5 pt-4 w-full text-md rounded-lg border focus:outline-none"/>
        <span v-if="errors.doors" class="text-sm text-red-500">{{ errors.doors[0] }}</span>
      </div>
      <div class="manufacture_year flex flex-col">
        <label for="manufacture_year" class="mb-2 font-bold">Ano Fabricação</label>
        <input type="number" min="1900" v-model="carInfo.manufacture_year" id="manufacture_year"
               class="px-2.5 pb-2.5 pt-4 w-full text-md rounded-lg border focus:outline-none"/>
        <span v-if="errors.manufacture_year" class="text-sm text-red-500">{{ errors.manufacture_year[0] }}</span>
      </div>
      <div class="model_year flex flex-col">
        <label for="model_year" class="mb-2 font-bold">Ano Modelo</label>
        <input type="number" min="1900" v-model="carInfo.model_year" id="model_year"
               class="px-2.5 pb-2.5 pt-4 w-full text-md rounded-lg border focus:outline-none"/>
        <span v-if="errors.model_year" class="text-sm text-red-500">{{ errors.model_year[0] }}</span>
      </div>
      <div class="current_km flex flex-col">
        <label for="current_km" class="mb-2 font-bold">Quilometragem</label>
        <input type="number" min="0" v-model="carInfo.current_km" id="current_km"
               class="px-2.5 pb-2.5 pt-4 w-full text-md rounded-lg border focus:outline-none"/>
        <span v-if="errors.current_km" class="text-sm text-red-500">{{ errors.current_km[0] }}</span>
      </div>
      <div class="price flex flex-col">
        <label for="price" class="mb-2 font-bold">Preço</label>
        <input type="number" v-model="carInfo.price" id="price"
               class="px-2.5 pb-2.5 pt-4 w-full text-md rounded-lg border focus:outline-none"/>
        <span v-if="errors.price" class="text-sm text-red-500">{{ errors.price[0] }}</span>
      </div>
      <div class="license_plate flex flex-col">
        <label for="license_plate" class="mb-2 font-bold">Placa</label>
        <input type="text" v-model="carInfo.license_plate" id="license_plate"
               class="px-2.5 pb-2.5 pt-4 w-full text-md rounded-lg border focus:outline-none"/>
        <span v-if="errors.license_plate" class="text-sm text-red-500">{{ errors.license_plate[0] }}</span>
      </div>
      <div class="renavam flex flex-col">
        <label for="renavam" class="mb-2 font-bold">Renavam</label>
        <input type="text" v-model="carInfo.renavam" id="renavam"
               class="px-2.5 pb-2.5 pt-4 w-full text-md rounded-lg border focus:outline-none"/>
        <span v-if="errors.renavam" class="text-sm text-red-500">{{ errors.renavam[0] }}</span>
      </div>
      <div class="flex flex-col sm:items-center sm:justify-center mt-5">
        <UCheckbox class="text-md sm:items-center sm:justify-center" label="Novidade" help="Aparecer como novidade"
                   v-model="carInfo.is_new" id="is_new"/>
        <UCheckbox class="text-md sm:items-center sm:justify-center" label="Destaque" help="Aparecer como destaque"
                   v-model="carInfo.is_featured"
                   id="is_featured"/>
      </div>
      <div class="description flex flex-col">
        <label for="description" class="mb-2 font-bold">Descrição</label>
        <textarea v-model="carInfo.description" id="description"
                  class="px-2.5 pb-2.5 pt-4 w-full text-md rounded-lg border focus:outline-none"></textarea>
        <span v-if="errors.description" class="text-sm text-red-500">{{ errors.description[0] }}</span>
      </div>
      <div class="flex flex-col md:col-span-2 mt-5 items-center justify-center w-full">
        <button @click="handleNextStep"
                class="button my-2 rounded w-full border py-2 px-5 text-lg font-semibold shadow">
          Salvar
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-border {
  border: 1px solid red;
}
</style>