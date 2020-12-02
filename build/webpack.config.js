/*
 * @Descripttion: 
 * @Author: whyjs
 * @Date: 2020-09-21 13:45:11
 * @LastEditors: whyjs
 * @LastEditTime: 2020-12-02 15:43:12
 */
const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
console.log('shell命令在process.argv每个空隔划分为数组的一项--: ');

module.exports = {
  entry: path.resolve(__dirname, '../packages/uk/index.js'),
  output: {
    filename: 'index.js', // 打包后的文件名称
    path: path.resolve(__dirname, '../lib'), // 打包后的目录
    libraryTarget: 'umd',
    library: 'npmJSDemo' // 直接浏览器引用时在window的key
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        exclude: /node_modules/,
        uglifyOptions: {
          ie8: true // 解决ie下的关键字default的问题
        }
      })
    ],

  },

  module: {
    rules: [{
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ["@babel/preset-env",
                {
                  "targets": {
                    "browsers": ["> 1%", "ie >= 8"],
                    "node": "current" // 根据当前 node 环境
                  },
                  "useBuiltIns": "usage",
                  "corejs": 3
                }
              ]
            ],
            plugins: [
              [
                '@babel/plugin-transform-runtime'
              ]
            ]
          }
        }

      }

    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../packages')
    },
    extensions: ['*', '.js', '.json'] // webpack会根据extensions定义的后缀查找文件(频率较高的文件类型优先写在前面)
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) // 运行时更改指定下这个环境变量
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../examples/index.html'),
      filename: 'index.html'
    }),
  ]
};