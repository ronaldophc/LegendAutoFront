<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const dropDown = ref('Ordenar');
const emit = defineEmits(['order-changed']);

const orderBy = (event) => {
  const criteria = event.target.value;
  emit('order-changed', criteria);
  dropDown.value = criteria === 'asc' ? 'Menor preço' : 'Maior preço';
}
</script>

<template>
  <select @change="orderBy"
    class="text-sm bg-white rounded-lg shadow text-md text-gray-700 hover:bg-gray-50 focus:outline-none">
    <option value="" disabled>Ordenar</option>
    <option value="asc">Menor preço</option>
    <option value="desc">Maior preço</option>
  </select>
</template>

<style scoped></style>