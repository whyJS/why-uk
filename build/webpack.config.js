/*
 * @Descripttion: 
 * @Author: whyjs
 * @Date: 2020-09-21 13:45:11
 * @LastEditors: whyjs
 * @LastEditTime: 2020-12-02 14:13:51
 */
const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HappyPack = require('happypack');
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
        // test: /\.js$/,
        // // use: {
        // //   loader: "babel-loader"
        // //   //   options: { // 看.babelrc
        // //   //     presets: ["@babel/preset-env"]
        // //   //   }
        // // },
        // // 将对.js文件的处理转交给id为babel的HappyPack的实列
        // use: ['happypack/loader?id=babel'],
        // include: [path.resolve(__dirname, 'src')],
        // exclude: /node_modules/


        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env']
            ],
            plugins: [
              [
                '@babel/plugin-transform-runtime'
              ],
              ['@babel/plugin-transform-modules-commonjs'],
              ['@babel/plugin-transform-object-assign']
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
    /** **   使用HappyPack实例化    *****/
    // new HappyPack({
    //   // 用唯一的标识符id来代表当前的HappyPack 处理一类特定的文件
    //   id: 'babel',
    //   // 如何处理.js文件，用法和Loader配置是一样的
    //   loaders: ['babel-loader?cacheDirectory=true']
    // })
  ]
};