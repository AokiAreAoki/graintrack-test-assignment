import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindCSSRadix from 'tailwindcss-radix'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindCSSRadix(),
    TanStackRouterVite(),
  ],
  test: {
    environment: 'jsdom',
  },
})
