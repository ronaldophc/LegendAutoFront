<script setup lang="ts">
import Vehicle from "~/components/admin/create/Vehicle.vue";

const config = useRuntimeConfig().public;

const props = defineProps({
  vehicle: Vehicle
});
const snackbar = useSnackbar();
const router = useRouter();
const files = ref<(File | string)[]>([]);
const isDraggingOver = ref(false);
const previewImages = ref<File[]>([]);

// Funções para estilizar
function handleDragOver(event: DragEvent) {
  event.preventDefault();
  isDraggingOver.value = true;
}

function handleDragLeave() {
  isDraggingOver.value = false;
}

// Função para carregar imagens ao carregar a pagina
onMounted(() => {
  setTimeout(async () => {
    await getImages();
  }, 50);
});

// Funcao para pegar as imagens do veiculo via API
async function getImages() {
  const {id} = props.vehicle;
  const response = await useApi(`api/vehicles/${id}/images`);
  let data = response.data.value.data;
  previewImages.value = [];

  data.forEach(image => {
    previewImages.value.push(image);
  });
}

// Função para selecionar a imagem como capa
function handleCoverSelection(image: File) {
  previewImages.value.forEach(file => {
    const { id } = image;

    if(file === image) {
      const is_cover = !file["is_cover"];
      file["is_cover"] = is_cover;

      useApi(`api/vehicles/images/${id}`,
          {
            method: 'PUT',
            body: { is_cover: is_cover }
          });
      return;
    }

    if (file["is_cover"]) {
      const { id } = file;

      useApi(`api/vehicles/images/${id}`, {
        method: 'PUT',
        body: { is_cover: false }
      });

      file["is_cover"] = false;
    }

  });
}

// Adicionar as novas imagens que foram soltas no campo de imagens e adicionar nas arrays
function processFiles(newFiles: File[]) {
  newFiles.forEach(file => {
    if (file.type.startsWith('image/')) {
      files.value.push(file);
    }
  });
}

// Ao soltar uma imagem no campo, chama a função de processar os arquivos
function handleDrop(event: DragEvent) {
  event.preventDefault();
  isDraggingOver.value = false;
  handleSubmit(event);
}

// Ao selecionar imagens no campo, chama a função de processar os arquivos
function handleFileChange(event: Event) {
  handleSubmit(event);
}

// Subir as imagens para a API, esvaziar a array de imagens e chamar a função de pegar as imagens
async function handleSubmit(event: Event) {
  processFiles(Array.from((event.target as HTMLInputElement).files || []));
  const {id} = props.vehicle;
  const vehicleId: number = id;
  for (const file of files.value) {
    const {is_cover} = file;
    await uploadImage(file, is_cover, vehicleId);
  }
  files.value = [];
  await getImages();
}

// Subir uma imagem via API
async function uploadImage(file: File, isCover: boolean, vehicleId: number) {
  let formData = new FormData();
  formData.append('image', file);
  formData.append('is_cover', isCover);
  formData.append('vehicle_id', vehicleId);
  const response = await useImageApi(formData as FormData);

  if (response.status.value === 'success') {
    snackbar.add({
      type: 'success',
      text: 'Imagem adicionada com sucesso',
    });
    return;
  }

  snackbar.add({
    type: 'error',
    text: 'Erro ao adicionar imagem',
  });
}

// Remover a imagem das arrays e do banco
function removeImage(image: File) {
  const index = previewImages.value.indexOf(image);
  previewImages.value.splice(index, 1);
  const {id} = image;
  deleteImage(id);
}

// Requisição para deletar a imagem via API
async function deleteImage(imageId: number) {
  await useApi(`api/vehicles/images/${imageId}`, {method: 'DELETE'});
}

// Funcao para pegar a Url completa da imagem
function getImageUrl(image: File) {
  const {image_url} = image;
  return config.apiBase + image_url;
}

function isImageCover(image: File) {
  const { is_cover } = image;
  return is_cover;
}

</script>

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
    </UCard>

    <div class="flex flex-nowrap overflow-x-auto w-full gap-2">
      <!--      {{ previewImages }}-->
      <div v-for="(image, index) in previewImages" :key="index" class="mb-1">
        <UCard class="flex flex-col" :ui="{body: {padding: 'px-2 py-3 sm:p-3'}}">
          <img :src="getImageUrl(image)" alt="Preview" class="object-contain h-40"/>

          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <input type="checkbox" :checked="isImageCover(image) == 1" @change="handleCoverSelection(image)"/>
              <label class="ml-2 text-xl">Capa</label>
            </div>
            <UIcon name="i-material-symbols:delete-outline" class="text-red-500 cursor-pointer"
                   @click="removeImage(image)"/>
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