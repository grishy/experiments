var gulp = require('gulp');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var stylus = require('gulp-stylus');
var jade = require('gulp-jade');
var nib = require('nib');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('script', function() {
    gulp.src('./src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./site/assets'));
});

gulp.task('style', function() {
    gulp.src('./src/css/main.styl')
        .pipe(stylus({
            'include css': true,
            // use: nib()
        }))
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./site/assets'));

});

gulp.task('jade', function() {
    var YOUR_LOCALS = {};

    gulp.src('./src/jade/*.jade')
        .pipe(jade({
            locals: YOUR_LOCALS,
            pretty: true
        }))
        .pipe(gulp.dest('./site'));
});

// connect
gulp.task('connect', function() {
    connect.server({
        port: 8888,
        root: 'site',
        livereload: true
    });
});

gulp.task('html', function() {
    gulp.src('./site/**/*')
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(['./site/**/*'], ['html']);
});
// end connect

gulp.task('default', ['connect', 'watch'], function() {
    gulp.run('script', 'style', 'jade');

    gulp.watch("./src/js/**/*", function(event) {
        gulp.run('script');
    });

    
    gulp.watch("./src/jade/**/*", function(event) {
        gulp.run('jade');
    });

    gulp.watch("./src/css/**/*", function(event) {
        gulp.run('style');
    });
});