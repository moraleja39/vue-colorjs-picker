<script setup lang="ts">
import type { CSSProperties } from 'vue'
import Color from 'colorjs.io'
import Popover from 'primevue/popover'
import { computed, ref, useTemplateRef } from 'vue'
import { ColorPicker } from 'vue-colorjs-picker'

defineProps<{ name?: string }>()
const model = defineModel<string>({ required: true })
const popoverRef = useTemplateRef('popover')
const colorSpace = ref()
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
  <button :style="buttonStyle" @click="popoverRef?.toggle">
    {{ model }}
  </button>
  <Popover ref="popover">
    <ColorPicker v-model="model" v-model:space="colorSpace" />
  </Popover>
</template>
