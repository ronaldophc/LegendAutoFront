<script setup lang="ts">
import {Ref, ref} from 'vue';

const {login} = useSanctumAuth();

const formEmail: Ref<string> = ref('');
const formPassword: Ref<string> = ref('');
const errorMessage: Ref<string> = ref('');
import logoSrc from '~/assets/images/logo.png';

function getUserCredentials(email: string, password: string): UserCredentials {
  return {email, password};
}

async function handleLogin() {
  const userCredentials = getUserCredentials(formEmail.value, formPassword.value);
  try {
    await login(userCredentials);
    errorMessage.value = '';
  } catch (error) {
    errorMessage.value = 'Login ou senha incorretos. Tente novamente.';
  }
}
</script>

<template>
  <!-- Logo -->
  <div class="logo-container mb-4">
    <img :src="logoSrc" alt="Logo"/>
  </div>
  <!-- Welcome Message -->
  <div class="welcome-message w-full mt-8 text-2xl font-semibold lg:mt-0">
    <div class="relative flex py-5 items-center">
      <hr class="admin-login_divider flex-grow border-t">
      <span class="admin-login_welcome flex-shrink mx-4 text-3xl">Bem-vindo</span>
      <hr class="admin-login_divider flex-grow border-t">
    </div>
  </div>
  <p class="instruction-text text-xl text-gray-400 text-center">
    Preencha com seus dados para prosseguir
  </p>
  <div v-if="errorMessage" class="error-message text-red-500 text-center mb-4">
    {{ errorMessage }}
  </div>
  <!-- Form -->
  <form class="admin-login_form w-full max-w-xs">
    <!-- Email Field -->
    <div class="field-container mb-4">
      <label class="label mb-2 block text-sm font-bold" for="email"> Email </label>
      <input
          class="input focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
          id="email" type="text" placeholder="Email" v-model="formEmail"/>
    </div>
    <!-- Password Field -->
    <div class="field-container mb-6">
      <label class="label mb-2 block text-sm font-bold" for="password"> Senha </label>
      <input
          class="input focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
          id="password" type="password" placeholder="******" v-model="formPassword"/>
    </div>
    <!-- Login Button -->
    <button
        class="login-button w-full focus:shadow-outline rounded px-4 py-2 font-bold focus:outline-none border"
        type="button"
        @click="handleLogin()">Entrar
    </button>
  </form>
</template>

