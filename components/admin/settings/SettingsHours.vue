<script lang="ts" setup>
const selected = ref(false)

const monday = ref({
    active: false,
    firstHour: '',
    lastHour: ''
})
</script>

<template>
    <UCard>
        <template #header>
            <div class="flex flex-col items-center justify-center">
                <UIcon name="i-heroicons-solid:calendar" class="w-28 h-28 bg-blue-500" />
                <h2 class="font-bold text-3xl mb-2">Horário de atendimento</h2>
                <span class="text-gray-500">Defina o horário de atendimento do seu estabelecimento.</span>
                <span class="text-gray-500">Marque a checkbox com os dias que a loja
                    ficara aberta de defina os horários ao lado.</span>
                <div class="flex flex-row gap-2 mt-3">
                    <span>Um hórario</span>
                    <UToggle v-model="selected" />
                    <span>Dois horários</span>
                </div>
            </div>
        </template>

        <div id="monday">
            <UCheckbox v-model="monday.active" id="monday.check-box" label="Segunda Feira" />
        </div>

    </UCard>
</template>