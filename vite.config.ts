import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'
import { visualizer } from 'rollup-plugin-visualizer'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), visualizer()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
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
