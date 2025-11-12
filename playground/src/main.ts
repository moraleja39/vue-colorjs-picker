import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'
import PrimeVue from 'primevue/config'
import { createApp } from 'vue'

import App from './App.vue'
import '@/assets/main.css'
import '@moraleja39/vue-colorjs-picker/style.css'

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

const primePreset = definePreset(Aura, {
  semantic: {
    primary: shades.reduce<PaletteDesignToken>((acc, shade) => {
      acc[shade] = `oklch(${100 - (shade / 10)}% 0.169 343.0)`
      return acc
    }, {}),
  },
})

createApp(App).use(PrimeVue, {
  theme: {
    preset: primePreset,
  },
}).mount('#app')
