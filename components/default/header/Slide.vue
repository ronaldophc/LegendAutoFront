<script setup lang="ts">

const props = defineProps<{
  onClose;
}>();

</script>

<template>

  <USlideover>
    <UCard class="flex flex-col flex-1">
      <template #header>
        <div class="flex justify-between">
          <a href="/">
            <img src="../../../assets/images/logo.png" class="w-24">
          </a>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="w-10 h-10" @click.native="onClose"/>
        </div>
      </template>

      <div class="flex flex-col gap-4">
        <NuxtLink to="/" class="default-header_link" @click.native="onClose">
          <UIcon name="i-material-symbols:home-outline" class="w-5 h-5"/>
          Home
        </NuxtLink>
        <NuxtLink to="/" class="default-header_link" @click.native="onClose">
          <UIcon name="i-material-symbols:directions-car-outline" class="w-5 h-5"/>
          Estoque
        </NuxtLink>
        <NuxtLink to="#" class="default-header_link" @click.native="onClose">
          <UIcon name="i-heroicons:information-circle" class="w-5 h-5"/>

          Sobre
        </NuxtLink>
        <NuxtLink to="#" class="default-header_link" @click.native="onClose">
          <UIcon name="i-heroicons:map" class="w-5 h-5"/>
          Contato
        </NuxtLink>
      </div>
    </UCard>
  </USlideover>
</template>