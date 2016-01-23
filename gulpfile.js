var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');

// Static Server + watching files
gulp.task('serve', function() {
  browserSync.init({
    browser: ['firefox'],
    server: '.',
    port: '3000'
  });

  gulp.watch(['index.html', 'js/**/*.*']).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
