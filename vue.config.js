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
      title: 'index',
    },
    manage: {
      entry: "src/manage.js",
      title: 'manage',
    },
  },
}