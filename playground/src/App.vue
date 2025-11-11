<script setup lang="ts">
import { ColorPicker } from '@moraleja39/vue-colorjs-picker'
import { ref } from 'vue'

const color = ref('oklch(65% 0.27 220)')
</script>

<template>
  <main>
    <h1>yourlib playground</h1>
    <p>play with your components in this package</p>
    <div class="container">
      <ColorPicker v-model="color" class="picker" />
    </div>
  </main>
</template>

<style scoped>
.picker {
  width: 400px;
}
</style>
