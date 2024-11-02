<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <DefaultHeader/>
    <div class="flex-grow">
      <slot/>
    </div>
    <DefaultFooter/>
    <NuxtSnackbar/>
  </div>
</template>