<script setup lang="ts">

const props = defineProps({
  vehicle: Object,
});

function vehicleName() {
  return props.vehicle.manufacture_year + ' ' + props.vehicle.manufacturer + ' ' + props.vehicle.model;
}

function toReais(price: number) {
  price = Math.round(price);
  return price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
}
</script>

<template>
  <div class="stock_item">
    <div class="stock_item_photo h-60">
      <img :src="vehicle.image_url" alt="Foto do veículo" class="stock_item-image">
    </div>
    <div class="stock_item_details">
      <a href="#" class="stock_item_link">{{vehicleName()}}</a>
      <div class="mileage">{{vehicle.current_km}}</div>
      <span class="price">{{toReais(vehicle.price)}}</span>
    </div>
  </div>
</template>