<script lang="ts" setup>
import { useRegisterStore } from '~/stores/register';

const register = useRegisterStore();

const links = [{
  id: 1,
  label: 'Tipo de veículo',
  icon: 'i-material-symbols:counter-1-outline',
  active: true,
}, {
  id: 2,
  label: 'Informações do veículo',
  icon: 'i-material-symbols:counter-2-outline',
  active: false,
}, {
  id: 3,
  label: 'Carregar fotos do veículo',
  icon: 'i-material-symbols:counter-3-outline',
  active: false,
}, {
  id: 4,
  label: 'Finalizar cadastro',
  icon: 'i-material-symbols:counter-4-outline',
  active: false,
}];

register.setLinks(links);

</script>

<template>
  <AdminCreateBreadCrumb/>

  <AdminCreateType v-if="register.links[0].active === true"/>

  <AdminCreateVehicle v-if="register.links[1].active === true"/>

  <AdminCreateImages v-if="register.links[2].active === true"/>
</template>