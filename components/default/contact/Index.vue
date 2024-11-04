<script setup lang="ts">
import {useStore} from "~/stores/store";

const store = await useStore().getStore();
</script>

<template>
  <UContainer class="my-10 flex md:flex-row flex-col gap-5">
    <div class="flex md:w-2/3 w-full">
      <iframe
          :src="store.google_maps"
          height="450" style="border:0;" allowfullscreen="" loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          class="w-full"></iframe>
    </div>
    <div class="bg-white rounded-2xl p-5 w-full md:w-1/3">
      <h1 class="text-2xl font-semibold text-center">INFORMAÇÕES</h1>
      <hr class="flex-grow border-t border-2 my-5 border-purple-700">
      <div class="flex flex-col gap-1">
        <p>{{store.address}}</p>
        <p>Telefone: {{store.phone}}</p>
        <p>WhatsApp: {{store.whatsapp}}</p>
        <div class="bg-purple-700 rounded-2xl p-2">
          <p class="text-white font-bold">Horário de funcionamento:</p>
          <p class="text-white font-bold">{{store.hours}}</p>
        </div>
        <div>
          <DefaultCommonsSocial v-if="store.facebook" :link="store.facebook" :icon="'i-ic:baseline-facebook'" :background-color="'bg-black'"/>
          <DefaultCommonsSocial v-if="store.instagram" :link="store.instagram" :icon="'i-mdi:instagram'" :background-color="'bg-black'"/>
          <DefaultCommonsSocial v-if="store.tiktok" :link="store.tiktok" :icon="'i-ic:baseline-tiktok'" :background-color="'bg-black'"/>
        </div>
      </div>
    </div>
  </UContainer>
</template>
