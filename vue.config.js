const { defineConfig } = require('@vue/cli-service')
module.exports = {
  devServer: {
    // 設定完成後重啟npm
    proxy: {
      // 設定代理
      '/data': {
        target: 'http://localhost:8090/MySpringBoot', // 介面的域名
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/data': ''	// 萬用字元
        }
      }
    }
  }
}
