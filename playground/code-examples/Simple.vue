<script setup lang="ts">
import { ColorPicker } from 'vue-colorjs-picker'
import { ref } from 'vue'

const color = ref('oklch(0.430 0.148 343.0)')
</script>

<template>
  <ColorPicker v-model="color" />
</template>
