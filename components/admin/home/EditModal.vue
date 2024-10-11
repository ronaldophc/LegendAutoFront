<script setup lang="ts">

import Vehicle from "~/components/admin/create/Vehicle.vue";

const props = defineProps({
  car: Vehicle
});

const isOpen = ref(false);
const errors = ref<Record<string, string[]>>({});
const fieldsToDisplay = ref([
  'manufacturer',
  'manufacture_year',
  'model',
  'model_year',
  'fuel_type',
  'steering_type',
  'transmission',
  'doors',
  'license_plate',
  'color',
  'price',
  'current_km',
  'renavam']);

const updatedCar = ref({ ...props.car });

function fieldLabel(field: string) {
  const labels = {
    manufacturer: 'Fabricante',
    manufacture_year: 'Ano Fabricação',
    model: 'Modelo',
    model_year: 'Ano Modelo',
    fuel_type: 'Combustível',
    steering_type: 'Direção',
    transmission: 'Transmissão',
    doors: 'Portas',
    license_plate: 'Placa',
    color: 'Cor',
    price: 'Preço',
    description: 'Description',
    current_km: 'Quilometragem',
    is_new: 'Is New',
    is_featured: 'Is Featured',
    renavam: 'Renavam'
  };
  return labels[field] || field;
}

function updateCarField(field: string, value: any) {
  updatedCar.value[field] = value;
}

function saveChanges() {

  console.log('Carro atualizado:', updatedCar.value);
}
</script>

<template>
  <button @click="isOpen = true" class="button px-2 lg:px-4 py-2 ml-4 rounded">Editar</button>

  <UModal v-model="isOpen">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <UIcon name="i-tabler:tool" class="m-auto w-full w-10 h-10"/>
      <div class="grid grid-cols-2 gap-1">
        <AdminHomeEditCarInput v-for="field in fieldsToDisplay"
                               :key="field"
                               :field="fieldLabel(field)"
                               :errors="errors[field]"
                               :value="car?.[field]"
                               @update-value="updateCarField(field, $event)"/>
      </div>
      <div class="flex flex-col sm:items-center sm:justify-center mt-5">
        <UCheckbox class="text-md sm:items-center sm:justify-center" label="Novidade" help="Aparecer como novidade"
                   v-model="car.is_new" id="is_new"/>
        <UCheckbox class="text-md sm:items-center sm:justify-center" label="Destaque" help="Aparecer como destaque"
                   v-model="car.is_featured"
                   id="is_featured"/>
      </div>
      <div class="description flex flex-col">
        <label for="description" class="mb-2 font-bold">Descrição</label>
        <textarea v-model="car.description" id="description"
                  class="px-2.5 pb-2.5 pt-4 w-full text-md rounded-lg border focus:outline-none"></textarea>
        <span v-if="errors.description" class="text-sm text-red-500">{{ errors.description[0] }}</span>
      </div>
      <template #footer>
        <button @click="saveChanges" class="button px-2 lg:px-4 py-2 ml-4 rounded">Salvar</button>
      </template>
    </UCard>
  </UModal>
</template>

<style scoped>

</style>