import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        basic: resolve(__dirname, 'src/basic-exercises/'),
        manipulatingdom: resolve(__dirname, 'src/manipulating-dom/'),
      },
    },
  },
})