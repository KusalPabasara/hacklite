import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false, // Disable source maps in production
  },
  server: {
    port: 5173,
    host: true,
    https: false, // Explicitly disable HTTPS
    // Disable source maps in development to prevent errors
    sourcemapIgnoreList: true,
  },
  define: {
    // Prevent source map errors
    global: 'globalThis',
  },
  optimizeDeps: {
    exclude: ['@vite/client', '@vite/env']
  },
  esbuild: {
    // Disable source maps in esbuild
    sourcemap: false
  },
  // Disable source maps completely
  css: {
    devSourcemap: false
  }
})