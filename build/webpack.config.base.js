const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require("glob");

module.exports = {
    entry: {
        index: path.resolve(__dirname, '../src/pages/index/index.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "js/[chunkhash].js"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/ //排除 node_modules 目录
            },
            {
                test: /\.css$/,
                use: [
                    'css-loader',
                    'postcss-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/, // 处理js css中的图片
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240, //10K
                            esModule: false,
                            name: '[name]_[hash:6].[ext]',
                            outputPath: 'assets'
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html'),
            filename: 'index.html', //打包后的文件名
            chunks: ['index'], // 只引入index入口的js   不会引入其他入口文件的js
            minify: {
                removeAttributeQuotes: false, //是否删除属性的双引号
                collapseWhitespace: false, //是否折叠空白
            },
            // hash: true //是否加上hash，默认是 false  此处的hash是加在引入的js文件后面的
        })
    ]
}