import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    '**/dist/',
    '**/*.d.ts',
  ],
  typescript: {
    parserOptions: {
      ecmaVersion: 'latest',
    },
  },
})
