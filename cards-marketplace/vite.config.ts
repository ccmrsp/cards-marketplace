import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(), // ✅ Tailwind V4
  ],
  server: {
    proxy: {
      // tudo que começar com /cards vai para localhost:5000/cards
      '/cards': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      // se sua API tiver prefixo /api, adicione aqui também
      // '/api': { target: 'http://localhost:5000', changeOrigin: true }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
