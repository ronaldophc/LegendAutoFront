<script setup lang="ts">
import {useCurrencyInput} from "vue-currency-input";

const props = defineProps<{
  field: string,
  value: string | number | boolean,
  errors: string,
  fieldName: string
}>();

const emit = defineEmits(['update-value']);

const updateParent = (event: Event) => {
  emit('update-value', (event.target as HTMLInputElement).value);
};

function getType(field: string) {
  return field === 'price' ? 'text' : 'text';
}

const { inputRef } = useCurrencyInput({ currency: 'BRL' });

</script>

<template>
  <div :class="fieldName + ' flex flex-col'">
    <label for="field" class="mb-1 font-semibold text-sm">{{ field }}</label>
    <input v-if="fieldName === 'price'"
           ref="inputRef"
           :id="fieldName"
           :value="value"
           class="px-1.5 pb-1.5 pt-2 w-full text-md rounded-lg border focus:outline-none"
           @input="updateParent"/>
    <input v-else
           :type="getType(fieldName)"
           :id="fieldName"
           :value="value"
           class="px-1.5 pb-1.5 pt-2 w-full text-md rounded-lg border focus:outline-none"
           @input="updateParent"/>
    <span v-if="errors" class="text-sm text-red-500">{{ errors[0] }}</span>
  </div>
</template>