<script setup lang="ts">
import { ColorPicker } from '@moraleja39/vue-colorjs-picker'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import { ref } from 'vue'

const color = ref('oklch(43% 0.148 343.0)')
const color2 = ref('oklch(43% 0.1 127)')
</script>

<template>
  <main>
    <h1>Vue colorjs.io picker</h1>
    <div class="">
      <h3>Default</h3>
      <ColorPicker v-model="color" class="w-120 rounded-sm border" />
    </div>
    <div class="">
      <h3>With custom controls</h3>
      <ColorPicker v-model="color2" class="w-120 rounded-sm border">
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
    </div>
  </main>
</template>

