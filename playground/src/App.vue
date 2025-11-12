<script setup lang="ts">
import { ColorPicker } from 'vue-colorjs-picker'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import { ref } from 'vue'

import CodeBlock from '@/components/CodeBlock.vue'
import PopoverPicker from '@/components/PopoverPicker.vue'
import pickerExample from './assets/examples/PopoverPicker.html?raw'
import primevueExample from './assets/examples/PrimevueControls.html?raw'
import simpleExample from './assets/examples/Simple.html?raw'
import PrimevuePicker from "@/components/PrimevuePicker.vue"

const color = ref('oklch(0.430 0.148 343.0)')
const color2 = ref('oklch(0.5 0.2 35)')
const color3 = ref('oklch(0.632 0.185 275.0)')
</script>

<template>
  <main class="min-h-lvh w-full grid grid-cols-1 lg:grid-cols-[max-content_1fr] lg:grid-rows-[max-content_max-content_1fr] gap-6 xl:gap-18 p-4 md:p-6">
    <h1 class="text-3xl font-semibold lg:col-span-2">
      Vue <a href="https://colorjs.io" target="_blank">colorjs.io</a> picker
    </h1>
    <div>
      <h3 class="text-xl mb-3">
        Default
      </h3>
      <ColorPicker v-model="color" class="w-full lg:w-120 rounded-sm border border-border" />
      <div class="mt-2">
        Picked color: {{ color }}
      </div>
    </div>
    <div class="example">
      <CodeBlock :code="simpleExample" />
    </div>
    <div>
      <h3 class="text-xl mb-3">
        With custom controls
      </h3>
      <PrimevuePicker v-model="color2" class="w-full lg:w-120" />
      <div class="mt-2">
        Picked color: {{ color2 }}
      </div>
    </div>
    <div class="example">
      <CodeBlock :code="primevueExample" />
    </div>

    <div>
      <h3 class="text-xl mb-3">
        Popover picker
      </h3>
      <PopoverPicker v-model="color3" />
    </div>
    <div class="example">
      <CodeBlock :code="pickerExample" />
    </div>
  </main>
</template>
