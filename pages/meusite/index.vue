<script setup lang="ts">
import LoginForm from '~/components/admin/LoginForm.vue';
definePageMeta({
    sanctum: {
        excluded: true,
        guestOnly: true
    }
});


</script>

<template>
  <div class="flex h-screen">
    <div class="flex-1 flex items-center py-8 px-5">
      <LoginForm />
    </div>
    <div class="hidden lg-custom:flex flex-1 items-center justify-end">
      <img class="rounded-lg me-5 h-screen max-h-[95vh]" src="../../assets/images/login.png" alt="login">
    </div>
  </div>
</template>
