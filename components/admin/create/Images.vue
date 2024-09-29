<script setup lang="ts">
import {ref} from 'vue';
import {useApi} from '~/composables/useApi';
import {useRegisterStore} from '~/stores/register';

const register = useRegisterStore();

const images = ref<File[]>([]);
const isDragging = ref(false);
const previewImages = ref<string[]>([]);

function handleDragOver(event: DragEvent) {
  event.preventDefault();
  isDragging.value = true;
}

function handleDragLeave() {
  isDragging.value = false;
}

function handleDrop(event: DragEvent) {
  event.preventDefault();
  isDragging.value = false;

  const files = Array.from(event.dataTransfer?.files || []);
  insertImages(files);
}

function handleFileChange(event: Event) {
  const files = Array.from((event.target as HTMLInputElement).files || []);
  insertImages(files);
}

function insertImages(files: any[]) {
  files.forEach(file => {
    if (file.type.startsWith('image/')) {
      images.value.push(file);
      previewImages.value.push(URL.createObjectURL(file)); // Para exibir a imagem carregada
    }
  });
}

async function handleSubmit() {
  const formData = new FormData();
  images.value.forEach(image => {
    formData.append('images[]', image);
  });

  try {
    console.log(formData);
    const response = await useApi('api/vehicles/images', {
      method: 'POST',
      body: {
        formData,
        'vehicle_id': '1',
        'image_url': 'http://localhost:3000/storage/vehicles/1/',
      },
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
      }
    });
    console.log(response);
  } catch (error) {
    console.error('Erro no upload:', error);
  }
}
</script>

<template>
  <div class="admin-create_images pb-10 text-3xl flex flex-row justify-center items-center w-full px-5">
    <div class="flex flex-1 w-1/2">
      <div class="flex flex-wrap mt-5">
        <div v-for="(preview, index) in previewImages" :key="index" class="m-2">
          <img :src="preview" alt="Preview" class="w-32 h-32 object-cover rounded-lg"/>
        </div>
      </div>
    </div>

    <div class="flex flex-1 w-1/2">
      <div>
        <UCard>
          <template #header>
            <div class="flex flex-col items-center justify-center">
              <h2 class="font-bold text-2xl mb-2">Carregar imagens</h2>
              <span class="text-gray-500 text-md text-center">Carregue as imagens do veículo e defina a capa.</span>
            </div>
          </template>

          <div class="flex items-center justify-center w-full">
            <label for="dropzone-file"
                   class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                   :class="{ 'border-blue-500': isDragging }"
                   @dragover="handleDragOver"
                   @dragleave="handleDragLeave"
                   @drop="handleDrop">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <UIcon name="i-ic:outline-cloud-upload" class="text-5xl text-gray-500"/>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                    class="font-semibold">Clique para carregar</span>
                  ou arraste e solte a imagem</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">PNG, JPG ou WEBP</p>
              </div>
              <input id="dropzone-file" type="file" class="hidden" multiple @change="handleFileChange"/>
            </label>
          </div>

          <template #footer>
            <button @click="handleSubmit" class="bg-blue-500 text-white p-2 rounded-lg">Enviar imagens</button>
          </template>
        </UCard>
      </div>
    </div>
  </div>
</template>