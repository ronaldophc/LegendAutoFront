<script lang="ts" setup>

import {useRegisterStore} from '~/stores/register';
import {ref} from "vue";

const register = useRegisterStore();
const router = useRouter();

const links = [{
  label: 'Tipo de veículo',
  icon: 'i-material-symbols:counter-1-outline',
  active: true,
}, {
  label: 'Informações do veículo',
  icon: 'i-material-symbols:counter-2-outline',
  active: false,
}, {
  label: 'Carregar fotos do veículo',
  icon: 'i-material-symbols:counter-3-outline',
  active: false,
}, {
  label: 'Finalizar cadastro',
  icon: 'i-material-symbols:counter-4-outline',
  active: false,
}];

async function selectCar() {
  register.setVehicleType('car');
  await router.push('/admin/create/vehicle');
}

async function selectMotorcycle() {
  register.setVehicleType('motorcycle');
  await router.push('/admin/create/vehicle');
}

const isSmallScreen = ref(window.innerWidth < 900);

window.addEventListener('resize', () => {
  isSmallScreen.value = window.innerWidth < 900;
});

</script>

<template>
  <div class="flex justify-center items-center w-full my-5">
    <UBreadcrumb :links="links" :ui="{li: 'text-blue-500'}">
      <template #default="{ link, isActive, index }">
        <UBadge :class="link.active ? 'bg-green-400' : 'bg-gray-300'" class="rounded-full truncate">
          <span v-if="!isSmallScreen">{{ link.label }}</span>
        </UBadge>
      </template>
    </UBreadcrumb>
  </div>

  <div class="admin-create_type pb-10 text-3xl flex flex-col justify-center items-center w-full">
    <h1 class="mt-5 text-center">Selecione o tipo de veículo</h1>
    <div class="flex flex-wrap justify-center items-center gap-10 mt-5">
      <UCard @click="selectCar"
             class="admin-create_card flex flex-col justify-center items-center w-40 h-60 md:w-64 md:h-80 cursor-pointer">
        <div class="admin-create_circle w-20 h-20 md:w-36 md:h-36 flex items-center justify-center rounded-full">
          <UIcon name="i-ph:car-profile-fill" class="admin-create_icon w-16 h-16 md:w-32 md:h-32"/>
        </div>
        <template #footer>
          <span class="text-center text-3xl">Automóvel</span>
        </template>
      </UCard>

      <UCard @click="selectMotorcycle"
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