import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  //css的主入口文件
  css:{
    loaderOptions:{
      scss:{
        additionlData:'@import "./src/style.scss"'
      }
    }
  }
})
