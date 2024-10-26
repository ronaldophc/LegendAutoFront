<script setup lang="ts">

import {useBreadCrumbStore} from "~/stores/breadCrumb";

const breadCrumb = useBreadCrumbStore();
const {logout} = useSanctumAuth();
const router = useRouter();
const isMenuOpen = ref(false);

async function logoutfunc() {
  try {
    await logout();
  } catch (error) {
    await router.push('/meusite/login');
  }
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

async function resetBreadCrumb(route: string) {
  await router.push(route);
  breadCrumb.setActiveLink(1);
}

</script>

<template>
  <nav class="admin-header_top">
    <UContainer
        class="admin-header_container flex flex-wrap justify-between items-center mx-auto max-w-screen-xl py-1">
      <div class="admin-header_section flex items-center">
        <UIcon name="i-heroicons:user-solid" class="admin-header_icon w-5 h-5 me-1"/>
        <span class="text-lg admin-header_title-left">Administrativo</span>
      </div>

      <a @click="logoutfunc" class="admin-header_logout text-lg hover:cursor-pointer flex items-center ">
        <UIcon name="i-heroicons:arrow-right-end-on-rectangle-20-solid"
               class="admin-header_icon w-5 h-5 me-1"/>
        <span class="admin-header_logout-text">Sair</span>
      </a>
    </UContainer>
  </nav>
  <nav class="admin-header_bottom py-2">
    <UContainer>
        <div class="flex w-full items-center justify-between">
          <a href="#">
            <img src="../../assets/images/logo-white.png" alt="">
          </a>

          <ul class="flex-row justify-end w-full text-lg hidden md:flex">
            <li>
              <NuxtLink to="/meusite" class="admin-header_link">Home</NuxtLink>
            </li>
            <li>
              <NuxtLink @click="resetBreadCrumb('/meusite/create')" class="admin-header_link">Cadastrar</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/meusite/settings" class="admin-header_link">Configurações</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/meusite/settings" class="admin-header_link">Ver site</NuxtLink>
            </li>
          </ul>

          <button @click="toggleMenu" class="md:hidden">
            <UIcon name="i-heroicons:list-bullet" class="w-10 h-12 bg-white"/>
          </button>


          <USlideover v-model="isMenuOpen">
            <UCard class="flex flex-col flex-1"
                   :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100' }">
              <template #header>
                <div class="flex justify-between">
                  <a href="#">
                    <img src="../../assets/images/logo.png" class="w-24">
                  </a>
                  <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="w-10 h-10" @click="isMenuOpen = false"/>
                </div>
              </template>

              <div class="flex flex-col gap-4">
                <NuxtLink to="/meusite" class="admin-header_link" @click.native="isMenuOpen = false">
                  <UIcon name="i-material-symbols:home-outline" class="w-5 h-5"/>
                  Home
                </NuxtLink>
                <NuxtLink @click="resetBreadCrumb('/meusite/create')" class="admin-header_link" @click.native="isMenuOpen = false">
                  <UIcon name="i-material-symbols:directions-car-outline" class="w-5 h-5"/>
                  Cadastrar
                </NuxtLink>
                <NuxtLink to="/meusite/settings" class="admin-header_link" @click.native="isMenuOpen = false">
                  <UIcon name="i-heroicons:cog-6-tooth" class="w-5 h-5"/>
                  Configurações
                </NuxtLink>
                <NuxtLink to="/meusite/settings" class="admin-header_link" @click.native="isMenuOpen = false">
                  <UIcon name="i-material-symbols:computer-outline" class="w-5 h-5"/>
                  Ver site
                </NuxtLink>
              </div>
            </UCard>
          </USlideover>

        </div>
    </UContainer>
  </nav>
</template>
