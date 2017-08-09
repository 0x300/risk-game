const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const pump = require('pump');

gulp.task('test', function(done){
    gulp.src('spec/**/*.spec.js')
        .pipe(jasmineNode())
        .on('error', handleJasmineError);
});

gulp.task('default', function() {
    gulp.watch('spec/**/*.spec.js', ['test']);
});

function handleJasmineError(error) {
    console.log(error);
}