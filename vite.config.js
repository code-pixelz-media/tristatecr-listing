import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

export default defineConfig({

  plugins: [preact()],
  build: {
    rollupOptions: {
      // Change the output file name to 'main-script.js'
      output: {
        entryFileNames: 'main-script.js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: 'main-style.css'
      }
    }
  }
})