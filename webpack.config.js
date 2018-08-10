var path              = require('path');
var webpack           = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: path.resolve('client'),
    entry: {
        env: ['./_env/_env.dev.js'],
        app: ['babel-polyfill', './app/app.module.js']
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.js', '.html', '.css', '.less']
    },
    eslint: {
        configFile: '.eslintrc'
    },
    module: {
        loaders: [
            { test: /\.json$/, exclude: /node_modules/, loader: 'raw' },
            { test: /\.js$/,   exclude: /node_modules/, loaders: ['ng-annotate', 'babel-loader?presets[]=es2015'] },
            { test: /\.html/,  exclude: /node_modules/, loader: 'raw' }, 
            { test: /\.css$/,  loader: ExtractTextPlugin.extract("style-loader", "css-loader") }, 
            { test: /\.less$/, loader: ExtractTextPlugin.extract(['css', 'less']) },
            { test: /\.txt$/,  loader: 'raw-loader' }, 
            { test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/, loader: 'file-loader?name=assets/[hash:8].[ext]' }, 
            { test: /\.(eot|ttf|wav|mp3)$/, loader: 'file-loader?name=assets/[hash:8].[ext]' }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: 'body',
            hash: true
        }),
        new ExtractTextPlugin('[name].styles.css', { allChunks: true }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {                
                return module.resource && module.resource.indexOf(path.resolve('node_modules')) > -1;
            }
        })
    ]
};