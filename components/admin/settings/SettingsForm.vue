<script setup lang="ts">
const API_URL = 'api/stores/1';
const STORE_NAME = 'Auto Legend';

const snackbar = useSnackbar();
const storeData = {
  address: ref(''),
  phoneComercial: ref(''),
  phoneWhats: ref(''),
  email: ref(''),
  instagram: ref(''),
  tiktok: ref(''),
  facebook: ref(''),
  mapsLink: ref(''),
  hours: ref(''),
};

async function fetchStoreData() {
  try {
    const stores = await useApi(API_URL, { method: 'GET' });
    const data = stores.data._value.data;
    storeData.address.value = data.address;
    storeData.phoneComercial.value = data.phone;
    storeData.phoneWhats.value = data.whatsapp;
    storeData.email.value = data.email;
    storeData.instagram.value = data.instagram;
    storeData.tiktok.value = data.tiktok;
    storeData.facebook.value = data.facebook;
    storeData.mapsLink.value = data.google_maps;
    storeData.hours.value = data.hours;
  } catch (error) {
    console.error("onMounted error: ", error);
  }
}

onMounted(fetchStoreData);

async function onSave() {
    const requestBody = {
      address: storeData.address.value,
      phone: storeData.phoneComercial.value,
      whatsapp: storeData.phoneWhats.value,
      email: storeData.email.value,
      instagram: storeData.instagram.value,
      tiktok: storeData.tiktok.value,
      facebook: storeData.facebook.value,
      google_maps: storeData.mapsLink.value,
      hours: storeData.hours.value,
      name: STORE_NAME,
    };

    const response = await useApi(API_URL, {
      method: 'PUT',
      body: JSON.stringify(requestBody),
    });
    if (response.status.value === 'success') {
      snackbar.add({
        type: 'success',
        text: 'Informações atualizadas com sucesso.',
      });
      return;
    }

    snackbar.add({
      type: 'error',
      text: 'Erro ao atualizar informações.',
    });

}
</script>

<template>
  <div class="admin-settings_form mx-auto flex w-full max-w-sm flex-col">
    <div class="mx-auto my-5 flex font-semibold text-2xl">
      Alterar informações
    </div>
    <div class="flex flex-col gap-4">
      <div class="relative w-full flex justify-center">
        <input type="text"
               v-model="storeData.address.value"
               class="px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border focus:outline-none focus:ring-0 peer"
               id="address"
               placeholder="Avenida Manoel Ribas - 554"/>
        <label for="address"
               class="admin-settings_label mx-5 md:mx-2.5 hover:cursor-text absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
          Endereço
        </label>
      </div>

      <div class="relative w-full flex justify-center">
        <input type="text"
               v-model="storeData.phoneComercial.value"
               class="px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border focus:outline-none focus:ring-0 peer"
               id="phone_comercial"
               placeholder="+55 (**) ****-****"/>
        <label for="phone_comercial"
               class="admin-settings_label hover:cursor-text absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] mx-5 md:mx-2.5 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
          Telefone Comercial
        </label>
      </div>

      <div class="relative w-full flex justify-center">
        <input type="text"
               v-model="storeData.phoneWhats.value"
               class="px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border focus:outline-none focus:ring-0 peer"
               id="phone_whats"
               placeholder="+55 (**) ****-****"/>
        <label for="phone_whats"
               class="admin-settings_label hover:cursor-text absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] mx-5 md:mx-2.5 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
          WhatsApp Atendimento
        </label>
      </div>

      <div class="relative w-full flex justify-center">
        <input type="text"
               v-model="storeData.email.value"
               class="px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border focus:outline-none focus:ring-0 peer"
               id="email"
               placeholder="exemplo@gmail.com"/>
        <label for="email"
               class="admin-settings_label hover:cursor-text absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] mx-5 md:mx-2.5 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
          Email Atendimento
        </label>
      </div>

      <div class="relative w-full flex justify-center">
        <input type="text"
               v-model="storeData.instagram.value"
               class="px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border focus:outline-none focus:ring-0 peer"
               id="instagram"
               placeholder="https://www.instagram.com/exemplo"/>
        <label for="instagram"
               class="admin-settings_label hover:cursor-text absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] mx-5 md:mx-2.5 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
          Instagram
        </label>
      </div>

      <div class="relative w-full flex justify-center">
        <input type="text"
               v-model="storeData.tiktok.value"
               class="px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border focus:outline-none focus:ring-0 peer"
               id="tiktok"
               placeholder="https://www.tiktok.com/@exemplo"/>
        <label for="tiktok"
               class="admin-settings_label hover:cursor-text absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] mx-5 md:mx-2.5 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
          Tiktok
        </label>
      </div>

      <div class="relative w-full flex justify-center">
        <input type="text"
               v-model="storeData.facebook.value"
               class="px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border focus:outline-none focus:ring-0 peer"
               id="facebook"
               placeholder="https://www.facebook.com/exemplo"/>
        <label for="facebook"
               class="admin-settings_label hover:cursor-text absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] mx-5 md:mx-2.5 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
          Facebook
        </label>
      </div>

      <div class="relative w-full flex justify-center">
        <input type="text"
               v-model="storeData.mapsLink.value"
               class="px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border focus:outline-none focus:ring-0 peer"
               id="maps_link"
               placeholder="https://maps.app.goo.gl/KpcrmYkn4HaZYNkm9"/>
        <label for="maps_link"
               class="admin-settings_label hover:cursor-text absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] mx-5 md:mx-2.5 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
          Google Maps link
        </label>
      </div>

      <div class="relative w-full flex justify-center">
        <input type="text"
               v-model="storeData.hours.value"
               class="px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border focus:outline-none focus:ring-0 peer"
               id="hours"
               placeholder="08:00 - 17:00"/>
        <label for="hours"
               class="admin-settings_label hover:cursor-text absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] mx-5 md:mx-2.5 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
          Horário de atendimento
        </label>
      </div>

      <button
          class="button my-2 rounded w-full border py-2 px-5 text-lg font-semibold shadow"
          @click="onSave">
        Salvar
      </button>
    </div>
  </div>
</template>