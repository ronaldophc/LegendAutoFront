<script lang="ts" setup>

import { useRegisterStore } from '~/stores/register';

const register = useRegisterStore();


</script>

<template>
  <div class="text-black">
    <h1>Etapa 1: Tipo de Veículo</h1>
    <select v-model="vehicleType">
      <option value="carro">Carro</option>
      <option value="moto">Moto</option>
      <option value="caminhao">Caminhão</option>
    </select>
    <button @click="nextStep">Próximo</button>
  </div>
</template>