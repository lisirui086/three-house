import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // 配置路径别名
    alias: {
      '@': resolve(__dirname, '/src')
    },
    // 要省略的扩展名
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json']
  },
  server: {
    host: true,
    port: 3000,
    open: true
  },
  build: {
    // 静态文件的存放目录
    assetsDir: 'static'
  }
})
