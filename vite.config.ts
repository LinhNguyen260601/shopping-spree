/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'
import { visualizer } from 'rollup-plugin-visualizer'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), visualizer()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/test/setup.ts'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook')
          })
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: 'chromium'
              }
            ]
          },
          setupFiles: ['.storybook/vitest.setup.ts']
        }
      }
    ]
  },
  css: {
    devSourcemap: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          'react-vendor': ['react', 'react-dom'],
          // Router
          'react-router': ['react-router-dom'],
          // Form libraries
          'form-libs': ['react-hook-form', '@hookform/resolvers', 'yup'],
          // UI libraries
          'ui-libs': ['framer-motion', 'react-toastify', '@floating-ui/react'],
          // Query & State
          'query-libs': ['@tanstack/react-query', 'axios'],
          // Utilities
          utils: ['lodash', 'clsx', 'tailwind-merge', 'dompurify', 'immer']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
