var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var $ = require('gulp-load-plugins')();

var lessFiles = ['less/*.less', 'js/app/**/*.less'];

gulp.task('lint', function() {
  return gulp.src(['app/**/*.js', 'gulpfile.js'])
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('jshint-stylish'));
});

// Static Server + watching files
gulp.task('serve', ['less', 'lint'], function() {
  browserSync.init({
    browser: ['firefox'],
    server: '.',
    port: '3000'
  });

  gulp.watch(lessFiles, ['less']);
  gulp.watch(['index.html', 'js/**/*.*']).on('change', browserSync.reload);
});

// Compile less into CSS & auto-inject into browsers
gulp.task('less', function() {
  return gulp.src(lessFiles)
    .pipe($.less())
    .pipe($.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
