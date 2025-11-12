<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { ColorPicker } from '@moraleja39/vue-colorjs-picker'
import Color from 'colorjs.io'
import Popover from 'primevue/popover'
import { computed, useTemplateRef } from 'vue'

defineProps<{ name?: string }>()
const model = defineModel<string>({ required: true })
const popoverRef = useTemplateRef('popover')
const textColorLight = new Color('oklch(0.955 0 0)')
const textColorDark = new Color('oklch(0.045 0 0)')

const buttonStyle = computed<CSSProperties>(() => {
  if (model.value == null)
    return {}
  const color = new Color(model.value)
  const lightTextContrast = color.contrast(textColorLight, 'Lstar')
  const darkTextContrast = color.contrast(textColorDark, 'Lstar')
  return {
    backgroundColor: color.toString({ format: 'oklch' }),
    color: lightTextContrast > darkTextContrast ? textColorLight.toString({ format: 'oklch' }) : textColorDark.toString({ format: 'oklch' }),
  }
})
</script>

<template>
  <button class="h-12 w-64 rounded-md cursor-pointer" :style="buttonStyle" @click="popoverRef?.toggle">
    {{ model }}
  </button>
  <Popover ref="popover">
    <ColorPicker v-model="model" class="w-full lg:w-120 rounded-sm border border-border" />
  </Popover>
</template>
