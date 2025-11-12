<script setup lang="ts">
import { ColorPicker } from '@moraleja39/vue-colorjs-picker'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import { ref } from 'vue'

const color = ref('oklch(0.5 0.2 35)')
</script>

<template>
  <ColorPicker v-model="color">
    <template #space-select="{ options, value, onUpdate }">
      <Select class="w-full" :options="options.slice()" :model-value="value" @update:model-value="onUpdate" />
    </template>
    <template #slider-input="{ min, max, step, value, onUpdate }">
      <div class="w-24">
        <InputNumber :min :max :step :model-value="value" size="small" fluid show-buttons button-layout="stacked" @update:model-value="onUpdate" />
      </div>
    </template>
    <template #text-input="{ value, onUpdate }">
      <InputText class="text-xs!" size="small" fluid :model-value="value" @update:model-value="onUpdate($event ?? '')" />
    </template>
  </ColorPicker>
</template>
