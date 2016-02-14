var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var glob = require('glob');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var config = {
    prod: !!gutil.env.production
};

gulp.task('browserify', function() {
    var files = glob.sync('src/js/**/*.js');
    return browserify({
            entries: files,
            insertGlobals: true
        })
        .transform('babelify', {
            presets: ['react']
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('uglify', ['browserify'], function() {
    gulp.src('dist/js/bundle.js')
        .pipe(sourcemaps.init())
        .pipe(config.prod ? uglify({
            ignoreFiles: ['-min.js']
        }) : gutil.noop())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
    gulp.watch('src/js/**/*.js', ['build']);
});

gulp.task('build', ['browserify', 'uglify']);
gulp.task('default', ['build', 'watch']);
