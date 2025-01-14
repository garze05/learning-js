// import { resolve } from 'path'
import { defineConfig } from 'vite'
import mpa from 'vite-plugin-mpa'

export default defineConfig({
  plugins: [
    mpa({
    }),
  ],
  // build: {
  //   rollupOptions: {
  //     input: {
  //       main: resolve(__dirname, 'index.html'),
  //       basic: resolve(__dirname, 'src/basic-exercises/'),
  //       manipulatingdom: resolve(__dirname, 'src/manipulating-dom/'),
  //       todolist: resolve(__dirname, 'src/todo-list/'),
  //     },
  //   },
})