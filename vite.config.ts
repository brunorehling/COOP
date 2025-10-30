// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/auth': {
        target: 'url aqui',
        changeOrigin: true,
        secure: true,
      },
      '/projects': {
        target: 'url aqui',
        changeOrigin: true,
        secure: true,
      },
    },
  },
}
)
