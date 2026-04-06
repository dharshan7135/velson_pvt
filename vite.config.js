import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],

  preview: {
    allowedHosts: [
      "velson-pvt.onrender.com",
      "velson-backend-72n8.onrender.com"
    ]
  },

  server: {
    host: true,
    port: 5173
  }
})
