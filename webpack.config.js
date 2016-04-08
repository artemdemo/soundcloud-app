var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

module.exports = {
    entry: {
        'app': './source/app.jsx'
    },
    output: {
        path: __dirname + '/dist/',
        filename: './js/bundle-[hash].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules|vendor/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: []
};
