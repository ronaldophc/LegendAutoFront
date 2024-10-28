<script setup lang="ts">

import logoSrc from "assets/images/logo-white.png";
</script>

<template>
  <footer class="default-footer bg-black flex flex-col items-center bottom-0 w-full">
    <div class="flex py-3 items-end w-[90vw]">
      <hr class="default-footer_divider flex-grow border-t">
      <img :src="logoSrc" alt="Logo" class="px-5"/>
      <hr class="default-footer_divider flex-grow border-t">
    </div>
    <div class="w-[90vw] md:w-[50vw] mb-3">
      <div class="grid grid-cols-2 gap-5 md:flex md:flex-row justify-between">
        <div class="flex flex-col text-white">
          <span class="text-white">MAPA DO SITE</span>
          <NuxtLink to="/about">Sobre</NuxtLink>
          <NuxtLink to="/stock">Estoque</NuxtLink>
          <NuxtLink to="/contact">Contato</NuxtLink>
        </div>
        <div class="flex flex-col text-white">
          <span class="text-white">TELEFONES</span>
          <span class="text-white">(42) 99999-9999</span>
          <span class="text-white">(42) 99999-9999</span>
        </div>
        <div class="flex flex-col text-white">
          <span class="text-white">REDES SOCIAIS</span>
          <div class="flex gap-2">
            <a><UIcon name="i-ic:baseline-facebook" class="w-10 h-10 bg-white"></UIcon></a>
            <a><UIcon name="i-mdi:instagram" class="w-10 h-10 bg-white"></UIcon></a>
            <a><UIcon name="i-ic:baseline-tiktok" class="w-10 h-10 bg-white"></UIcon></a>
          </div>
        </div>
      </div>
    </div>
    <hr class="default-footer_divider w-[90vw] border-t">
    <div class="text-white py-3 flex w-[90vw] gap-2 md:justify-between md:w-[50vw]">
      <span class="text-white">© 2024 - Todos os direitos reservados</span>
      <span class="text-white">Desenvolvido por LegendAuto</span>
    </div>
  </footer>
</template>
