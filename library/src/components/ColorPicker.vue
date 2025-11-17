<script setup lang="ts">
import { syncRef } from '@vueuse/core'
import Color from 'colorjs.io'
import { computed, shallowRef, watch } from 'vue'
import ColorChannelSlider from './ColorChannelSlider.vue'
import ColorSwatch from './ColorSwatch.vue'

export interface ColorPickerProps {
  showGamut?: boolean
}

withDefaults(defineProps<ColorPickerProps>(), {
  showGamut: true,
})

const supportedSpaces = ['OKLCH', 'sRGB', 'HSL'] as const
type SupportedSpaces = (typeof supportedSpaces)[number]

const spaceId = defineModel<SupportedSpaces>('space', { default: 'OKLCH' })
const space = computed(() => Color.Space.get(spaceId.value))

const model = defineModel<string>({ required: true })
const color = shallowRef<Color>(new Color(model.value).to(space.value))

syncRef(model, color, {
  direction: 'both',
  transform: {
    ltr: (str) => {
      try {
        const color = new Color(str)
        return color.to(space.value)
      }
      catch (e) {
        console.error(e)
        return color.value
      }
    },
    rtl: color => color.toString(),
  },
  immediate: true,
  flush: 'pre',
})

const swatchGridRowEnd = computed(() => Object.entries(space.value.coords).length + 2)

watch(space, (newSpace) => {
  color.value = color.value.to(newSpace)
})

function channelValueUpdated(channel: string, value: number) {
  color.value = color.value.clone().set(channel, value)
}
</script>

<template>
  <div :class="$style['color-picker']">
    <div :class="$style['color-picker__select_container']">
      <slot name="space-select" :value="spaceId" :options="supportedSpaces" :on-update="(v: SupportedSpaces) => spaceId = v">
        <select v-model="spaceId" :class="$style['color-picker__select']">
          <option v-for="supportedSpace in supportedSpaces" :key="supportedSpace" :value="supportedSpace">
            {{ supportedSpace }}
          </option>
        </select>
      </slot>
    </div>

    <ColorChannelSlider
      v-for="(_, channel) of space.coords"
      :key="channel"
      :class="$style['color-picker__slider']"
      :space="space"
      :channel="channel"
      :color="color"
      @update:model-value="channelValueUpdated(channel, $event!)"
    >
      <template #label="slotProps">
        <slot name="slider-label" v-bind="slotProps" />
      </template>
      <template #input="slotProps">
        <slot name="slider-input" v-bind="slotProps" />
      </template>
    </ColorChannelSlider>

    <div :class="$style['color-picker__swatch']" :style="{ gridRowEnd: swatchGridRowEnd }">
      <ColorSwatch :color="color" :show-gamut="showGamut" />
      <div>
        <slot name="text-input" :value="model" :on-update="(v: string) => model = v">
          <input v-model="model" :class="$style['color-picker__text-input']" type="text">
        </slot>
      </div>
    </div>
  </div>
</template>

<style module>
.color-picker {
  min-width: 18rem;
  padding: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 128px;
  grid-auto-rows: auto;
  gap: 0.5rem;
}

.color-picker__select_container {
  grid-column: 1 / -1;
}

.color-picker__select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  background: oklch(0.2 0 0);
}

.color-picker__slider {
  grid-column: 1;
}

.color-picker__swatch {
  grid-column: 2;
  grid-row: 2;
  display: grid;
  grid-template-rows: 1fr min-content;
  gap: 0.25rem;
}

.color-picker__text-input {
  width: 100%;
  padding: 0.25rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}
</style>
