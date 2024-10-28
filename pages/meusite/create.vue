<script setup lang="ts">

import {AdminCreateImages, AdminCreateType, AdminCreateVehicle} from "#components";

definePageMeta({
  layout: 'admin',
});
import { useBreadCrumbStore } from "~/stores/breadCrumb";

const breadCrumb = useBreadCrumbStore();
const activeComponent = computed(() => {
  if (breadCrumb.vehicleLinks[1].active) return AdminCreateVehicle;
  if (breadCrumb.vehicleLinks[2].active) return AdminCreateImages;
  return AdminCreateType;
});
</script>

<template>
  <AdminCreateBreadCrumb />
  <component :is="activeComponent" />
</template>