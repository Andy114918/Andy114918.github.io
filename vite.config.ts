import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// Root user site (Andy114918.github.io) serves from the domain root, so base is '/'.
// If this ever moves to a project site, base must become '/<repo-name>/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(dirname, './src') },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Split the chart library out — it is the heaviest dependency and is
        // only needed once the AgriAI dashboard scrolls into view.
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          charts: ['recharts'],
          motion: ['framer-motion'],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    css: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/main.tsx', 'src/vite-env.d.ts', 'src/**/*.d.ts'],
    },
  },
})
