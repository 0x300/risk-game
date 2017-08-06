const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const pump = require('pump');
const jasmine = require('gulp-jasmine');
const karma = require('karma').Server;

gulp.task('scss', function() {
    return gulp.src('css/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false,
            remove: true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});


// Concatinate js files into app.js to reduce number of http requests
gulp.task('js', function() {
    return gulp.src([
             './js/*.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./js/'))
});

gulp.task('serve', ['default'], function() {
    browserSync.init({
        proxy: "localhost:8080"
    });
});

gulp.task('test', ['default'], function(done){
    new karma({
        configFile: `${__dirname}/karma.conf.js`
    }, done).start();
});

gulp.task('build', ['scss', 'js'], function(cb) {
    // compress compiled css files
    gulp.src(['css/app.css'])
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false,
            remove: true
        }))
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest(function(file) {
            return file.base;
        }));

    // uglify js file without sourcemaps
    pump([
            gulp.src('js/bundle.js'),
            uglify(),
            gulp.dest('js')
        ], cb);
});

gulp.task('default', ['scss', 'js'], function() {
    gulp.watch(['css/scss/**/*.scss', '!css/app.css'], ['scss']);
    gulp.watch('js/spec/**/*.spec.js', ['test']);
    gulp.watch(['js/**/*.js', '!js/bundle.js'], ['js']);
    gulp.watch(['js/bundle.js']).on('change', browserSync.reload);
});