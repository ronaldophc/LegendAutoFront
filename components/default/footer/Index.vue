<script setup lang="ts">

import logoSrc from "assets/images/logo-white.png";
import {useStore} from "~/stores/store";

const store = await useStore().getStore();

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
          <span class="text-white font-bold">MAPA DO SITE</span>
          <NuxtLink to="/about">Sobre</NuxtLink>
          <NuxtLink to="/stock">Estoque</NuxtLink>
          <NuxtLink to="/contact">Contato</NuxtLink>
        </div>
        <div class="flex flex-col text-white">
          <span class="text-white font-bold">TELEFONES</span>
          <span class="text-white">{{ store.phone }}</span>
        </div>
        <div class="flex flex-col text-white">
          <span class="text-white font-bold">REDES SOCIAIS</span>
          <div class="flex gap-2">
            <DefaultCommonsSocial v-if="store.facebook" :link="store.facebook" :icon="'i-ic:baseline-facebook'" :background-color="'bg-white'"/>
            <DefaultCommonsSocial v-if="store.instagram" :link="store.instagram" :icon="'i-mdi:instagram'" :background-color="'bg-white'"/>
            <DefaultCommonsSocial v-if="store.tiktok" :link="store.tiktok" :icon="'i-ic:baseline-tiktok'" :background-color="'bg-white'"/>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col text-white ms-5">
      <span class="flex text-white items-center font-semibold"><UIcon name="i-material-symbols:location-on-rounded" class="bg-white me-2"/>{{ store.address }}</span>
    </div>
    <hr class="default-footer_divider w-[90vw] border-t">
    <div class="text-white py-3 flex w-[90vw] gap-2 md:justify-between md:w-[50vw]">
      <span class="text-white">© 2024 - Todos os direitos reservados</span>
      <span class="text-white">Desenvolvido por LegendAuto</span>
    </div>
  </footer>
</template>
