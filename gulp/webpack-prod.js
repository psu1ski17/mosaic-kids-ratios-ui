const gulp = require('gulp'),
    gutil = require('gulp-util'),
    webpack = require("webpack"),
    webpackConfig = require("../webpack.config.js");

gulp.task("webpack-prod", function (callback) {
    const prodConfig = Object.create(webpackConfig);
    prodConfig.plugins = prodConfig.plugins.concat(
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );

    // run webpack
    webpack(prodConfig, function (err, stats) {
        if(err) throw new gutil.PluginError("webpack-prod", err);
        gutil.log("[webpack-prod]", stats.toString({
            colors: true
        }));
        callback();
    });

});
