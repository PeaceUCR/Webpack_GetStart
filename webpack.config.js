/**
 * Created by hea on 3/7/19.
 */
//get current path by nodejs, path.resolve(__dirname) means current working dir
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

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
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
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
    })],
    mode: 'development'
};

module.exports = config;