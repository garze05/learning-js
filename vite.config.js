import { resolve } from 'path'
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    base: './',
    rollupOptions: {
      input: {
        main: resolve(__dirname, './'),
        basic: resolve(__dirname, 'src/pages/basic-exercises/'),
        manipulatingdom: resolve(__dirname, 'src/pages/manipulating-dom/'),
        todolist: resolve(__dirname, 'src/pages/todo-list/'),
      },
    },
  },
})