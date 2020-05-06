module.exports = {
  devServer: {
    port: 8888
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
  }
}