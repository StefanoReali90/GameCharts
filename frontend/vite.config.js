import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {find:/^laspeziaui$/,replacement:fileURLToPath(new URL('../LaSpeziaUi/src/index.ts',import.meta.url))},
      {find:'laspeziaui/styles.css',replacement:fileURLToPath(new URL('../LaSpeziaUi/src/styles/index.css',import.meta.url))},
    ],
    dedupe: ['react', 'react-dom', 'framer-motion', 'lucide-react', 'clsx', 'tailwind-merge'],
  },
})
