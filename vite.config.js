import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'



export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [vue()],
   css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/_variables.scss";`
      }
    }
  }
})

