<template>
    <div class="flex h-screen w-screen items-center justify-center">
        <!-- Container Principal -->
        <div class=" flex h-full w-full rounded-lg shadow-lg md:h-4/5 md:w-4/5 lg:w-3/4">
            <!-- Metade com o Formulário -->
            <div class="flex w-full flex-col items-center justify-center p-6 md:w-1/2">
                <!-- Logo -->
                <div class="mb-4">
                    <img src="../../assets/images/logo.png" alt="Logo" />
                </div>

                <!-- Mensagem de Bem-vindo -->
                <div class="w-full mt-8 text-2xl font-semibold lg:mt-0">
                    <div class="relative flex py-5 items-center">
                        <hr class="admin-login_divider flex-grow border-t">
                        <span class="admin-login_welcome flex-shrink mx-4 text-3xl">Bem-vindo</span>
                        <hr class="admin-login_divider flex-grow border-t">
                    </div>
                </div>
                <p class="text-xl text-gray-400 text-center">
                    Preencha com seus dados para prosseguir
                </p>

                <div v-if="errorMessage" class="text-red-500 text-center mb-4">
                    {{ errorMessage }}
                </div>

                <!-- Formulário -->
                <form class="admin-login_form w-full max-w-xs">
                    <!-- Campo de Login -->
                    <div class="mb-4">
                        <label class="mb-2 block text-sm font-bold" for="username"> Email </label>
                        <input
                            class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
                            id="username" type="text" placeholder="Email" />
                    </div>

                    <!-- Campo de Senha -->
                    <div class="mb-6">
                        <label class="mb-2 block text-sm font-bold" for="password"> Senha </label>
                        <input
                            class="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
                            id="password" type="password" placeholder="******" />
                    </div>

                    <!-- Botão de Login -->
                    <button
                        class="w-full focus:shadow-outline rounded px-4 py-2 font-bold focus:outline-none"
                        type="button"
                        @click="onLogin">Entrar
                    </button>
                </form>
            </div>

            <!-- Metade com Imagem -->
            <div class="admin-login_image hidden bg-cover bg-center md:flex md:w-1/2 shadow-lg rounded-e-lg">
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

const { login, isAuthenticated } = useSanctumAuth();

const formEmail = ref('');
const formPassword = ref('');
const errorMessage = ref('');

async function onLogin() {
    const userCredentials = {
        email: formEmail.value,
        password: formPassword.value,
    };
    errorMessage.value = ''; // Limpa a mensagem de erro em caso de sucesso
    try {
        const response = await login(userCredentials);
        console.log(response);
    } catch (error) {
        errorMessage.value = 'Login ou senha incorretos. Tente novamente.'; // Define a mensagem de erro
    }
}

</script>