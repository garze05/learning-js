import { resolve } from 'path'
import { defineConfig } from 'vite';

const basePath = process.env.GITHUB_REPO || '/'

export default defineConfig({
  base: basePath,
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        basic: resolve(__dirname, 'src/pages/basic-exercises/index.html'),
        manipulatingdom: resolve(__dirname, 'src/pages/manipulating-dom/index.html'),
        todolist: resolve(__dirname, 'src/pages/todo-list/index.html'),
      },
    },
  },
})