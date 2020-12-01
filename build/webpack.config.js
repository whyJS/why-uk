const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
console.log('shell命令在process.argv每个空隔划分为数组的一项--: ');

module.exports = {
  entry: path.resolve(__dirname, '../packages/uk/index.js'),
  output: {
    filename: 'index.js', // 打包后的文件名称
    path: path.resolve(__dirname, '../lib'), // 打包后的目录
    libraryTarget: 'umd',
    library: 'npmJSDemo' // 直接浏览器引用时在window的key
  },
  module: {
    rules: [{
        test: /\.js$/,
        // use: {
        //   loader: "babel-loader"
        //   //   options: { // 看.babelrc
        //   //     presets: ["@babel/preset-env"]
        //   //   }
        // },
        // 将对.js文件的处理转交给id为babel的HappyPack的实列
        use: ['happypack/loader?id=babel'],
        include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/
      }
      // /* ,            {
      //                test: /\.(jpe?g|png|gif)$/i, //图片文件
      //                use: [
      //                    {
      //                        loader: 'url-loader',
      //                        options: {
      //                            limit: 10240,
      //                            fallback: {
      //                                loader: 'file-loader',
      //                                options: {
      //                                    name: 'img/[name].[hash:8].[ext]',
      //                                },
      //                            },
      //                        },
      //                    },
      //                ],
      //                include: [path.resolve(__dirname, 'src')],
      //                exclude: /node_modules/,
      //            },
      //            {
      //                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
      //                use: [
      //                    {
      //                        loader: 'url-loader',
      //                        options: {
      //                            limit: 10240,
      //                            fallback: {
      //                                loader: 'file-loader',
      //                                options: {
      //                                    name: 'media/[name].[hash:8].[ext]',
      //                                },
      //                            },
      //                        },
      //                    },
      //                ],
      //                include: [path.resolve(__dirname, 'src')],
      //                exclude: /node_modules/,
      //            },
      //            {
      //                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
      //                use: [
      //                    {
      //                        loader: 'url-loader',
      //                        options: {
      //                            limit: 10240,
      //                            fallback: {
      //                                loader: 'file-loader',
      //                                options: {
      //                                    name: 'fonts/[name].[hash:8].[ext]',
      //                                },
      //                            },
      //                        },
      //                    },
      //                ],
      //                include: [path.resolve(__dirname, 'src')],
      //                exclude: /node_modules/,
      //            }, */
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
    new HappyPack({
      // 用唯一的标识符id来代表当前的HappyPack 处理一类特定的文件
      id: 'babel',
      // 如何处理.js文件，用法和Loader配置是一样的
      loaders: ['babel-loader?cacheDirectory=true']
    })
  ]
};