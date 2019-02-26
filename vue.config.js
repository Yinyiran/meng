module.exports = {
  devServer: {
    port: "88",
    proxy: "http://localhost:8888"
  },
  pages: {
    index: {
      entry: "src/views/index/main.js", // page 的入口
      title: "济南莱蒂斯酒具有限公司" //template 设置<title><%= htmlWebpackPlugin.options.title %></title>
    },
    admin: {
      entry: "src/views/admin/main.js",
      title: "莱蒂斯网站后台管理"
    },
    login: {
      entry: "src/views/login/main.js",
      title: "登陆"
    },
    page: {
      entry: "src/views/page/main.js",
      title: "登陆"
    }
  },
  // 导致
  chainWebpack: config => {
    ["index", "admin"].forEach(page => {
      config.plugins.delete(`preload-${page}`);
      config.plugins.delete(`prefetch-${page}`);
    });
  }
};
