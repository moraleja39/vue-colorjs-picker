<script setup lang="ts">
import { ColorPicker } from '@moraleja39/vue-colorjs-picker'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import { ref } from 'vue'

const color = ref('oklch(0.430 0.148 343.0)')
const color2 = ref('oklch(0.5 0.2 35)')
// const color3 = ref('oklch(0.632 0.185 275.0)')
</script>

<template>
  <main class="min-h-lvh grid grid-cols-[max-content_1fr] grid-rows-[max-content_max-content_1fr] gap-18 p-6">
    <h1 class="text-3xl font-semibold col-span-2">
      Vue <a href="https://colorjs.io" target="_blank">colorjs.io</a> picker
    </h1>
    <div>
      <h3 class="text-xl mb-3">
        Default
      </h3>
      <ColorPicker v-model="color" class="w-120 rounded-sm border border-border" />
      <div class="mt-2">
        Picked color: {{ color }}
      </div>
    </div>
    <div class="example" />
    <div class="">
      <h3 class="text-xl mb-3">
        With custom controls
      </h3>
      <ColorPicker v-model="color2" class="w-120 rounded-sm border border-border">
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
      <div class="mt-2">
        Picked color: {{ color2 }}
      </div>
    </div>
  </main>
</template>
