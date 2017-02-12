var path = require('path');
var dotenv= require('dotenv');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

dotenv.config('.env');
console.log(process.env);

module.exports = {
    entry: './src/index.js',
    resolve: {
        extensions: ['', '.js']
    },
    output: {
        path: path.resolve('../', 'public'),
        filename: 'app.bundle.js'
    },
    
  module: {
        loaders: [
      {
        test: /\.(json|jsx)$/,
        exclude: /node_modules/,
        loader: 'json',
      },
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
         exclude: /node_modules/,
        query: {
                    presets: ['es2015', 'react', 'stage-2']
                },
                plugins: [
                        'transform-runtime',
                    ]
                
      },
      {
        test: /\.(?:png|jpg|gif|svg)$/,
        loader: 'url',
      },
      {
        test: /\.css/,
        loader: 'style!css?localIdentName=[local]-[hash:base64:5]',
      },
      {
        test: /\.less/,
        loader: 'style!css?modules&localIdentName=[local]-[hash:base64:5]!less',
      },
    ]
    },
    plugins: [
   new webpack.DefinePlugin({
      'process.env.REACT_APP_AUTH0_CLIENT_ID': JSON.stringify(process.env.REACT_APP_AUTH0_CLIENT_ID),
        'process.env.REACT_APP_AUTH0_DOMAIN' : JSON.stringify(process.env.REACT_APP_AUTH0_DOMAIN)
      }
    ),
    new webpack.HotModuleReplacementPlugin()
   
  ],
  
    stats: {
        colors: true
    },
    devtool: 'source-map'
};