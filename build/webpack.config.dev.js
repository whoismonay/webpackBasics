const merge = require("webpack-merge");
const webpack = require('webpack');
const webpackConfigBase = require('./webpack.config.base');

const proxy = {
    'dev': {
        '/': {
            target: 'https://www.dev-server.com',
            secure: false // 如果是https协议则需要设置false  否则会代理不成功
        }
    },
    'testing': {
        '/': {
            target: 'https://www.testing-server.com',
            secure: false // 如果是https协议则需要设置false  否则会代理不成功
        }
    },
}

const webpackConfigDev = {
    mode: "development",
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        port: "8080",
        quiet: false, // 开启后控制台看不到警告和报错
        inline: true,
        stats: "errors-only", // 终端只打印错误信息
        overlay: false, //启用 overlay 后，当编译出错时，会在浏览器窗口全屏输出错误，默认是关闭的。
        clientLogLevel: "silent",
        hot: true, // 开启热更新
        compress: true, //是否启用 gzip 压缩
        proxy: proxy[process.env.SERVER_ENV]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin() //热更新插件
    ]
}
module.exports = merge(webpackConfigBase, webpackConfigDev);