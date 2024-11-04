<script setup lang="ts">

</script>

<template>
  <DefaultCarousel class="hidden sm:flex"/>
  <DefaultCarouselMobile class="flex sm:hidden"/>
  <DefaultCategories :is_new="true" :is_featured="false"/>
  <DefaultMinibanner/>
  <DefaultCategories :is_new="false" :is_featured="true" :title="'Novidades'"/>
</template>