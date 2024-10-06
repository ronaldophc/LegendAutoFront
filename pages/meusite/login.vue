<script setup lang="ts">

definePageMeta({
  sanctum: {
    excluded: true,
    guestOnly: true
  }
});

</script>

<template>
  <div class="flex h-screen w-screen items-center justify-center">
    <!-- Container Principal -->
    <div class=" flex h-full w-full rounded-lg shadow-lg md:h-4/5 md:w-4/5 lg:w-3/4">
      <!-- Metade com o Formulário -->
      <div class="flex w-full flex-col items-center justify-center p-6 md:w-1/2">
        <AdminLoginForm />
      </div>
      <div class="admin-login_image hidden bg-cover bg-center md:flex md:w-1/2 shadow-lg rounded-e-lg">
        <img src="~/assets/images/laptop.svg" alt="">
      </div>
    </div>
  </div>
</template>
