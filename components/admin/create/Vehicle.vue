<script setup lang="ts">
import {ref} from 'vue';
import {useApi} from "~/composables/useApi";

const register = useRegisterStore();

const carInfo = ref<Car>({
  model: 'Hb Active',
  manufacturer: 'Peugeot',
  fuel_type: 'Flex',
  color: 'Branco',
  steering_type: 'Elétrico',
  transmission: 'Manual',
  doors: '4',
  manufacture_year: '2013',
  model_year: '2014',
  current_km: '12312',
  price: '29000',
  is_new: true,
  is_featured: false,
  license_plate: '123123',
  renavam: '123123',
  description: '123123'
});

const licensePlateError = ref<string>('');

const requiredFields = ['model', 'manufacturer', 'fuel_type',
  'color', 'steering_type', 'transmission',
  'doors', 'manufacture_year', 'model_year',
  'current_km', 'price'];

function validateFields() {
  const fields = Object.keys(carInfo.value);
  let isValid = true;

  fields.forEach(field => {
    const inputElement = document.getElementById(field);
    if (requiredFields.includes(field) && !carInfo.value[field]) {
      console.log('error validate', field);
      if (inputElement) {
        inputElement.classList.add('error-border');
      }
      isValid = false;
      return;
    }
    if (inputElement) {
      inputElement.classList.remove('error-border');
    }
  });

  return isValid;
}

async function saveCar() {
  const type = register.vehicleType;
  const info = carInfo.value;

  try {
    const { data, error } = await useApi('api/vehicles', {
      method: 'POST',
      body: {
        type: type,
        ...info,
        store_id: 1
      },
    });

    const license_plate = error.value.data.errors.license_plate;

    if (license_plate) {
      const inputElement = document.getElementById('license_plate');
      inputElement.classList.add('error-border');
      licensePlateError.value = license_plate[0];
      return;
    }


    // const status = res.status.value;
    // console.log(res);
    // if(status === 'error') return;
    //
    // register.setVehicleInfo(carInfo.value);
    //
    // setLinks();

  } catch (e) {
    console.log('error saveCar', e);
  }

}

function setLinks() {
  register.links[1].active = false;
  register.links[2].active = true;
}

function nextStep() {
  const validate = validateFields();

  if (!validate) return;

  saveCar();

}

</script>

<template>
  <button  @click="saveCar">SaveCar</button>
  <div class="admin-create_vehicle pb-10 text-xl flex flex-col justify-center items-center w-full">
    <div class="admin-create_form grid grid-cols-1 mt-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl">
      <div class="flex flex-col">
        <label for="model" class="mb-2 font-bold">Modelo</label>
        <input type="text"
               v-model="carInfo.model"
               id="model"
               class="px-2.5 pb-2.5 pt-4 w-full text-md rounded-lg border focus:outline-none"/>
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
        <span v-if="licensePlateError" class="text-red-500">{{ licensePlateError }}</span>
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

<style scoped>
.error-border {
  border: 1px solid red;
}
</style>