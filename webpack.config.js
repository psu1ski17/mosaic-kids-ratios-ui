'use strict';

/* eslint-env node */

const path = require("path"),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

// I don't like the default garbled names. Configuring it this way of course
// requires files to have globally unique names
const fileLoaderOptions = {
    name: '[name].[ext]'
};

module.exports = {
    // This is the main file that should include all other JS files
    entry: './app/main',
    target: "web",
    cache: true,
    output: {
        path: path.join(__dirname, "/target/dist"),
        // If you want to generate a filename with a hash of the content (for
        // cache-busting) filename: "main-[hash].js",
        filename: "bundle.js",
        chunkFilename: "webpack.[hash].js"
    },
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                loader: "eslint-loader",
                exclude: /node_modules|gulp|dist|vendor/
            }, {
                //process source maps from typescript output
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ],
        loaders: [
            //Babel is a transplier that can be used to convert es6 int es5
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                include: [path.join(__dirname, 'app')],
                exclude: /node_modules|gulp|dist|vendor/
            }, {
                test: /\.s?css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
            }, {
                include: /\.json$/,
                loaders: ["json-loader"]
            }, {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff"
            }, {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            }
        ],
        noParse: /\.min\.js/
    },
    resolve: {
        extensions: [
            '', '.js', '.jsx', '.json'
        ],
        alias: {
            neon$: 'neon-nodeps'
        },
        modulesDirectories: ['node_modules', 'vendor']
    },
    plugins: [
        new webpack.DefinePlugin({

            //react needs this in order to minify correctly
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV || "development")
            }
        }),
        new ExtractTextPlugin('style.css'),

        //don't include alternative moment.js locales
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    devtool: 'source-map',
    devServer: {
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        /* Send API requests on localhost to API server get around CORS */
        proxy: {
            '/greybox': {
                target: 'https://localhost:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                },
                logLevel: "debug"
            }
        }

    }
};
