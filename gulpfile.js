const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const autoPrefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

// compile scss to css
function style() {
  return gulp.src('./scss/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(plumber({
    errorHandler: notify.onError(function(err) {
      return {
        title: 'Styles',
        message: err.message
      }
    })
  }))
  .pipe(sass({
    errorLogConsole: true,
    outputStyle: 'compressed'
  }))
  .pipe(autoPrefixer({
    browsers: ['last 6 versions'],
    cascade: false
  }))
  .pipe(rename({ suffix: '.min' }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./css'))
  .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './',
    }
  })
  gulp.watch('./scss/**/*.scss', style);
  gulp.watch('./*/*.html').on('change', browserSync.reload);
  gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;