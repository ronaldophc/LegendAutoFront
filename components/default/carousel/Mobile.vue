<script setup lang="ts">
import banner1 from 'assets/images/banner-mobile-1.jpg';
import banner2 from 'assets/images/banner-mobile2.jpeg';

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
  <UCarousel
      ref="carouselRef"
      v-slot="{ item }"
      :items="banners"
      :ui="{
            item: 'basis-full'
        }"
      class="overflow-hidden w-full lg:h-[90vh] md:h-[55vh] sm:h-[40vh]"
      indicators
  >
    <div class="w-full h-full object-cover overflow-hidden">
      <img :src="item" alt="" class="w-full h-full hero-animate" draggable="false">
    </div>
  </UCarousel>

</template>