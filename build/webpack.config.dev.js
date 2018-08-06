const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const config = webpackMerge(baseConfig, {
    mode : 'development',
    entry: { //热更替相关配置
        app: [
            'react-hot-loader/patch',
            path.join(__dirname, '../client/app.js')
        ]
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
        new webpack.HotModuleReplacementPlugin()
    ]
})

module.exports = config