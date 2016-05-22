var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var babel = require("gulp-babel");
var del = require('del');

var paths = {
  scripts: ['./node_modules/bootstrap/dist/js/bootstrap.min.js', './node_modules/jquery/dist/jquery.min.js', './node_modules/tether/dist/js/tether.min.js'],
  images: './src/img/**/*',
  styles: ['./src/css/**/*', './node_modules/bootstrap/dist/css/*.css', './src/sass/**/*']
};

gulp.task('clean', function() {
  return del(['client/_build']);
});

gulp.task('scripts', ['clean'], function() {
    return gulp.src(paths.scripts)
       .pipe(sourcemaps.init())
       .pipe(babel())
       .pipe(sourcemaps.write())
       .pipe(gulp.dest('client/_build/js'));
});

gulp.task('styles', ['clean'], function() {
	return gulp.src(paths.styles)
        .pipe(sass())
        .pipe(gulp.dest('client/_build/css'))
});

gulp.task('images', ['clean'], function() {
  return gulp.src(paths.images)
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('client/_build/img'));
});

gulp.task('watch', function() {
	gulp.watch(paths.scripts, ['scripts']);
	gulp.watch(paths.styles, ['styles']);
	gulp.watch(paths.images, ['images']);
});

gulp.task('default', ['watch', 'scripts', 'styles', 'images']);
