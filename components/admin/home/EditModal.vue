<script setup lang="ts">

import Vehicle from "~/components/admin/create/Vehicle.vue";

const props = defineProps({
  vehicle: Vehicle
});
const snackbar = useSnackbar();
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
  'renavam'
]);

const updatedCar = ref({...props.vehicle});

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

async function saveChanges() {
  const response = await useApi(`api/vehicles/${updatedCar.value.id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedCar.value)
  });

  if (response.status.value == 'error') {
    errors.value = response.error.value.data.errors;
    addErrorClassToFields();
    snackbar.add({
      type: 'error',
      text: 'Erro ao atualizar veiculo',
    });
    return;
  }
  snackbar.add({
    type: 'success',
    text: 'Veículo atualizado com sucesso',
  });
  emit('update-cars')
}

const emit = defineEmits(['update-cars']);

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

</script>

<template>
  <button @click="isOpen = true" class="button px-2 lg:px-4 py-2 rounded">Editar</button>
  <UModal v-model="isOpen">
    <UCard >
      <form @submit.prevent="saveChanges()">

        <div class="flex flex-row">
          <UIcon name="i-tabler:tool" class="m-auto w-full h-10"/>
          <UIcon name="i-material-symbols:cancel-rounded" class="m-auto w-10 h-10 cursor-pointer"
                 @click="isOpen = false"/>
        </div>

        <div class="grid grid-cols-2 gap-1">
          <AdminHomeEditCarInput v-for="field in fieldsToDisplay"
                                 :key="field"
                                 :field="fieldLabel(field)"
                                 :fieldName="field"
                                 :errors="errors[field]"
                                 :value="vehicle?.[field]"
                                 @update-value="updateCarField(field, $event)"/>
        </div>
        <div class="flex flex-col my-3">
          <UCheckbox class="text-md" label="Novidade" help="Mostrar como novidade"
                     v-model="updatedCar.is_new" id="is_new"/>
          <UCheckbox class="text-md" label="Destaque" help="Mostrar como destaque"
                     v-model="updatedCar.is_featured" id="is_featured"/>
        </div>
        <div class="description flex flex-col">
          <label for="description" class="mb-2 font-bold">Descrição</label>
          <textarea v-model="updatedCar.description" id="description"
                    class="px-2.5 pb-2.5 pt-4 w-full text-md rounded-lg border focus:outline-none"></textarea>
          <span v-if="errors.description" class="text-sm text-red-500">{{ errors.description[0] }}</span>
        </div>
        <button class="button px-2 lg:px-4 py-2 my-2 rounded">Salvar</button>
      </form>

      <AdminHomeEditImages :vehicle="vehicle"/>
    </UCard>
  </UModal>
</template>