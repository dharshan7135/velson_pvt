import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({

  plugins: [react(), tailwindcss()],

  // for local development
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },

  // for render deployment
  preview: {
    host: true,
    port: process.env.PORT || 10000,
    allowedHosts: "all",

    proxy: {
      '/api': {
        target: 'https://velson-backend.onrender.com',
        changeOrigin: true,
        secure: true
      }
    }
  }

})
