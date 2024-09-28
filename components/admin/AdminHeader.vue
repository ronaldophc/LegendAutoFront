<script lang="ts" setup>

const { logout } = useSanctumAuth();

async function logoutfunc() {
    await logout();
}

</script>

<template>
    <nav class="admin-header_top">
        <UContainer
            class="admin-header_container flex flex-wrap justify-between items-center mx-auto max-w-screen-xl py-1">
            <div class="admin-header_section flex items-center">
                <UIcon name="i-heroicons:user-solid" class="admin-header_icon w-5 h-5 me-1" />
                <span class="text-lg admin-header_title-left">
                    Administrativo
                </span>
            </div>

            <a @click="logoutfunc" class="admin-header_logout text-lg hover:cursor-pointer flex items-center ">
                <UIcon name="i-heroicons:arrow-right-end-on-rectangle-20-solid"
                    class="admin-header_icon w-5 h-5 me-1" />
                <span class="admin-header_logout-text">Sair</span>
            </a>
        </UContainer>
    </nav>
    <nav class="admin-header_bottom py-3">
        <UContainer>
            <div class="max-w-screen-xl mx-auto text-lg font-semibold">
                <div class="flex w-full items-center">
                    <a href="#">
                        <img src="../../assets/images/logo_white.png" alt="">
                    </a>
                    <ul class="flex flex-row justify-end w-full text-lg space-x-8">
                        <li>
                            <a href=""
                                class="flex items-center px-3 py-2 rounded-2xl">Home</a>
                        </li>
                        <li>
                            <a href=""
                                class="flex items-center px-3 py-2 rounded-2xl">Cadastrar</a>
                        </li>
                        <li>
                            <NuxtLink to="/meusite/settings"
                                class="flex items-center px-3 py-2 rounded-2xl">
                                Configurações</NuxtLink>
                        </li>
                        <li>
                            <a href=""
                                class="flex items-center px-3 py-2 rounded-2xl">Ver
                                site</a>
                        </li>
                    </ul>
                </div>
            </div>
        </UContainer>
    </nav>
</template>
