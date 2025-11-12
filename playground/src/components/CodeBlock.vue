<script setup lang="ts">
const props = defineProps<{
  code: string
}>()
</script>

<template>
  <div class="mt-10 w-240 [&_pre]:p-4 [&_pre]:rounded-md [&_pre]:whitespace-pre-wrap" v-html="code" />
</template>
