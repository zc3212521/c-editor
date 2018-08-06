const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

const baseConfig = require('./webpack.config.base')

const config = webpackMerge(baseConfig, {
    mode: 'development',
    entry: {
        app: path.join(__dirname, '../client/app.js')
    },
    plugins: [
        new UglifyJsPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
})

module.exports = config