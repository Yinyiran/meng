module.exports = {
  devServer: {
    port: 8888,
    proxy: "http://127.0.0.1:7001"
  },
  pages: {
    index: {
      entry: "src/index.js",
      title: 'index',
    },
    manage: {
      entry: "src/manage.js",
      title: 'manage',
    },
  },
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: '127.0.0.1:7001',
  //       ws: true,
  //       changeOrigin: true
  //     },
  //   }
  // }
}