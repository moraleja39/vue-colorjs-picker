<script setup lang="ts">
import type Color from 'colorjs.io'
import { computed, ref, watch } from 'vue'

export interface ColorSwatchProps {
  color: Color
  showGamut?: boolean
}

const props = withDefaults(defineProps<ColorSwatchProps>(), {
  showGamut: true,
})

const displayColor = computed(() => props.color.toString())

const gamutsToTest = ['srgb', 'p3', 'rec2020', 'prophoto'] as const
const gamutColorNames = {
  srgb: 'sRGB',
  p3: 'P3',
  rec2020: 'Rec.2020',
  prophoto: 'ProPhoto',
  none: 'None',
}
type Gamut = keyof typeof gamutColorNames | 'none'
const gamutBackgroundColors: Record<Gamut, string> = {
  srgb: 'oklch(0.843 0.107 145.0)',
  p3: 'oklch(0.894 0.110 75.0)',
  rec2020: 'oklch(0.591 0.192 25.0)',
  prophoto: 'oklch(0.591 0.192 25.0)',
  none: 'oklch(0.435 0.151 25.0)',
}
const currentGamut = ref<Gamut>('none')
watch(() => props.color, (color) => {
  for (const gamut of gamutsToTest) {
    if (color.inGamut(gamut)) {
      currentGamut.value = gamut
      return
    }
  }
  currentGamut.value = 'none'
}, { immediate: true })
</script>

<template>
  <div class="color-swatch" :style="{ backgroundColor: displayColor }">
    <div v-if="showGamut" class="color-swatch__gamut" :style="{ backgroundColor: gamutBackgroundColors[currentGamut] }">
      {{ gamutColorNames[currentGamut] }}
    </div>
  </div>
</template>

<style scoped>
.color-swatch {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 0.25rem;
  position: relative;
}

.color-swatch__gamut {
  font-size: 0.75rem;
  padding: 0.125rem 0.25rem;
  border: 1px solid black;
  position: absolute;
  bottom: 0.25rem;
  right: 0.25rem;
  border-radius: 0.125rem;
}
</style>
