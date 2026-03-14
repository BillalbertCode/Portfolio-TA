import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Standard ignores
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // 1. Professional Import Sorting
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // 2. Strict TypeScript
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      // 3. React 19 & Next.js Performance
      'react-hooks/refs': 'error', 
      'react-hooks/purity': 'error', 
      '@next/next/no-img-element': 'error',
      'react/react-in-jsx-scope': 'off', 
    },
  },
])

export default eslintConfig
