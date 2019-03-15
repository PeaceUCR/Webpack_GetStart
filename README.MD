# Webpack Get Start

https://webpack.js.org/

https://www.udemy.com/webpack-2-the-complete-developers-guide/learn/v4/t/lecture/6296210?start=1

1.npm init(ignore questions)

2.create /src folder and two js file in it

how to import other js file? Option:
 CommonJS: module.exports, require
 
 AMD: define, require
 
 ES2015: export, import
 
 
3.npm install --save-dev webpack

4.create webpack.config.js , with simple setting
(note I don't need to add two files together? it will auto merge code in src folder?)
(if remove const sum = require("./sum") ; then bundle.js only contain the index.js)
**So the entry merge based on require code**
        
        const config = {
            //entry with all requires at index.js
                entry: './src/index.js',
                output: {
                    path: path.resolve(__dirname, 'build'),
                    filename: 'bundle.js'
                },
        };

**How to run: type webpack ** 
 
 5.enable babel
 
 npm install babel-core babel-loader babel-preset-env --save-dev
 
 add .babelrc and       
        
        module: {
                rules: [
                        {
                            use: 'babel-loader',
                            //applied on all file end with js
                            test: /\.js$/,
                            //add exclude otherwise error reported!!!
                            exclude: /node_modules/
                        }                    
                ]
            }
 
 
 6. handle css import
 
 npm install --save-dev style-loader css-loader
        
        module: {
                rules: [
                    {
                        use: 'babel-loader',
                        //applied on all file end with js
                        test: /\.js$/,
                        //add exclude otherwise error reported!!!
                        exclude: /node_modules/
                    },
                    {
                        use: ['style-loader', 'css-loader'],
                        test: /\.css$/
                    }
                ]
            }

 then if import '../styles/test.css'; in js code,
 
 the style will finally added to the html head, instead direct link that css file
        
        <style type="text/css">img{
            max-width: 200px;
        }</style>

then less loader
            
        "less": "^3.9.0",
        "less-loader": "^4.1.0",
        
        {
             test: /\.less$/,
             use: ['style-loader', 'css-loader', 'less-loader']
         }
Because add less file only when required by js, can't do independently

 7.HTML plugin
 
 npm install --save-dev html-webpack-plugin
 
 https://github.com/jantimon/html-webpack-plugin#options
        
        plugins: [new HtmlWebpackPlugin({
                //build file name
                filename: 'test.html',
                //source file
                template: path.resolve(__dirname,'./src/test.html')
                //note the script tag for bundle.js will auto added into test.html after build!
            })]

 8. can handle image, like image compression
 https://www.udemy.com/webpack-2-the-complete-developers-guide/learn/v4/t/lecture/6296264?start=405
 
 9.code split(only load necessary js code)
 https://www.udemy.com/webpack-2-the-complete-developers-guide/learn/v4/t/lecture/6296278?start=225
 if needed, call
        
        //loading myModule & excute the code in module
        System.import('/myModule').then(module => {
            //do something after module loaded
        })
 
 
 10. Webpack dev server
 instead of manually open the html file, open on server
npm install --save-dev webpack-dev-server 
https://stackoverflow.com/questions/40379139/cannot-find-module-webpack-bin-config-yargs
        
            
                "webpack": "^3.0.0",
                "webpack-cli": "2.0.13",
                "webpack-config-utils": "2.0.0",
                "webpack-dev-server": "^2.7.1",
                "webpack-validator": "2.2.7"
 
**How to start webpack server: type webpack-dev-server**

webpack-dev-server config in webpack.config.js
https://webpack.js.org/guides/development/
https://webpack.js.org/configuration/dev-server/
        
         devServer: {
                contentBase: './build',
                compress: true,
                port: 9000
            }
        
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1",
            "build": "webpack",
            "watch": "webpack --watch",
            "server": "webpack && webpack-dev-server"
          }


11. Webpack-dev-server and node server
https://www.udemy.com/webpack-2-the-complete-developers-guide/learn/v4/t/lecture/6308320?start=15

npm install webpack-dev-middleware --save-dev

npm install express

How to run **node server**

add new file server.js for node/express server

But can't get anything https://stackoverflow.com/questions/44233727/cannot-get-error-with-my-webpack-dev-middleware-setup

set app.get route for ui file return
        
        //if source cod updated, then recompiling!
            console.log("I am Here");
            const middleware = require('webpack-dev-middleware');
            const webpack = require('webpack');
            const webpackConfig = require('./webpack.config.js');
            app.use(middleware(webpack(webpackConfig)));
            app.use(express.static(path.resolve(__dirname, 'build')));
            app.get('*', (req, res) => {
                res.sendFile(path.resolve(__dirname, 'build/test.html'));
            });
  
12. production mode?

https://webpack.js.org/concepts/mode/

add mode: 'development' to the const config obj, then mode warning is gone            
            
for the production mode for node server, the value still undefined, manully set in script
            
https://stackoverflow.com/questions/11104028/process-env-node-env-is-undefined            

Then set the seperate webpack.config.js for two mode