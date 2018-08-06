const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const config = webpackMerge(baseConfig, {
    mode: 'production',
    entry: {
        app: path.join(__dirname, '../client/app.js')
    }
})

module.exports = config