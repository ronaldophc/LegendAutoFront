<script setup lang="ts">

const snackbar = useSnackbar();

const address = ref('');
const phoneComercial = ref('');
const phoneWhats = ref('');
const email = ref('');
const instagram = ref('');
const tiktok = ref('');
const facebook = ref('');
const mapsLink = ref('');

onMounted(async () => {
  try {
    const stores = await useApi('api/stores/1', {
      method: 'GET',
    });

    const data = stores.data._value.data;

    address.value = data.address;
    phoneComercial.value = data.phone;
    phoneWhats.value = data.whatsapp;
    email.value = data.email;
    instagram.value = data.instagram;
    tiktok.value = data.tiktok;
    facebook.value = data.facebook;
    mapsLink.value = data.google_maps;

  } catch (e) {
    console.error("onMounted error: ", e);
  }

});

async function onSave() {

  try {
    const response = await useApi('api/stores/1', {
      method: 'PUT',
      body: JSON.stringify({
        address: address.value,
        phone: phoneComercial.value,
        whatsapp: phoneWhats.value,
        email: email.value,
        instagram: instagram.value,
        tiktok: tiktok.value,
        facebook: facebook.value,
        google_maps: mapsLink.value,
        name: 'Auto Legend',
      }),
    });

    if(response.status.value !== 'success') {
      snackbar.add({
        type: 'error',
        text: 'Erro ao atualizar informações.',
      });
      return;
    }

    snackbar.add({
      type: 'success',
      text: 'Informações atualizadas com sucesso.',
    });

  } catch (e) {
    snackbar.add({
      type: 'error',
      text: 'Erro ao atualizar informações.',
    });
    console.error(e);
  }
}

</script>

<template>
  <div class="admin-settings_form mx-auto flex w-full max-w-sm flex-col">
    <div class="mx-auto my-10 flex font-semibold text-2xl">
      Alterar informações
    </div>
    <div class="flex flex-col gap-4">
      <div class="relative w-full flex justify-center">
        <input type="text"
               v-model="address"
               class="px-2.5 pb-2.5 pt-4 w-[90vw] w-full text-sm rounded-lg border focus:outline-none focus:ring-0 peer"
               id="address"
               placeholder="Avenida Manoel Ribas - 554"/>
        <label for="address"
               class="admin-settings_label mx-5 md:mx-2.5 hover:cursor-text absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
          Endereço
        </label>
      </div>

      <div class="relative w-full flex justify-center">
        <input type="text"
               v-model="phoneComercial"
               class="px-2.5 pb-2.5 pt-4 w-[90vw] w-full text-sm rounded-lg border focus:outline-none focus:ring-0 peer"
               id="phone_comercial"
               placeholder="+55 (**) ****-****"/>
        <label for="phone_comercial"
               class="admin-settings_label hover:cursor-text absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] mx-5 md:mx-2.5 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
          Telefone Comercial
        </label>
      </div>

      <div class="relative w-full flex justify-center">
        <input type="text"
               v-model="phoneWhats"
               class="px-2.5 pb-2.5 pt-4 w-[90vw] w-full text-sm rounded-lg border focus:outline-none focus:ring-0 peer"
               id="phone_whats"
               placeholder="+55 (**) ****-****"/>
        <label for="phone_whats"
               class="admin-settings_label hover:cursor-text absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] mx-5 md:mx-2.5 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
          WhatsApp Atendimento
        </label>
      </div>

      <div class="relative w-full flex justify-center">
        <input type="text"
               v-model="email"
               class="px-2.5 pb-2.5 pt-4 w-[90vw] w-full text-sm rounded-lg border focus:outline-none focus:ring-0 peer"
               id="email"
               placeholder="exemplo@gmail.com"/>
        <label for="email"
               class="admin-settings_label hover:cursor-text absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] mx-5 md:mx-2.5 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
          Email Atendimento
        </label>
      </div>

      <div class="relative w-full flex justify-center">
        <input type="text"
               v-model="instagram"
               class="px-2.5 pb-2.5 pt-4 w-[90vw] w-full text-sm rounded-lg border focus:outline-none focus:ring-0 peer"
               id="instagram"
               placeholder="https://www.instagram.com/exemplo"/>
        <label for="instagram"
               class="admin-settings_label hover:cursor-text absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] mx-5 md:mx-2.5 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
          Instagram
        </label>
      </div>

      <div class="relative w-full flex justify-center">
        <input type="text"
               v-model="tiktok"
               class="px-2.5 pb-2.5 pt-4 w-[90vw] w-full text-sm rounded-lg border focus:outline-none focus:ring-0 peer"
               id="tiktok"
               placeholder="https://www.tiktok.com/@exemplo"/>
        <label for="tiktok"
               class="admin-settings_label hover:cursor-text absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] mx-5 md:mx-2.5 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
          Tiktok
        </label>
      </div>

      <div class="relative w-full flex justify-center">
        <input type="text"
               v-model="facebook"
               class="px-2.5 pb-2.5 pt-4 w-[90vw] w-full text-sm rounded-lg border focus:outline-none focus:ring-0 peer"
               id="facebook"
               placeholder="https://www.facebook.com/exemplo"/>
        <label for="facebook"
               class="admin-settings_label hover:cursor-text absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] mx-5 md:mx-2.5 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
          Facebook
        </label>
      </div>

      <div class="relative w-full flex justify-center">
        <input type="text"
               v-model="mapsLink"
               class="px-2.5 pb-2.5 pt-4 w-[90vw] w-full text-sm rounded-lg border focus:outline-none focus:ring-0 peer"
               id="maps_link"
               placeholder="https://maps.app.goo.gl/KpcrmYkn4HaZYNkm9"/>
        <label for="maps_link"
               class="admin-settings_label hover:cursor-text absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] mx-5 md:mx-2.5 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
          Google Maps link
        </label>
      </div>

      <button
          class="admin-settings_button my-2 rounded w-full border py-2 px-5 text-lg font-semibold shadow"
          @click="onSave">
        Salvar
      </button>
    </div>
  </div>
</template>