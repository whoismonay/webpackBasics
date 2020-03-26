const merge = require("webpack-merge");
const webpackConfigBase = require('./webpack.config.base');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 抽离css到单独的文件中
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css js等文件

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin"); // 显示各个模块构建所花费的时间
const smp = new SpeedMeasurePlugin();

const HardSourceWebpackPlugin = require('hard-source-webpack-plugin'); // 为模块构建提供中间缓存来节约构建时间

// 清除dist文件夹
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const webpackConfigProd = {
    mode: "production",
    plugins: [
        new HardSourceWebpackPlugin(),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ["**/*", "!dll", "!dll/**"], // 不删除dll及其子目录文件
            verbose: true, // 在控制台输出信息
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[contenthash].css'
        }),
        new OptimizeCssPlugin(),
    ]
}

module.exports = smp.wrap(merge(webpackConfigBase, webpackConfigProd));