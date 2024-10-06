<script setup lang="ts">
import { defineProps } from 'vue';
import { useCurrencyInput } from 'vue-currency-input';
import type { CurrencyInputOptions } from 'vue-currency-input';

const props = defineProps<{
  modelValue: number;
  options: CurrencyInputOptions;
}>();

const { inputRef } = useCurrencyInput(props.options);
</script>

<template>
  <input ref="inputRef" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
</template>