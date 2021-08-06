// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */

const name = '动态路由test'; // page title
const port = 8001; // dev port
module.exports = {
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // proxy: {
    //   "/api": {
    //     target: "http://127.0.0.1:8080",
    //     // target: "http://10.91.81.53",
    //     changeOrigin: true,
    //     logLevel: 'debug', //查看实际请求地址
    //     pathRewrite: {
    //       "^/api": "/api"
    //     }
    //   }
    // }
  },
  configureWebpack: {
    performance: {
      hints: 'warning',
      // 入口起点的最大体积
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积
      maxAssetSize: 30000000,
      // 只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js')
      }
    }
  }
}