<script setup lang="ts">
import { ref } from 'vue'
import { ColorPicker } from 'vue-colorjs-picker'

const color = ref('oklch(0.430 0.148 343.0)')
</script>

<template>
  <ColorPicker v-model="color" />
</template>
