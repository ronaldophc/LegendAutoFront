<template>
    <div class="flex h-screen w-screen items-center justify-center">
        <!-- Container Principal -->
        <div class="flex h-full w-full bg-gray-100 rounded-lg shadow-lg md:h-4/5 md:w-4/5 lg:w-3/4">
            <!-- Metade com o Formulário -->
            <div class="flex w-full flex-col items-center justify-center p-6 md:w-1/2">
                <!-- Logo -->
                <div class="mb-4">
                    <img src="../../assets/images/logo.png" alt="Logo" />
                </div>

                <!-- Mensagem de Bem-vindo -->
                <UDivider label="Bem vindo" size="md" :ui="{ label: 'text-blue-700 text-2xl' }" />
                <h3 class="text-md mb-6 text-gray-500">Preencha com seus dados para prosseguir</h3>

                <!-- Formulário -->
                <form class="w-full max-w-xs">
                    <!-- Campo de Login -->
                    <div class="mb-4">
                        <label class="mb-2 block text-sm font-bold text-gray-700" for="username"> Email </label>
                        <input
                            class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                            id="username" type="text" placeholder="Email" />
                    </div>

                    <!-- Campo de Senha -->
                    <div class="mb-6">
                        <label class="mb-2 block text-sm font-bold text-gray-700" for="password"> Senha </label>
                        <input
                            class="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                            id="password" type="password" placeholder="******" />
                    </div>

                    <!-- Botão de Login -->
                    <button
                        class="w-full focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                        type="button">Entrar
                    </button>
                </form>
            </div>

            <!-- Metade com Imagem -->
            <div class="hidden bg-cover bg-center md:flex md:w-1/2 shadow-lg bg-blue-400 rounded-e-lg">
                <img src="../../assets/images/laptop.svg" alt="">
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    sanctum: {
        excluded: true,
        guestOnly: true
    }
});
</script>