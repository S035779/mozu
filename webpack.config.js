const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app:      './main.js',
    common:   [
      'react',
      'react-dom',
      'react-router-dom',
      'ramda',
      'd3',
      './main.css'
    ]
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      options: {
        presets: [ 'react', [ 'env',{ modules: false } ] ]
      }},
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: [ 'css-loader', 'postcss-loader' ]
      })
    }]},
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    host: '0.0.0.0',
    port: 8080,
    watchContentBase: true,
    inline: true,
  },
  performance: {
    hints: "warning",
    maxAssetSize: 1280000,
    maxEntrypointSize: 1280000,
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.css') 
        || assetFilename.endsWith('.js');
    }},
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin({
      filename: 'common.css'
    }),
    new webpack.optimize.UglifyJsPlugin({
      warnings:  true
      , sourceMap: true
      , mangle:    true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name:       'common'
      , filename: 'common.js'
      , minChunk: Infinity
    })
  ]
};

module.exports = config;
