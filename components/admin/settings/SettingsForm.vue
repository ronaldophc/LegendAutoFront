<script lang="ts" setup>

</script>

<template>
    <div class="admin-settings_form mx-auto flex w-full max-w-sm flex-col">
        <div class="mx-auto my-10 flex font-semibold text-2xl">
            Alterar informações
        </div>
        <div class="flex flex-col gap-4">
            <div class="relative">
                <input type="text" 
                class="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border appearance-none focus:outline-none focus:ring-0 peer" 
                id="address" 
                placeholder="Avenida Manoel Ribas - 554" />
                <label for="address" class="admin-settings_label hover:cursor-text absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    Endereço
                </label>
            </div>

            <div class="relative">
                <input type="text" 
                class="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border appearance-none focus:outline-none focus:ring-0 peer placeholder-opacity-0 focus:placeholder-opacity-100" 
                id="phone_comercial" 
                placeholder="+55 (**) ****-****" />
                <label for="phone_comercial" class="admin-settings_label hover:cursor-text absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    Telefone Comercial
                </label>
            </div>

            <div class="relative">
                <input type="text" 
                class="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border appearance-none focus:outline-none focus:ring-0 peer placeholder-opacity-0 focus:placeholder-opacity-100" 
                id="phone_whats"
                placeholder="+55 (**) ****-****" />
                <label for="phone_whats" class="admin-settings_label hover:cursor-text absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    WhatsApp Atendimento
                </label>
            </div>

            <div class="relative">
                <input type="text" 
                class="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border appearance-none focus:outline-none focus:ring-0 peer placeholder-opacity-0 focus:placeholder-opacity-100" 
                id="email" 
                placeholder="exemplo@gmail.com" />
                <label for="email" class="admin-settings_label hover:cursor-text absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    Email Atendimento
                </label>
            </div>

            <div class="relative">
                <input type="text" 
                class="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border appearance-none focus:outline-none focus:ring-0 peer placeholder-opacity-0 focus:placeholder-opacity-100" 
                id="instagram" 
                placeholder="https://www.instagram.com/exemplo" />
                <label for="instagram" class="admin-settings_label hover:cursor-text absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    Instagram
                </label>
            </div>

            <div class="relative">
                <input type="text" 
                class="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border appearance-none focus:outline-none focus:ring-0 peer placeholder-opacity-0 focus:placeholder-opacity-100" 
                id="tiktok" 
                placeholder="https://www.tiktok.com/@exemplo" />
                <label for="tiktok" class="admin-settings_label hover:cursor-text absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    Tiktok
                </label>
            </div>

            <div class="relative">
                <input type="text" 
                class="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border appearance-none focus:outline-none focus:ring-0 peer placeholder-opacity-0 focus:placeholder-opacity-100" 
                id="facebook" 
                placeholder="https://www.facebook.com/exemplo" />
                <label for="facebook" class="admin-settings_label hover:cursor-text absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    Facebook
                </label>
            </div>

            <div class="relative">
                <input type="text" 
                class="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border appearance-none focus:outline-none focus:ring-0 peer placeholder-opacity-0 focus:placeholder-opacity-100" 
                id="maps_link" 
                placeholder="https://maps.app.goo.gl/KpcrmYkn4HaZYNkm9" />
                <label for="maps_link" class="admin-settings_label hover:cursor-text absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    Google Maps link
                </label>
            </div>

            <button
                class="admin-settings_button mt-5 rounded border py-2 px-5 text-lg font-semibold shadow">
                Salvar
            </button>
        </div>

    </div>
</template>