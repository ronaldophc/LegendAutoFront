<script setup lang="ts">
import Vehicle from "~/components/admin/create/Vehicle.vue";
import car_default from '~/assets/images/default_car.png';

const props = defineProps({
  vehicle: Vehicle
});


const router = useRouter();
// const files = ref([]);
const files = ref<(File | string)[]>([]);
const isDraggingOver = ref(false);
const previewImages = ref<string[]>([]);
const coverImageIndex = ref<number | null>(null);
const DESTINATION_ROUTE = '/meusite';

onMounted(() => {
  setTimeout(async () => {
    const response = await useApi(`api/vehicles/${props.vehicle.id}/images`);
    let data = response.data.value.data;
    data.forEach(image => {
      previewImages.value.push(image.image_url);
      files.value.push(image.image_url); // Store the URL for existing images
      console.log(previewImages)
    });
  }, 50);
});


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

function processFiles(newFiles: File[]) {
  newFiles.forEach(file => {
    if (file.type.startsWith('image/')) {
      files.value.push(file);
      previewImages.value.push(URL.createObjectURL(file));
    }
  });
}

function removeImage(index: number) {
  files.value.splice(index, 1);
  previewImages.value.splice(index, 1);
  if (coverImageIndex.value === index) {
    coverImageIndex.value = null;
  } else if (coverImageIndex.value && coverImageIndex.value > index) {
    coverImageIndex.value--;
  }
}

async function handleSubmit() {
  const vehicleId = props.vehicle.id;
  for (const file of files.value) {
    if (typeof file === 'string') {
      // Skip existing images
      continue;
    }
    await uploadImage(file, coverImageIndex.value === files.value.indexOf(file), vehicleId);
  }
  await router.push(DESTINATION_ROUTE);
}

async function uploadImage(file: File, isCover: boolean, vehicleId: number) {
  let formData = new FormData();
  formData.append('image', file);
  formData.append('is_cover', isCover.toString());
  formData.append('vehicle_id', vehicleId.toString());
  await useImageApi(formData);
}
</script>

// Apagou a imagem, apaga do banco e faz a requisição de novo
// Carregou imagem, upa no banco e faz a requisição de novo
// Mudou a capa, ja altera no banco tambem

<template>
  <div
      class="admin-create_images shadow-lg rounded-lg pb-2 text-2xl flex flex-col justify-center items-center w-full px-5 my-2">

    <UCard class="my-2" :ui="{ header: { padding: 'py-1'}}">
      <template #header>
        <div class="flex flex-col items-center justify-center">
          <h2 class="font-bold text-xl text-center">Carregar imagens</h2>
          <span class="text-lg text-center">Carregue as imagens do veículo e defina a capa.</span>
        </div>
      </template>

      <div class="flex items-center justify-center w-full">
        <label for="dropzone-file"
               class="admin-create_label w-full py-2 rounded-lg cursor-pointer"
               :class="{ 'dragging': isDraggingOver }" @dragover="handleDragOver" @dragleave="handleDragLeave"
               @drop="handleDrop">
          <div class="flex flex-col items-center justify-center">
            <UIcon name="i-ic:outline-cloud-upload" class="text-5xl text-gray-500"/>

            <p class="text-sm text-gray-500">
                <span class="font-semibold">
                  Clique para carregar
                </span>
              ou arraste e solte a imagem
            </p>

            <p class="text-sm text-gray-500">PNG, JPG ou WEBP</p>
          </div>
          <input id="dropzone-file" type="file" class="hidden" multiple @change="handleFileChange"/>
        </label>
      </div>

      <button @click="handleSubmit" class="button text-2xl p-1 mt-3 rounded-lg">Enviar imagens</button>
    </UCard>

    <div class="flex flex-nowrap overflow-x-auto w-full gap-2">
      <!--      {{ previewImages }}-->
      <div v-for="(preview, index) in previewImages" :key="index" class="mb-1">
        <UCard class="flex flex-col" :ui="{body: {padding: 'px-2 py-3 sm:p-3'}}">
          <img :src="'http://localhost:8001/' + preview" alt="Preview" class="object-contain w-40 h-40"/>

          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <input type="checkbox" :checked="coverImageIndex === index" @change="handleCoverSelection(index)"/>
              <label class="ml-2 text-xl">Capa</label>
            </div>
            <UIcon name="i-material-symbols:delete-outline" class="text-red-500 cursor-pointer"
                   @click="previewImages.splice(index, 1)"/>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dragging {
  border-color: #3b82f6;
}
</style>