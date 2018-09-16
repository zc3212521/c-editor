const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const HTMLPlugin = require('html-webpack-plugin')

const config = webpackMerge(baseConfig, {
    mode: 'production',
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].[hash].js',
    },
    entry: {
        app: path.join(__dirname, '../client/app.js')
    },
    plugins: [
        new HTMLPlugin({
            template: path.join(__dirname, '../client/template.html')
        })
    ]
})

module.exports = config