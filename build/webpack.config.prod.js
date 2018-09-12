const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const config = webpackMerge(baseConfig, {
    mode: 'production',
    entry: {
        app: path.join(__dirname, '../client/views/editor/app.js')
    },
    output: {
        path: path.join(__dirname, '../out'),
        filename: 'index.js',
        // publicPath: '/public/',
    },
})

module.exports = config