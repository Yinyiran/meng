module.exports = {
  devServer: {
    port:"88",
    proxy: 'http://localhost:8888'
  },
  pages: {
    index: {
      entry: "src/views/index/main.js", // page 的入口
      template: "public/index.html", // 模板来源
      filename: "index.html", // 在 dist/index.html 的输出
      title: "啦啦啦啦", //template 设置<title><%= htmlWebpackPlugin.options.title %></title>
      chunks: ["chunk-vendors", "chunk-common", "index"] // 在这个页面中包含的块，默认情况下会包含// 提取出来的通用 chunk 和 vendor chunk。
    },
    admin: {
      entry: "src/views/admin/main.js",
      template: "public/index.html",
      filename: "admin.html",
      title: "admin page",
      chunks: ["chunk-vendors", "chunk-common", "admin"]
    }
  },
  // 导致
  chainWebpack: config => {
    ["index","admin"].forEach(page => {
      config.plugins.delete(`preload-${page}`);
      config.plugins.delete(`prefetch-${page}`);
    });
  }
};
