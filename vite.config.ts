// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/auth': {
        target: 'https://projeto-api-7h8d.onrender.com',
        changeOrigin: true,
        secure: true,
      },
      '/projects': {
        target: 'https://projeto-api-7h8d.onrender.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
}
)
