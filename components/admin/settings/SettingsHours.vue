<script lang="ts" setup>
import {useSnackbar} from "vue3-snackbar";

const snackbar = useSnackbar();

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const daysOfWeekTranslated = {
  Monday: 'Segunda-feira',
  Tuesday: 'Terça-feira',
  Wednesday: 'Quarta-feira',
  Thursday: 'Quinta-feira',
  Friday: 'Sexta-feira',
  Saturday: 'Sábado',
};

const businessHours = ref<any>({
  Monday: [{opening_time: '', closing_time: ''}],
  Tuesday: [{opening_time: '', closing_time: ''}],
  Wednesday: [{opening_time: '', closing_time: ''}],
  Thursday: [{opening_time: '', closing_time: ''}],
  Friday: [{opening_time: '', closing_time: ''}],
  Saturday: [{opening_time: '', closing_time: ''}],
});

const addTimeSlot = (day: string | number) => {
  if (businessHours.value[day].length < 2) {
    businessHours.value[day].push({opening_time: '', closing_time: ''});
    return;
  }
  snackbar.add({
    type: 'error',
    text: 'Máximo de 2 horários por dia',
  });
}

const removeTimeSlot = (day: string | number, index: any) => {
  if (businessHours.value[day].length > 1) {
    businessHours.value[day].splice(index, 1);
    return;
  }
  snackbar.add({
    type: 'error',
    text: 'Mínimo de 1 horário por dia',

  });
};

const submitBusinessHours = () => {
  fetch('http://localhost:8001/api/stores/business-hours', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      store_id: 1,
      hours: businessHours.value
    })
  })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
}

</script>

<template>
  <UCard class="md:my-4" :ui="{ header: {padding: 'px-4 py-0 sm:px-0'} }">

    <template #header>
      <div class="flex flex-col items-center justify-center">
        <UIcon name="i-heroicons-solid:calendar" class="admin-settings_icon w-20 h-20"/>
        <h2 class="font-bold text-2xl mb-2">Horário de atendimento</h2>
        <span class="text-gray-500 text-md text-center">Defina o horário de atendimento do seu estabelecimento.</span>
      </div>
    </template>

    <UContainer class="flex items-center justify-center">
      <form @submit.prevent="submitBusinessHours">
        <div v-for="day in daysOfWeek" class="mb-4">

          <div class="flex flex-row gap-2">
            <h3 class="text-md font-semibold">{{ daysOfWeekTranslated[day] }}</h3>
            <button type="button" @click="addTimeSlot(day)" class="text-blue-500">Adicionar hórario</button>
          </div>

          <div v-for="(timeSlot, index) in businessHours[day]" class="flex items-center mb-2">
            <input v-model="timeSlot.opening_time" type="time" class="mr-2 p-2 border rounded"
                   placeholder="Opening Time"/>
            <input v-model="timeSlot.closing_time" type="time" class="mr-2 p-2 border rounded"
                   placeholder="Closing Time"/>
            <button type="button" @click="removeTimeSlot(day, index)" class="text-red-500">Remover horário</button>
          </div>

        </div>

        <button
            class="admin-settings_button rounded border py-2 text-lg font-semibold shadow w-full">
          Salvar
        </button>

      </form>
    </UContainer>

  </UCard>
</template>