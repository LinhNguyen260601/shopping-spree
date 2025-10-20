import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default [
  {
    ignores: ['dist', 'node_modules'] // eslint will ignore the dist and node_modules folders
  },
  {
    files: ['**/*.{ts,tsx}'], // eslint will only run on ts and tsx files
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.es2020,
        React: 'readonly' // Add React as a global
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true // eslint will use the jsx syntax
        }
      }
    },
    plugins: {
      react: react, // eslint will use the react plugin
      'react-hooks': reactHooks, // eslint will use the react hooks plugin
      'react-refresh': reactRefresh, // eslint will use the react refresh plugin
      prettier: prettier // eslint will use the prettier plugin
    },
    settings: {
      react: {
        version: 'detect' // eslint will detect the react version
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.app.json'
        },
        alias: {
          map: [['@', path.resolve(__dirname, 'src')]],
          extensions: ['.ts', '.tsx', '.js', '.jsx']
        }
      }
    },
    rules: {
      ...js.configs.recommended.rules, // eslint will use the recommended rules
      ...tseslint.configs.recommended.rules, // eslint will use the typescript rules
      ...reactHooks.configs.recommended.rules, // eslint will use the react hooks rules
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/react-in-jsx-scope': 'off',
      'react/jsx-no-target-blank': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      'react-hooks/config': 'error',
      'react-hooks/error-boundaries': 'error',
      'react-hooks/component-hook-factories': 'error',
      'react-hooks/gating': 'error',
      'react-hooks/globals': 'error',
      'react-hooks/immutability': 'error',
      'react-hooks/preserve-manual-memoization': 'error',
      'react-hooks/purity': 'error',
      'react-hooks/refs': 'error',
      'react-hooks/set-state-in-effect': 'error',
      'react-hooks/set-state-in-render': 'error',
      'react-hooks/static-components': 'error',
      'react-hooks/unsupported-syntax': 'warn',
      'react-hooks/use-memo': 'error',
      'react-hooks/incompatible-library': 'warn',
      'no-undef': 'off', // Turn off no-undef for TypeScript files since TS handles this
      'prettier/prettier': [
        'warn',
        {
          arrowParens: 'always', // eslint will use the arrow parens rule
          semi: false, // eslint will use the semi rule
          trailingComma: 'none', // eslint will use the trailing comma rule
          tabWidth: 2, // eslint will use the tab width rule
          endOfLine: 'auto', // eslint will use the end of line rule
          useTabs: false, // eslint will use the use tabs rule
          singleQuote: true, // eslint will use the single quote rule
          printWidth: 120, // eslint will use the print width rule
          jsxSingleQuote: true // eslint will use the jsx single quote rule
        }
      ]
    }
  }
]
