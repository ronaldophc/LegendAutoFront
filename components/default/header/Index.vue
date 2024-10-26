<script setup lang="ts">

import {DefaultHeaderSlide} from "#components";

const slideover = useSlideover();
function toggleMenu() {
  slideover.open(DefaultHeaderSlide, {
    onClose: slideover.close
  })
}

</script>

<template>

  <nav class="default-header_top">
    <UContainer class="default-header_container flex flex-wrap justify-between items-center mx-auto">
      <span class="text-lg default-header_title-left">Horário:</span>
    </UContainer>
  </nav>

  <nav class="default-header_bottom py-3 shadow-lg">
    <UContainer>
      <div class="max-w-screen-xl mx-auto text-lg font-semibold">
        <div class="flex w-full items-center justify-between">
          <a href="#">
            <img src="../../../assets/images/logo.png" alt="">
          </a>

          <DefaultHeaderNav />
          <!--           Botao para abrir menu no mobile-->
          <button @click="toggleMenu" class="md:hidden flex items-center justify-center">
            <UIcon name="i-heroicons:list-bullet" class="w-10 h-12"/>
          </button>
        </div>
      </div>
    </UContainer>
  </nav>

</template>