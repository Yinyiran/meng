// const CompressionPlugin = require("compression-webpack-plugin")
// let isProd = process.env.NODE_ENV === 'production'
module.exports = {
  devServer: {
    port: 8888,
    proxy: {
      "/api": {
        target: 'http://127.0.0.1:7001',
        changeOrigin: true
      },
      "resource": {
        target: 'http://127.0.0.1:7001',
        changeOrigin: true
      }
    }
  },
  pages: {
    index: {
      entry: "src/index.js",
      title: '莱蒂斯酒具有限公司',
    },
    manage: {
      entry: "src/manage.js",
      title: '管理页面',
    }
  },
  // configureWebpack: {
  //   plugins: [
  //     new CompressionPlugin({
  //       algorithm: 'gzip',
  //       test: /\.js$|\.html$|\.json$|\.css/,
  //       threshold: 10240,
  //       minRatio: 0.8
  //     }),
  //   ],
  //   optimization: {
  //     runtimeChunk: 'single',
  //     splitChunks: {
  //       chunks: 'all',
  //       maxInitialRequests: Infinity,
  //       minSize: 20000,
  //       cacheGroups: {
  //         vendor: {
  //           test: /[\\/]node_modules[\\/]/,
  //           name(module) {
  //             // get the name. E.g. node_modules/packageName/not/this/part.js
  //             // or node_modules/packageName
  //             const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
  //             // npm package names are URL-safe, but some servers don't like @ symbols
  //             return `npm.${packageName.replace('@', '')}`
  //           }
  //         }
  //       }
  //     }
  //   }
  // },
  // css: {
  //   loaderOptions: {
  //     less: {
  //       javascriptEnabled: true
  //     }
  //   },
  //   extract: true,// 是否使用css分离插件 ExtractTextPlugin
  //   sourceMap: false,// 开启 CSS source maps
  //   requireModuleExtension: false// 启用 CSS modules for all css / pre-processor files.
  // },
  // // 打包时不生成.map文件
  // productionSourceMap: false

}