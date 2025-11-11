<script setup lang="ts">
import Color from 'colorjs.io'
import { SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'
import {computed, type CSSProperties, ref, watch, watchEffect} from 'vue'
import { getStepCount } from '../utils/color'
import {clamp} from "../utils/clamp"

const props = defineProps<{
  space: Color.Space
  channel: string
  color: Color
}>()

const value = ref([0])

const space = computed(() => props.space)
const spaceName = computed(() => space.value.id)
const coord = computed(() => {
  if (!Object.keys(space.value.coords).includes(props.channel)) {
    console.error(`Channel ${props.channel} not found in space ${props.space}`)
    return {}
  }
  return space.value.coords[props.channel]
})
const refRange = computed<[number, number]>(() => coord.value?.refRange ?? coord.value?.range ?? [0, 1])
const coordMin = computed(() => refRange.value[0])
const coordMax = computed(() => refRange.value[1])
const steps = computed(() => getStepCount(coordMin.value, coordMax.value))

function getColorStopAt(percent: number): Color {
  const p = coordMin.value + (coordMax.value - coordMin.value) * clamp(percent, 0, 1)
  return props.color.clone().set(props.channel, p)
}

const gradient = computed(() => {
  const stops = [0, 0.2, 0.4, 0.6, 0.8, 1].map(p => getColorStopAt(p)).map(c => c.toString())
  return stops.join(', ')
})

const trackStyle = computed<CSSProperties>(() => ({
  background: `linear-gradient(to right var(--in-space), ${gradient.value})`
}))

const displayColor = computed(() => props.color.display())

const model = defineModel<number>()
watch(value, () => {
  model.value = value.value[0]
}, { deep: true })
watchEffect(() => {
  value.value = [props.color.get(props.channel)]
})
</script>

<template>
  <div class="channel-slider">
    <div class="channel-slider__label">
      <slot name="label" :coord="coord" :min="coordMin" :max="coordMax">
        <span>{{ coord?.name }}</span>
        <span class="channel-slider__range">({{ coordMin }} - {{ coordMax }})</span>
      </slot>
    </div>
    <div class="channel-slider__input">
      <slot name="input" :value="value[0]" :min="coordMin" :max="coordMax" :step="steps" :on-update="(v: number) => value = [v]">
        <input type="number" v-model="value[0]" :min="coordMin" :max="coordMax" :step="steps" />
      </slot>
    </div>
    <SliderRoot
      v-model="value"
      class="channel-slider__slider"
      :min="coordMin"
      :max="coordMax"
      :step="steps"
    >
      <SliderTrack class="channel-slider__track" :style="trackStyle" />
      <SliderThumb
        class="channel-slider__thumb"
        :style="{ backgroundColor: displayColor }"
      />
    </SliderRoot>
  </div>
</template>

<style scoped>
.channel-slider {
  width: 100%;
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 1fr 72px;
  align-items: center;
  gap: 0.125rem;
}

.channel-slider__label {
  grid-column: 1;
  grid-row: 1;
}

.channel-slider__range {
  opacity: 0.6;
  font-size: 0.875rem;
}

.channel-slider__input {
  grid-column: 2;
  grid-row: 1;
}

.channel-slider__input input {
  width: 100%;
  padding: 0.25rem;
  font-size: 0.875rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

.channel-slider__slider {
  grid-column: 1 / -1;
  grid-row: 2;
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;
  touch-action: none;
  width: 100%;
  height: 100%;
}

.channel-slider__track {
  position: relative;
  flex-grow: 1;
  border-radius: 0.25rem;
  height: 100%;
}

@supports (background: linear-gradient(in oklab, red, tan)) {
  .channel-slider__track {
    --in-space: in v-bind(spaceName);
  }
}

.channel-slider__thumb {
  display: block;
  width: 0.75rem;
  height: 100%;
  border: 1px solid black;
  outline: 1px solid white;
  border-radius: 0.25rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
</style>
