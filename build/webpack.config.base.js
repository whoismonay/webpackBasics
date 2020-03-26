const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development' ? true : false;

module.exports = {
    entry: {
        index: path.resolve(__dirname, '../src/index.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: isDev ? "js/[name].[hash].js" : "js/[name].[chunkhash].js", // 入口文件打包后对应的文件输出
        chunkFilename: isDev ? "js/[name].[hash].js" : "js/[name].[chunkhash].js" // 非入口文件打包后对应的文件输出
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'], // babel的详细配置在.babelrc文件中
                exclude: /node_modules/ //排除 node_modules 目录
            },
            {
                test: /\.css$/,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader' // postcss的详细配置在postcss.config.js文件中
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
                            name: '[name].[hash].[ext]',
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
            scriptLoading: 'defer', // 非阻塞javascript加载
        })
    ]
}