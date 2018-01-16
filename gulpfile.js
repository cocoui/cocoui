'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var clean = require('gulp-clean');
var minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css');

gulp.task('clean', function () {
  return gulp.src('dist', { read: false })
    .pipe(clean());
});

gulp.task('sass', function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCss())
    .pipe(gulp.dest('./dist'));
});

gulp.task('css:demo', function () {
  return gulp.src('./dist/**/*.css')
    .pipe(gulp.dest('./demo/css'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch('./scss/**/*.scss', ['sass']);
  gulp.watch('./dist/**/*.css', ['css:demo']);
  gulp.watch('./demo/**/*.html', connect.reload());
});

gulp.task('serve', function () {
  connect.server({
    root: './demo',
    livereload: true
  });
});

gulp.task('default', ['serve', 'sass', 'css:demo', 'watch']);
