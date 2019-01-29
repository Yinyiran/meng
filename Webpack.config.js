// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CleanWebpackPlugin = require("clean-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
module.exports = {
  resolve: {
    extensions: [".ts", ".js"] // 将 `.ts` 添加为一个可解析的扩展名。
  },
  entry: { main: "./src/index.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash].js"
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file)
      },
      {
        test: "/.scss$/",
        use: [
          "vue-style-loader",
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              indentedSyntax: true,
              data: "./src/variables.scss" // 共享全局变量
            }
          }
        ]
      }
    ]
  },
  plugins: [new VueLoaderPlugin()]
};
