<script setup lang="ts">

</script>

<template>
  <div class="default-topbar flex m-5 justify-between">
    <div class="bg-white flex justify-center rounded-lg shadow-lg me-2 w-full md:w-1/2 lg:w-1/3">
      <input type="text" placeholder="Pesquisar veículo" class="p-4 w-full bg-transparent">
      <button class="default-topbar_button flex p-2 rounded-r-lg shadow-lgc">
        <UIcon name="i-ic:twotone-search" class="m-auto p-3"></UIcon>
      </button>
    </div>
    <OrderDropdown @order-changed="" class="p-4"/>
  </div>
</template>
