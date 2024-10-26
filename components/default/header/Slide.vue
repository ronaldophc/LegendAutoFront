<script setup lang="ts">

const props = defineProps<{
  onClose;
}>();

</script>

<template>

  <USlideover>
    <UCard class="flex flex-col" >
      <template #header>
        <div class="flex items-center justify-between">
          <a href="/">
            <img src="../../../assets/images/logo.png" class="w-24">
          </a>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" @click="onClose"/>
        </div>
      </template>

      <div class="flex flex-col gap-4">
        <NuxtLink to="/" class="default-header_link" @click.native="onClose">
          Home
        </NuxtLink>
        <NuxtLink to="/" class="default-header_link" @click.native="onClose">
          Cadastrar
        </NuxtLink>
        <NuxtLink to="#" class="default-header_link" @click.native="onClose">
          Configurações
        </NuxtLink>
        <NuxtLink to="#" class="default-header_link" @click.native="onClose">
          Ver site
        </NuxtLink>
      </div>
    </UCard>
  </USlideover>
</template>