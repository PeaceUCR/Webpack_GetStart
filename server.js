/**
 * Created by hea on 3/14/19.
 */
const express = require('express');
const path =  require('path');
const app = express();
const port = process.env.PORT || 3000;

//api is here
app.get('/api', (req, res) => {
    res.send('I am api end point');
});


console.log(process.env.NODE_ENV);

//no need to watch source code....
if(process.env.NODE_ENV === 'production'){
    console.log("I am production mode");
    app.use(express.static(path.resolve(__dirname, 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build/test.html'));
    });

}else{
    //if source cod updated, then recompiling!
    console.log("I am development mode");
    const middleware = require('webpack-dev-middleware');
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.development.config.js');
    app.use(middleware(webpack(webpackConfig)));
    app.use(express.static(path.resolve(__dirname, 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build/test.html'));
    });
}



app.listen(port, () => console.log('Example app listening on port 3000!'));