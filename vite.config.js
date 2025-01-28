import { resolve } from 'path'
import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/learning-js/' : '/',
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