<script setup lang="ts">
import { syncRef } from '@vueuse/core'
import Color from 'colorjs.io'
import ColorChannelSlider from './ColorChannelSlider.vue'
import ColorSwatch from './ColorSwatch.vue'
import {computed, ref, shallowRef, watch} from "vue"

const supportedSpaces = ['OKLCH', 'sRGB', 'HSL'] as const
type SupportedSpaces = (typeof supportedSpaces)[number]

const spaceId = ref<SupportedSpaces>('OKLCH')
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
      } catch (e) {
        console.error(e)
        return color.value
      }
    },
    rtl: (color) => color.toString()
  },
  immediate: true,
  flush: 'pre'
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
  <div class="color-picker">
    <div class="color-picker__select">
      <slot name="select" :value="spaceId" :options="supportedSpaces" :on-update="(v: SupportedSpaces) => spaceId = v">
        <select v-model="spaceId">
          <option v-for="space in supportedSpaces" :key="space" :value="space">
            {{ space }}
          </option>
        </select>
      </slot>
    </div>

    <ColorChannelSlider
      v-for="(_, channel) of space.coords"
      :key="channel"
      class="color-picker__slider"
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

    <div class="color-picker__swatch" :style="{ gridRowEnd: swatchGridRowEnd }">
      <ColorSwatch :color="color" />
      <div class="color-picker__text-input">
        <slot name="text-input" :value="model" :on-update="(v: string) => model = v">
          <input type="text" v-model="model" />
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.color-picker {
  min-width: 16rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  padding: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 128px;
  grid-auto-rows: auto;
  gap: 0.5rem;
}

.color-picker__select {
  grid-column: 1 / -1;
}

.color-picker__select select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
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

.color-picker__text-input input {
  width: 100%;
  padding: 0.25rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}
</style>
