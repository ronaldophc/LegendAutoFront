<script setup lang="ts">

import {DefaultHeaderSlide} from "#components";

const slideover = useSlideover();
const workHours = ref('');
function toggleMenu() {
  slideover.open(DefaultHeaderSlide, {
    onClose: slideover.close
  })
}

async function getWorkHours() {
  const response = await useApi('api/stores/1/hours');
  workHours.value = response.data.value.data;
}

onMounted(() => {
  getWorkHours();
});

</script>

<template>

  <nav class="default-header_top">
    <UContainer class="py-1">
      <span class="text-lg default-header_title-left">Horário: {{workHours}}</span>
    </UContainer>
  </nav>

  <nav class="default-header_bottom py-2 shadow-lg">
    <UContainer>
        <div class="flex justify-between">
          <a href="/">
            <img src="../../../assets/images/logo.png" alt="">
          </a>

          <DefaultHeaderNav />
          <!--           Botao para abrir menu no mobile-->
          <button @click="toggleMenu" class="md:hidden">
            <UIcon name="i-bi:three-dots-vertical" class="w-7 h-10"/>
          </button>
        </div>
    </UContainer>
  </nav>

</template>