<script setup lang="ts">

definePageMeta({
    sanctum: {
        excluded: true,
        guestOnly: true
    }
});

import type { FormError, FormSubmitEvent } from '#ui/types'

const state = reactive({
  email: undefined,
  password: undefined
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Obrigatório' })
  if (!state.password) errors.push({ path: 'password', message: 'Obrigatório' })
  return errors
}

async function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data)
}
</script>

<template>

  <div class="flex h-screen">
    <div class="flex-1 flex items-center py-8 px-5">

      <UForm :validate="validate" :state="state" class="space-y-4 mx-auto flex w-full max-w-sm flex-col"
        @submit="onSubmit">
        <div class="mx-auto mb-5 flex">
          <Logo />
        </div>

        <h1 class="mt-8 text-2xl font-semibold text-gray-700 lg:mt-0">
          <UDivider label="Bem vindo" size="lg" :ui="{ label: 'text-blue-700 text-3xl' }" />
        </h1>

        <p class="m-2 text-xl text-gray-400 text-center">
          Preencha com seus dados para prosseguir
        </p>

        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" class="mt-1.5" />
        </UFormGroup>

        <UButton type="submit"
          class="mt-5 rounded border bg-blue-500 py-2 px-5 text-lg font-semibold text-gray-50 shadow hover:bg-blue-500">
          Entrar
        </UButton>
      </UForm>
    </div>
    <div class="hidden lg-custom:flex flex-1 items-center justify-end">
      <img class="rounded-lg me-5 h-screen max-h-[95vh]" src="../../assets/images/login.png" alt="login">
    </div>
  </div>
</template>