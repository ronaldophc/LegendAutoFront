<template>
  <div class="flex flex-col min-h-screen">
    <DefaultHeader/>
    <div class="flex-grow">
      <slot/>
    </div>
    <DefaultFooter/>
    <NuxtSnackbar/>
  </div>
</template>
<script setup>
</script>