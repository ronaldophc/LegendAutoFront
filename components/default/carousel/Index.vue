<script setup lang="ts">
import banner1 from 'assets/images/banner1.jpg';
import banner2 from 'assets/images/banner2.jpg';
const banners = [
    banner1,
    banner2,
]

const carouselRef = ref()

onMounted(() => {
  setInterval(() => {
    if (!carouselRef.value) return

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0)
    }

    carouselRef.value.next()
  }, 3000)
})
</script>

<template>
  <UCarousel ref="carouselRef" v-slot="{ item }" :items="banners" :ui="{ item: 'basis-full' }" class="w-full max-h-[60vh] overflow-hidden">
    <div class="w-full object-cover overflow-hidden">
      <img :src="item" alt="" class="w-full" draggable="false">
    </div>
  </UCarousel>
</template>