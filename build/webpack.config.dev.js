module.exports = {
    mode: "development",
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        port: "8080",
        quiet: false, // 开启后控制台看不到警告和报错
        inline: true,
        stats: "errors-only", // 终端只打印错误信息
        overlay: false, //启用 overlay 后，当编译出错时，会在浏览器窗口全屏输出错误，默认是关闭的。
        clientLogLevel: "silent",
        compress: true //是否启用 gzip 压缩
    }
}