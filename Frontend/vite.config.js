import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // server: {
  //   port: 5173,
  //   proxy: {
  //     "/v1": {
  //       target: "http://localhost:8080", // Forward API calls to backend
  //       changeOrigin: true,
  //       secure: false,
  //     }
  //   }
  // }
})
