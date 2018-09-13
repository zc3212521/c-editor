const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const nodeExternals = require('webpack-node-externals');

const config = webpackMerge(baseConfig, {
    mode: 'production',
    entry: {
        app: path.join(__dirname, '../client/views/editor/index.jsx')
    },
    output: {
        path: path.join(__dirname, '../bundle'),
        filename: 'index.js',
        // publicPath: '/public/',
        libraryTarget: 'commonjs2'
    },
    externals: [nodeExternals()]
})

module.exports = config