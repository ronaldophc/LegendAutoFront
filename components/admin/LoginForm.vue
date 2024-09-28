<script setup lang="ts">
import Logo from "../Logo.vue";

const { login, isAuthenticated } = useSanctumAuth();

const formEmail = ref('');
const formPassword = ref('');
const errorMessage = ref('');

async function onLogin() {
    const userCredentials = {
        email: formEmail.value,
        password: formPassword.value,
    };
    try {
        const response = await login(userCredentials);
        console.log(response);
        errorMessage.value = ''; // Limpa a mensagem de erro em caso de sucesso
    } catch (error) {
        errorMessage.value = 'Login ou senha incorretos. Tente novamente.'; // Define a mensagem de erro
    }
}

</script>

<template>
    <div class="admin-login_form mx-auto flex w-full max-w-sm flex-col">
        <div class="mx-auto mb-5 flex">
            <Logo />
        </div>

        <div class="mt-8 text-2xl font-semibold lg:mt-0">
            <div class="relative flex py-5 items-center">
                <hr class="flex-grow border-t"></hr>
                <span class="admin-login_welcome flex-shrink mx-4 text-3xl">Bem-vindo</span>
                <hr class="flex-grow border-t"></hr>
            </div>
        </div>

        <p class="m-2 text-xl text-gray-400 text-center">
            Preencha com seus dados para prosseguir
        </p>

        <div v-if="errorMessage" class="text-red-500 text-center mb-4">
            {{ errorMessage }}
        </div>

        <div class="flex flex-col gap-2">
            <div class="relative">
                <input v-model="formEmail" type="text" id="floating_filled_email"
                    class="w-full mt-1.5 rounded border border-gray-300 text-gray-500 placeholder-gray-500 pt-4 px-3 text-md focus:outline-none focus-visible:border focus-visible:border-gray-500 shadow peer"
                    placeholder=" " required />
                <label for="floating_filled_email"
                    class="absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Email</label>
            </div>

            <div class="relative">
                <input v-model="formPassword" type="password" id="floating_filled_password"
                    class="w-full mt-1.5 rounded border border-gray-300 text-gray-500 placeholder-gray-500 pt-4 px-3 text-md focus:outline-none focus-visible:border focus-visible:border-gray-500 shadow peer"
                    placeholder=" " required />
                <label for="floating_filled_password"
                    class="absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Senha</label>
            </div>
        </div>


        <button
            class="mt-5 rounded border bg-blue-500 py-2 px-5 text-lg font-semibold text-gray-50 shadow hover:bg-blue-500"
            @click="onLogin">
            Entrar
        </button>
    </div>
</template>
