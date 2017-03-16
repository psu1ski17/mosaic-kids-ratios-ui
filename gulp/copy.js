'use strict';

var gulp = require('gulp');
var inject = require('gulp-inject');
var merge = require('merge-stream');

var buildDir = 'target/dist';
var htmlPattern = 'app/index.html';
var configPattern = 'app/config.json';

function fileContents(filePath, file) {
    return file.contents.toString('utf-8');
}

gulp.task('copy', ['icons'], function () {
    var html = gulp.src(htmlPattern);
    var config = gulp.src(configPattern);
    //var css = gulp.src(cssPattern)
    //var icons = gulp.src('target/symbol/svg/sprite.symbol.svg');
    //var everythingElse = gulp.src([
    //   'app/**/*',
        //'!' + htmlPattern
//
//    ]);
//    var svgInjector = inject(icons, {
//        transform: fileContents,
//        starttag: '<!-- inject:svg -->'
//    });


    //var copyApp = everythingElse.pipe(gulp.dest(buildDir));

    //inject the icon SVG inline in each html page
    var copyHtml = html.pipe(gulp.dest(buildDir));
    var copyConfig = config.pipe(gulp.dest(buildDir));
    //return copyHtml;
    return merge(copyConfig, copyHtml);
});