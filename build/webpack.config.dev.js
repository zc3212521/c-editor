const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const HTMLPlugin = require('html-webpack-plugin')

const config = webpackMerge(baseConfig, {
    mode : 'development',
    entry: { //热更替相关配置
        app: [
            'react-hot-loader/patch',
            path.join(__dirname, '../client/app.js')
        ]
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'index.js',
    },
    devServer: {
        host: '0.0.0.0',
        port: '8085',
        contentBase: path.join(__dirname, '../dist'),
        hot: true, //热更替相关配置
        overlay: {
            errors: true
        },
        historyApiFallback: {
            index: '/public/index.html'
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HTMLPlugin({
            template: path.join(__dirname, '../client/template.html')
        })
    ],
})

module.exports = config