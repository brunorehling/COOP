// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/auth': {
        target: 'api do render aqui',
        changeOrigin: true,
        secure: true,
      },
      '/projects': {
        target: 'api do render aqui',
        changeOrigin: true,
        secure: true,
      },
    },
  },
}
)
