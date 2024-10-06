<script setup lang="ts">
import { ref } from 'vue';
const emit = defineEmits(['order-changed']);

const isOpen = ref(false);
const dropDown = ref('Ordenar');

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

const orderBy = (criteria) => {
  emit('order-changed', criteria);
  dropDown.value = criteria === 'asc' ? 'Menor preço' : 'Maior preço';
  isOpen.value = false;
}
</script>

<template>
  <div class="relative inline-block text-left">
    <div>
      <button type="button" @click="toggleDropdown" class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-5 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
        {{ dropDown }}
        <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <div v-if="isOpen" class="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <a @click="orderBy('asc')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Menor preço</a>
        <a @click="orderBy('desc')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Maior preço</a>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>