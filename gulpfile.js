var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var $ = require('gulp-load-plugins')();

gulp.task('lint', function() {
  return gulp.src(['app/**/*.js', 'gulpfile.js'])
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('jshint-stylish'));
});

// Static Server + watching files
gulp.task('serve', ['lint'], function() {
  browserSync.init({
    browser: ['firefox'],
    server: '.',
    port: '3000'
  });

  gulp.watch(['index.html', 'js/**/*.*']).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
