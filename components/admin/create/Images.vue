<script setup lang="ts">
const registerStore = useRegisterStore(); // Renamed for better understanding
const router = useRouter();
const files = ref([]); // Renamed for better understanding
const isDraggingOver = ref(false); // Renamed for better understanding
const previewImages = ref<string[]>([]);
const coverImageIndex = ref<number | null>(null);
const DESTINATION_ROUTE = '/meusite'; // Extracted constant

function handleCoverSelection(index: number) {
  coverImageIndex.value = coverImageIndex.value === index ? null : index;
}

function handleDragOver(event: DragEvent) {
  event.preventDefault();
  isDraggingOver.value = true;
}

function handleDragLeave() {
  isDraggingOver.value = false;
}

function handleDrop(event: DragEvent) {
  event.preventDefault();
  isDraggingOver.value = false;
  processFiles(Array.from(event.dataTransfer?.files || []));
}

function handleFileChange(event: Event) {
  processFiles(Array.from((event.target as HTMLInputElement).files || []));
}

function processFiles(newFiles: File[]) { // Extracted Function
  newFiles.forEach(file => {
    if (file.type.startsWith('image/')) {
      files.value.push(file);
      previewImages.value.push(URL.createObjectURL(file));
    }
  });
}

async function handleSubmit() {
  const vehicleId = registerStore.vehicleId; // Use registerStore for better understanding
  for (const file of files.value) {
    await uploadImage(file, coverImageIndex.value === files.value.indexOf(file), vehicleId);
  }
  await router.push(DESTINATION_ROUTE);
}

async function uploadImage(file: File, isCover: boolean, vehicleId: number) { // Extracted Function
  let formData = new FormData();
  formData.append('image', file);
  formData.append('is_cover', isCover.toString());
  formData.append('vehicle_id', vehicleId.toString());
  await useImageApi(formData);
}
</script>

<template>
  <div
    class="admin-create_images shadow-lg pb-5 text-3xl flex flex-col md:flex-row justify-center items-center w-full px-5">

    <div class="flex flex-1 md:w-1/2 mt-3 justify-center items-center">
      <UCard>
        <template #header>
          <div class="flex flex-col items-center justify-center">
            <h2 class="font-bold text-2xl mb-2 text-center">Carregar imagens</h2>
            <span class="text-xl text-center">Carregue as imagens do veículo e defina a capa.</span>
          </div>
        </template>

        <div class="flex items-center justify-center w-full">
          <label for="dropzone-file"
            class="admin-create_label flex flex-col items-center justify-center w-full h-64 rounded-lg cursor-pointer"
            :class="{ 'dragging': isDraggingOver }" @dragover="handleDragOver" @dragleave="handleDragLeave"
            @drop="handleDrop">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <UIcon name="i-ic:outline-cloud-upload" class="text-5xl text-gray-500" />

              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                <span class="font-semibold">
                  Clique para carregar
                </span>
                ou arraste e solte a imagem
              </p>

              <p class="text-xs text-gray-500 dark:text-gray-400">PNG, JPG ou WEBP</p>
            </div>
            <input id="dropzone-file" type="file" class="hidden" multiple @change="handleFileChange" />
          </label>
        </div>

        <template #footer>
          <button @click="handleSubmit" class="admin-create_button p-2 rounded-lg">Enviar imagens</button>
        </template>
      </UCard>
    </div>

    <div class="flex flex-1 md:w-1/2 mt-2 ms-2 md:mt-0">
      <div class="max-h-[28rem] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <!-- <UIcon v-if="preview" class="w-20 h-20" name="i-material-symbols:image-outline"></UIcon> -->
        <div v-for="(preview, index) in previewImages" :key="index" class="">
          <UCard class="flex flex-col">
            <img :src="preview" alt="Preview" class="object-contain h-40 w-full" />

            <template #footer>
              <div class="flex justify-between items-center">
                <div class="flex items-center">
                  <input type="checkbox" :checked="coverImageIndex === index" @change="handleCoverSelection(index)" />
                  <label class="ml-2 text-xl">Capa</label>
                </div>
                <UIcon name="i-material-symbols:delete-outline" class="text-red-500 cursor-pointer"
                  @click="previewImages.splice(index, 1)" />
              </div>
            </template>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dragging {
  border-color: #3b82f6;
}
</style>