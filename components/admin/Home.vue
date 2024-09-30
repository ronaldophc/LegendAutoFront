<script setup lang="ts">

</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <main class="container mx-auto py-8">
      <div class="flex">
        <!-- Sidebar de Filtros -->
        <aside class="w-1/4 bg-white p-4 shadow rounded-lg">
          <h2 class="text-xl font-bold mb-4">Filtros</h2>
          <button class="text-blue-500 mb-2">Limpar filtros</button>

          <div class="mb-4">
            <h3 class="font-semibold mb-2">Tipo de veículo</h3>
            <div class="flex space-x-2">
              <button class="bg-blue-500 text-white px-4 py-2 rounded">CARRO</button>
              <button class="bg-gray-200 px-4 py-2 rounded">MOTO</button>
              <button class="bg-gray-200 px-4 py-2 rounded">UTILITÁRIO</button>
            </div>
          </div>

          <div class="mb-4">
            <h3 class="font-semibold mb-2">Marca</h3>
            <input type="text" placeholder="Pesquisar marca" class="w-full p-2 border rounded mb-4">
            <!-- Listagem de Marcas (exemplo simplificado) -->
            <div class="grid grid-cols-2 gap-2">
              <div class="bg-gray-200 p-2 rounded text-center">Audi</div>
              <div class="bg-gray-200 p-2 rounded text-center">BMW</div>
              <!-- Adicionar mais marcas -->
            </div>
            <a href="#" class="text-blue-500">Ver todas as marcas</a>
          </div>
        </aside>

        <!-- Conteúdo Principal -->
        <section class="w-3/4 p-4">
          <div class="flex items-center justify-between mb-4">
            <input type="text" placeholder="Pesquisar veículo" class="p-2 border rounded w-2/3">
            <select class="p-2 border rounded">
              <option>Mais recente</option>
              <!-- Adicionar mais opções de ordenação -->
            </select>
          </div>

          <!-- Cartão de Veículo -->
          <div class="grid grid-cols-1 gap-4">
            <!-- Repetir este bloco para cada veículo -->
            <div class="bg-white p-4 shadow rounded-lg flex items-center justify-between">
              <div class="flex items-center">
                <img src="https://via.placeholder.com/150" alt="Imagem do Veículo" class="w-24 h-24 mr-4 rounded-lg">
                <div>
                  <h3 class="text-lg font-bold">Nome do Veículo</h3>
                  <p class="text-sm text-gray-600">Ano: 2019-2020 | 10,000 KM | Câmbio Automático</p>
                </div>
              </div>
              <div>
                <span class="text-xl font-bold">R$ 1.000.000</span>
                <button class="bg-blue-500 text-white px-4 py-2 ml-4 rounded">Editar</button>
                <button class="text-red-500 ml-2">Excluir</button>
              </div>
            </div>
            <!-- Fim do bloco de veículo -->
          </div>

          <!-- Paginação -->
          <div class="mt-6 flex justify-center">
            <button class="p-2 border rounded mx-1">1</button>
            <button class="p-2 border rounded mx-1">2</button>
            <button class="p-2 border rounded mx-1">3</button>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<style scoped>

</style>