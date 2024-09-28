<script lang="ts" setup>
import {ref} from 'vue';

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
</script>

<template>
  <nav class="admin-header_top">
    <UContainer
        class="admin-header_container flex flex-wrap justify-between items-center mx-auto max-w-screen-xl py-1">
      <div class="admin-header_section flex items-center">
        <UIcon name="i-heroicons:user-solid" class="admin-header_icon w-5 h-5 me-1"/>
        <span class="text-lg admin-header_title-left">
                    Administrativo
                </span>
      </div>

      <a @click="logoutfunc" class="admin-header_logout text-lg hover:cursor-pointer flex items-center ">
        <UIcon name="i-heroicons:arrow-right-end-on-rectangle-20-solid"
               class="admin-header_icon w-5 h-5 me-1"/>
        <span class="admin-header_logout-text">Sair</span>
      </a>
    </UContainer>
  </nav>
  <nav class="admin-header_bottom py-3">
    <UContainer>
      <div class="max-w-screen-xl mx-auto text-lg font-semibold">
        <div class="flex w-full items-center justify-between">
          <a href="#">
            <img src="../../assets/images/logo_white.png" alt="">
          </a>

          <ul class="flex-row justify-end w-full text-lg hidden md:flex">
            <li>
              <a href=""
                 class="flex px-3 py-2 rounded-2xl">Home</a>
            </li>
            <li>
              <a href=""
                 class="flex items-center px-3 py-2 rounded-2xl">Cadastrar</a>
            </li>
            <li>
              <NuxtLink to="/meusite/settings"
                        class="admin-header_link flex items-center px-3 py-2 rounded-2xl">
                Configurações
              </NuxtLink>
            </li>
            <li>
              <a href=""
                 class="flex items-center px-3 py-2 rounded-2xl">Ver
                site</a>
            </li>
          </ul>

          <button @click="toggleMenu" class="md:hidden flex items-center justify-center">
            <UIcon name="i-heroicons:list-bullet" class="w-10 h-12 bg-white"/>
          </button>

          <USlideover v-model="isMenuOpen">
            <UCard class="flex flex-col flex-1"
                   :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100' }">
              <template #header>
                <div class="flex items-center justify-between">
                  <a href="#">
                    <img src="../../assets/images/logo.png" class="w-24">
                  </a>
                  <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                           @click="isMenuOpen = false"/>
                </div>
              </template>

              <div class="flex flex-col flex-1">
                <div class="flex flex-col gap-4">
                  <NuxtLink to="/meusite/settings" class="admin-header_link flex items-center px-3 py-2 rounded-2xl">
                    Home
                  </NuxtLink>
                  <NuxtLink to="/meusite/settings" class="admin-header_link flex items-center px-3 py-2 rounded-2xl">
                    Cadastrar
                  </NuxtLink>
                  <NuxtLink to="/meusite/settings" class="admin-header_link flex items-center px-3 py-2 rounded-2xl">
                    Configurações
                  </NuxtLink>
                  <NuxtLink to="/meusite/settings" class="admin-header_link flex items-center px-3 py-2 rounded-2xl">
                    Ver site
                  </NuxtLink>
                </div>
              </div>
            </UCard>
          </USlideover>

        </div>
      </div>
    </UContainer>
  </nav>
</template>
