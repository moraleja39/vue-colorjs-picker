import { resolve } from 'node:path'
import vuePlugin from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dtsPlugin from 'vite-plugin-dts'

// noinspection JSUnusedGlobalSymbols - suppresses "exported but not used" warning in WebStorm
export default defineConfig({
  plugins: [
    vuePlugin(),
    dtsPlugin({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'VueColorjsPicker',
      formats: ['es', 'umd'],
      fileName: format => `vue-colorjs-picker.${format === 'es' ? 'm' : ''}js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
