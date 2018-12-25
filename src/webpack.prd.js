const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: 'dist/'
    },
    plugins: [

        // Simplifies creation of HTML files to serve the bundles
        new HtmlWebpackPlugin({
            // Uses existing HTML file instead of creating one from scratch
            template: './index.ejs',
            templateParameters: {
                includeAnalytics: true
            },
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),

        // Replaces GOOGLE_MAPS_API_KEY variable on the code with a functional Google
        // Maps API key. This key is currently whitelisted to the following domains:
        // - ruipinge.google.io
        // - geofiddle.com
        new webpack.DefinePlugin({
            GOOGLE_MAPS_API_KEY: JSON.stringify('AIzaSyDg0pS7JeL2uo6IrPQ5FNV--GIrFp1M8CQ')
        })

    ]
});
