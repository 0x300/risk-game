const gulp = require('gulp')
const mocha = require('gulp-mocha')

gulp.task('test', function(done){
    gulp.src('spec/**/*.spec.js')
        .pipe(mocha())
})

gulp.task('default', function() {
    gulp.watch('spec/**/*.spec.js', ['test'])
})