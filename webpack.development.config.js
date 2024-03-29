/**
 * Created by hea on 3/15/19.
 */
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpack = require('webpack');

const config = {
    //entry with all requires at index.js
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                //applied on all file end with js
                test: /\.js$/,
                use: 'babel-loader',
                //add exclude otherwise error reported!!!
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', MiniCssExtractPlugin.loader , 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', MiniCssExtractPlugin.loader ,'css-loader', 'less-loader']
            }
        ]
    },
    devServer: {
        contentBase: './build',
        compress: true
        //port: 9000
    },
    plugins: [new HtmlWebpackPlugin({
        //build file name
        filename: 'test.html',
        //source file
        template: path.resolve(__dirname,'./src/test.html')
        //note the script tag for bundle.js will auto added into test.html after build!
    }),
        new webpack.NamedModulesPlugin(),
        new webpack.NamedChunksPlugin(),
        new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    mode: 'development',
    devtool: 'eval',
    cache: true,
    performance:{
        hints: false
    }
};

module.exports = config;