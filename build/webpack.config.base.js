const path = require('path');
const HTMLPlugin = require('html-webpack-plugin')

const config = {

    module: {
        rules: [
            {
                test: /.jsx?$/,
                use: 'babel-loader',
                exclude: [
                    path.join(__dirname, '../node_modules'),
                    path.join(__dirname, '../out'),
                ]
            },
            {
                test: /\.less$/,
                use: ['style-loader','css-loader','less-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader',{ loader: 'css-loader', options: { modules: true} }]
            },
            {
                test: /\.(jpg|png)$/,
                use: "url-loader?limit=8192"
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader?modules&localIdentName=[name]-[local]-[hash:base64:5]&minimize',
                    'sass-loader'
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: "file-loader"
            }
        ]
    },
    resolve: {
        // modules: [
        //     path.resolve('./app/modules/$redux'),
        //     path.resolve('./node_modules'),
        // ],
        extensions: ['.js', '.jsx'],
        alias: {
            'component': path.resolve(__dirname, '../client/component')
        }
    },
}

module.exports = config