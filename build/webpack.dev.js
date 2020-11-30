const Webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const WebpackMerge = require('webpack-merge');
module.exports = WebpackMerge(webpackConfig, {
    mode: 'development', // 如果没有设置，webpack4 会将 mode 的默认值设置为 production
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        port: 3000,
        disableHostCheck: true,
        hot: true, // 热更新
        // proxy: {
        //     '/proxy': {
        //         target: proxyApiPath,
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/proxy': '',
        //         },
        //     },
        //     '/websocket': {
        //         target: proxyWebsocketPath,
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/websocket': '',
        //         },
        //     },
        // },
    },
    plugins: [new Webpack.HotModuleReplacementPlugin()],
});
