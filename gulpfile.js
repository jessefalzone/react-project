var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var glob = require('glob');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var clean = require('gulp-rimraf');

var config = {
    prod: !!gutil.env.production
};

var jsGlob = './src/js/**/*.jsx';
var cssGlob = './src/css/**/*.scss';

gulp.task('browserify', function() {
    console.log('Bundling packages...');
    var files = glob.sync(jsGlob);
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
    console.log('Uglifying js....');
    return gulp.src('dist/js/bundle.js')
        .pipe(sourcemaps.init())
        .pipe(uglify({
            ignoreFiles: ['-min.js']
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('sass', ['clean'], function() {
    console.log('Compiling Sass...');
    return gulp.src(cssGlob)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('clean', [], function() {
    console.log("Cleaning dist/css folder...");
    return gulp.src("./dist/css/*", { read: false }).pipe(clean());
});

gulp.task('watch', function() {
    gulp.watch(jsGlob, ['build']);
    gulp.watch(cssGlob, ['sass']);
});

gulp.task('build', ['browserify', 'sass']);
gulp.task('prod', ['build', 'uglify']);
gulp.task('default', ['build']);
