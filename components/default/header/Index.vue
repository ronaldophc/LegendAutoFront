<script setup lang="ts">

import {DefaultHeaderSlide} from "#components";
import {useStore} from "~/stores/store";

const store = await useStore().getStore();
const slideover = useSlideover();

function toggleMenu() {
  slideover.open(DefaultHeaderSlide, {
    onClose: slideover.close
  })
}

</script>

<template>

  <nav class="default-header_top">
    <UContainer class="py-1">
      <span class="text-lg default-header_title-left">Horário: {{store.hours}}</span>
    </UContainer>
  </nav>

  <nav class="default-header_bottom py-2 shadow-lg">
    <UContainer>
      <div class="flex justify-between">
        <a href="/">
          <img src="../../../assets/images/logo.png" alt="">
        </a>

        <DefaultHeaderNav/>

        <button @click="toggleMenu" class="md:hidden">
          <UIcon name="i-bi:three-dots-vertical" class="w-7 h-10"/>
        </button>
      </div>
    </UContainer>
  </nav>

</template>