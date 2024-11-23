<script setup lang="ts">
import quemSomos from 'assets/images/quem-somos.png';
import nossosValores from 'assets/images/nossos-valores.png';

definePageMeta({
  layout: 'default',
  sanctum: {
    excluded: true,
    guestOnly: true
  }
});
</script>

<template>
  <div class="default-about">

    <div class="w-full font-bold text-2xl text-center bg-gray-200 p-5">
      <h1>Sobre nós</h1>
    </div>

    <div class="m-10 flex flex-col gap-10">
      <div class="flex justify-between bg-gray-200 p-5 rounded-xl flex-col md:flex-row">
        <img :src="quemSomos" alt="quem-somos" class="max-h-96 max-w-96 object-contain md:m-auto"/>
        <div class="m-5">
          <h2 class="font-bold text-3xl"><span class="text-purple-600">QUEM</span> SOMOS</h2>
          <span class="default-about_font">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span>
        </div>
      </div>
      <div class="flex justify-between flex-col md:flex-row">
        <div class="m-5">
          <h2 class="font-bold text-3xl">NOSSOS <span class="text-purple-600">VALORES</span></h2>
          <span class="default-about_font">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span>
        </div>
        <img :src="nossosValores" alt="nossos-valores" class="max-h-96 max-w-96 object-contain md:m-auto"/>
      </div>
      <div class="flex flex-col bg-gray-200 p-5 rounded-xl text-center gap-5 mb-10">
        <h2 class="font-bold text-3xl">NOSSA <span class="text-purple-600">MISSÃO</span></h2>
        <span class="default-about_font">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>