<script setup lang="ts">
import minibanner2 from 'assets/images/mini-banner2.png';
import minibanner from 'assets/images/mini-banner.png';

function redirect() {
  window.location.href = '#';
}
</script>

<template>
  <div class="flex md:justify-center mx-5 my-5 gap-5 overflow-x-auto whitespace-nowrap">
    <img @click="redirect" class="cursor-pointer" :src="minibanner2" alt="Mini Banner" style="width: 400px"/>
    <img @click="redirect" class="cursor-pointer" :src="minibanner" alt="Mini Banner" style="width: 400px"/>
  </div>
</template>