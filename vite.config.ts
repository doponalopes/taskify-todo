import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@services': '/src/services',
      '@store': '/src/store',
      '@styles': '/src/styles',
      '@types': '/src/@types',
      '@utils': '/src/utils',
    }
  }
})
