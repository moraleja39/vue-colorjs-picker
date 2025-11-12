<script setup lang="ts">
defineProps<{
  code: string
}>()
</script>

<template>
  <div class="lg:mt-10 overflow-hidden w-full lg:max-w-240 [&_pre]:p-4 [&_pre]:rounded-md max-lg:[&_pre]:overflow-x-auto lg:[&_pre]:whitespace-pre-wrap" v-html="code" />
</template>
