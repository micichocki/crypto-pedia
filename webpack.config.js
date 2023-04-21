const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: { index: path.resolve(__dirname, "src", "index.js") },
    output: {
      path: path.resolve(__dirname, 'dist'), 
      filename: '[name].js',
      assetModuleFilename:'[name][ext]', 
    },
    devServer: {
      hot: true 
    },
    module: {
      rules: [
        {
          test: /\.scss$/, 
          use: ["style-loader", "css-loader", "sass-loader"]
        },
        {
          test:/\.js$/,
          exclude:/node_modules/,
          use:{
            loader:'babel-loader',
            options:{
              presets:['@babel/preset-env']
            },
          },
        },
        {
          test: /\.html$/,
          use: ["html-loader"]
        },
        {
          test: /\.(png|svg|jpg|jpeg)$/i,
          type:'asset/resource'
        }
      ],
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, "src", "index.html")
        })
      ]
  };