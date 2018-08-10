var webpack           = require('webpack');
var path              = require('path');
var config            = require('./webpack.config');

config.entry.env = ['./_env/_env.prod.js'];

config.output = {
    path: path.resolve('prod_build'),
    filename: '[name].bundle.min.js'
};

config.devtool = 'nosources-source-map';

config.devServer = {
    outputPath: path.resolve('prod_build')
}

config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_console: true,
            unsafe: true
        }
    })
);

module.exports = config;
