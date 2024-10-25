<script setup lang="ts">

import { useBreadCrumbStore } from "~/stores/breadCrumb";

const breadCrumb = useBreadCrumbStore();
const register = useRegisterStore();
const router = useRouter();

function selectType(type: string) {
  register.setVehicleType(type);
  breadCrumb.setActiveLink(2);
}

</script>

<template>
  <div class="admin-create_type pb-10 text-3xl flex flex-col justify-center items-center w-full">
    <h1 class="mt-5 text-center">Selecione o tipo de veículo</h1>
    <div class="flex flex-wrap justify-center items-center gap-10 mt-5">
      <UCard @click="selectType('car')"
             class="admin-create_card flex flex-col justify-center items-center w-40 h-60 md:w-64 md:h-80 cursor-pointer">
        <div class="admin-create_circle w-20 h-20 md:w-36 md:h-36 flex items-center justify-center rounded-full">
          <UIcon name="i-ph:car-profile-fill" class="admin-create_icon w-16 h-16 md:w-32 md:h-32"/>
        </div>
        <template #footer>
          <span class="text-center text-3xl">Automóvel</span>
        </template>
      </UCard>

      <UCard @click="selectType('motorcycle')"
             class="admin-create_card flex flex-col justify-center items-center w-40 h-60 md:w-64 md:h-80 cursor-pointer">
        <div class="admin-create_circle w-20 h-20 md:w-36 md:h-36 flex items-center justify-center rounded-full">
          <UIcon name="i-ph:motorcycle-fill" class="admin-create_icon w-16 h-16 md:w-32 md:h-32"/>
        </div>
        <template #footer>
          <span class="text-center text-3xl">Moto</span>
        </template>
      </UCard>
    </div>
  </div>
</template>