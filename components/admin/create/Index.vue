<script setup lang="ts">
import { useBreadCrumbStore } from "~/stores/breadCrumb";

const breadCrumb = useBreadCrumbStore();
</script>

<template>
  <AdminCreateBreadCrumb />

  <AdminCreateType v-if="breadCrumb.activeLink.id == '1'"/>

  <AdminCreateVehicle v-if="breadCrumb.activeLink.id == '2'"/>

  <AdminCreateImages v-if="breadCrumb.activeLink.id == '3'"/>
</template>