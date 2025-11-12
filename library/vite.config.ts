import { resolve } from 'node:path'
import vuePlugin from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dtsPlugin from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vuePlugin(),
    dtsPlugin({
      tsconfigPath: resolve(__dirname, 'tsconfig.lib.json'),
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
