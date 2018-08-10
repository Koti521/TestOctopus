var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config');

config.output = {
    path: path.resolve('dev_build'),
    filename: '[name].bundle.js'
};

config.devServer = {
    outputPath: path.resolve('dev_build')
  }

module.exports = config;