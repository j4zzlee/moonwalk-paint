var webpack           = require('webpack');
var path              = require('path');
var fs                = require('fs');
var util              = require('util');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var nconf             = require('nconf');
nconf.use('memory');
nconf.argv();
nconf.env();
//var CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * Load nodejs environments from .env file
 */


var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = function (options) {
    var babelQuery = {
        cacheDirectory: true,
        presets       : ['es2015', 'stage-0'],
        plugins       : [
            'transform-runtime'
        ]
    };

    var loaders = [
        {
            test   : /\.js$/,
            exclude: /node_modules/,
            loader : 'babel',
            query  : babelQuery
        },
        {
            test  : /route-recognizer[\\\/]/,
            loader: 'babel-loader'
        },
        {
            test  : /\.json$/,
            loader: 'json'
        }
    ];

    var output = {
        path             : path.join(__dirname, "build"),
        filename         : "[name].js" + (options.longTermCaching ? "?[chunkhash]" : ""),
        chunkFilename    : "[name].js" + (options.longTermCaching ? "?[chunkhash]" : ""),
        sourceMapFilename: "debugging/[file].map",
        pathinfo         : options.debug
    };

    var plugins = [
        new webpack.optimize.CommonsChunkPlugin({
            name     : "main",
            async    : "async-deps",
            minChunks: 2
        }),
        new webpack.IgnorePlugin(/\.(css|less)$/),
        new webpack.IgnorePlugin(/vertx/),
    ];

    if (options.minimize) {
        plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: false
            }),
            // new webpack.DefinePlugin({
            //     "process.env": {
            //         NODE_ENV: 'development' || 'production'
            //     }
            // }),
            new webpack.NoErrorsPlugin()
        );
    }

    return {
        entry    : {
            main: './index.js'
        },
        target   : 'node',
        output   : output,
        externals: nodeModules,
        plugins  : plugins,
        module   : {
            loaders: loaders
        },
        resolve: {
            alias: {
                jquery: path.resolve(__dirname, 'node_modules', 'jquery', 'dist', 'jquery.js')
            }
        },
        devtool  : options.devtool || 'sourcemap'
    }
};