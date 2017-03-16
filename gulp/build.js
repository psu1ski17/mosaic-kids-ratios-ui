const gulp = require('gulp');

gulp.task('build', ['copy', 'icons', 'webpack-prod']);
