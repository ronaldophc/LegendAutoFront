<script lang="ts" setup>

const { logout } = useSanctumAuth();

async function logoutfunc() {
    await logout();
}

</script>

<template>
    <nav class="bg-black ">
        <UContainer class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl py-1 ">
            <div class="flex items-center">
                <UIcon name="i-heroicons:user-solid" class="w-5 h-5 me-1" />
                <span class="text-lg text-white">
                    Administrativo
                </span>
            </div>

            <a @click="logoutfunc" class="text-lg hover:cursor-pointer flex items-center ">
                <UIcon name="i-heroicons:arrow-right-end-on-rectangle-20-solid" class="w-5 h-5 me-1" />
                <span class="text-white">Sair</span>
            </a>
        </UContainer>
    </nav>
    <nav class="bg-gradient-to-r from-[#009DFF] to-[#9000FF] py-3">
        <UContainer>
            <div class="max-w-screen-xl mx-auto text-white text-lg font-semibold text-white">
                <div class="flex w-full items-center">
                    <a href="#">
                        <img src="../../assets/images/logo_white.png" alt="">
                    </a>
                    <ul class="flex flex-row justify-end w-full text-lg space-x-8">
                        <li>
                            <a href="" class="flex items-center px-3 py-2 rounded-2xl hover:bg-black hover:bg-opacity-25">Home</a>
                        </li>
                        <li>
                            <a href="" class="flex items-center px-3 py-2 rounded-2xl hover:bg-black hover:bg-opacity-25">Cadastrar</a>
                        </li>
                        <li>
                            <NuxtLink to="/meusite/settings" class="flex items-center px-3 py-2 rounded-2xl hover:bg-black hover:bg-opacity-25">Configurações</NuxtLink>
                        </li>
                        <li>
                            <a href="" class="flex items-center px-3 py-2 rounded-2xl hover:bg-black hover:bg-opacity-25">Ver site</a>
                        </li>
                    </ul>
                </div>
            </div>
        </UContainer>
    </nav>
</template>
