<script setup lang="ts">

const props = defineProps<{
  field: String,
  value: string | number | boolean,
  errors: string,
  fieldName: String
}>();

const emit = defineEmits(['update-value']);

const updateParent = (event: Event) => {
  emit('update-value', (event.target as HTMLInputElement).value);
};

</script>

<template>
  <div :class="field + ' flex flex-col'">
    <label for="field" class="mb-1 font-semibold text-sm">{{field}}</label>
    <input type="text"
           :id="fieldName"
           :value="value"
           class="px-1.5 pb-1.5 pt-2 w-full text-md rounded-lg border focus:outline-none"
           @input="updateParent"/>
    <span v-if="errors" class="text-sm text-red-500">{{ errors[0] }}</span>
  </div>
</template>

<style scoped>

</style>