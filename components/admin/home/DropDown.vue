<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const isOpen = ref(false);
const dropDown = ref('Ordenar');
const emit = defineEmits(['order-changed']);

const orderBy = (event) => {
  const criteria = event.target.value;
  emit('order-changed', criteria);
  dropDown.value = criteria === 'asc' ? 'Menor preço' : 'Maior preço';
}
</script>

<template>
  <form class="flex justify-center items-center z-50 text-center">
    <div class="">
      <select @change="orderBy" class="text-md justify-center w-full rounded-lg border border-gray-300 shadow-sm px-5 py-2 bg-white font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
        <option value="" disabled>Ordenar</option>
        <option value="asc">Menor preço</option>
        <option value="desc">Maior preço</option>
      </select>
    </div>
  </form>
</template>

<style scoped></style>