const webpackConfig = require('./webpack.config.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackMerge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
module.exports = WebpackMerge(webpackConfig, {
    mode: 'production', // production模式下会进行tree shaking(去除无用代码)和uglifyjs(代码压缩混淆)
    devtool: 'cheap-module-source-map',
    plugins: [new CleanWebpackPlugin()],
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: false, // Must be set to true if using source-maps in production
                terserOptions: {
                    compress: {
                        drop_console: true,
                        drop_debugger: true,
                        collapse_vars: true,
                    },
                    output: {
                        /*
            是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，
            可以设置为false
            */
                        beautify: false,
                        /*
            是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
            */
                        comments: false,
                    },
                },
            }),
        ],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                libs: {
                    name: 'chunk-libs',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: 'initial', // 只打包初始时依赖的第三方
                },
            },
        },
    },
});
