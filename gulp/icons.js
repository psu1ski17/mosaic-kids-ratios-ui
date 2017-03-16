'use strict';

const gulp = require('gulp'),
    svgSprite = require('gulp-svg-sprite'),
    SRC_SVG = 'app/icons',
    svgConfig = {
        log: 'info',
        mode: {
            symbol: true
        },
        shape: {
            id: {
                generator: 'icon-%s'
            },
            transform: [] //svgo messes up stroke and fill
        },
        svg: {
            //remove XML preludes in order to make a file suitable for inlining
            xmlDeclaration: false,
            doctypeDeclaration: false,
            rootAttributes: {
                'class': 'icons-sprite'
            }
        }
    };

gulp.task('icons', function() {
    return gulp.src([SRC_SVG + '/*.svg'])
      .pipe(svgSprite(svgConfig))
      .pipe(gulp.dest('target'));
});
