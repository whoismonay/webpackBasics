const merge = require("webpack-merge");
const webpackConfigBase = require('./webpack.config.base');

// 清除dist文件夹
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const webpackConfigProd = {
    mode: "production",
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ["**/*", "!dll", "!dll/**"], // 不删除dll及其子目录文件
            verbose: true, // 在控制台输出信息
        })
    ]
}

module.exports = merge(webpackConfigBase, webpackConfigProd);