var path = require('path');

module.exports = function(config) {
  
    config.set({
    
        basePath: '',
        
        frameworks: ['jasmine', 'sinon', 'chai', 'sinon-chai'],
        
        files: [{ pattern: 'spec.bundle.js', watched: false }],
        
        exclude: [],

        plugins: [
            require("karma-jasmine"),
            require("karma-chrome-launcher"),
            require("karma-sourcemap-loader"),
            require("karma-webpack"),
            require("karma-coverage"),
            require("karma-sinon"),
            require("karma-chai"),
            require("karma-sinon-chai"),
            require("karma-spec-reporter")
        ],

        preprocessors: { 'spec.bundle.js': ['webpack', 'sourcemap'] },

        webpack: {
            devtool: 'inline-source-map',
            module: {
                preLoaders: [
                    {
                        test: /\.js$/,
                        include: path.resolve('client/app/'),
                        exclude: [/\.spec\.js$/, /node_modules/],
                        loader: 'isparta-instrumenter-loader'
                    }
                ],
                loaders: [
                    { test: /\.json$/, exclude: /node_modules/, loader: 'raw' },
                    { test: /\.js$/,   exclude: /node_modules/, loaders: ['ng-annotate', 'babel-loader?presets[]=es2015'] },
                    { test: /\.html/,  exclude: /node_modules/, loader: 'raw' },
                    { test: /\.css$/,  loader: 'style-loader!css-loader' },
                    { test: /\.less$/, loader: 'style!css!less' },
                    { test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/, loader: 'file-loader' }, 
                    { test: /\.(eot|ttf|wav|mp3)$/, loader: 'file-loader' }
                ]
            }
        },
        
        reporters: ['spec', 'coverage'],

        coverageReporter: {
            type : 'html',
            dir : 'coverage/'
        },
        
        port: 9876,
        
        colors: true,
        
        logLevel: config.LOG_INFO,
        
        autoWatch: true,
        
        browsers: ['Chrome'],
        
        singleRun: false,
        
        concurrency: Infinity
    
    })
  
};
