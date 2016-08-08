'use strict';

//Main gulp pointer
var gulp = require('gulp');

//Plugins
var cached = require('gulp-cached');
var copy = require('gulp-copy');
var watch = require('gulp-watch');
var less = require('gulp-less');
var cssmin = require('gulp-minify-css');
var rename = require('gulp-rename');

//LocalWebserver
var webserver = require('gulp-webserver'); 
//var webserver = require('gulp-connect');

//File Paths
var less_files = ['build/css/**.less', 'build/**.less', 'build/themes/**.less', '!build/themes/helpers.less'];
var html_files = ['build/**/**.html', 'build/**/**.cfm'];
var js_files   = ['build/js/**.js'];

gulp.task('bootstrap', function () {
    return gulp.src(['build/css/bootstrap.min.css'])
            .pipe(cached('bootstrap'))
            .pipe(copy('dist', { prefix: 1 }))
            .on('error', outputError);
});

gulp.task('copy-html', function () {
    return gulp.src(html_files)
            .pipe(cached('copy'))
            .pipe(copy('dist', { prefix: 1 }))
            .on('error', outputError);
});

gulp.task('scripts', function () {
    return gulp.src(js_files)
            //.pipe(cached('scripts'))
            .pipe(copy('dist', { prefix: 1 }))
            .on('error', outputError);
});

gulp.task('less', function () {
    return gulp.src(less_files, { base: 'build' })
            .pipe(cached('less'))
            .pipe(less())
            .on('error', outputError)
            .pipe(gulp.dest('dist'));
});

gulp.task('cssmin', function () {
    return gulp.src(['dist/**.css', 'dist/themes/**.css', '!dist/*.min.css', '!dist/themes/*.min.css'])
            .pipe(cached('cssmin'))
            .pipe(cssmin())
            .pipe(rename({ suffix: '.min' }))
            .on('error', outputError)
            .pipe(gulp.dest(function(file) {
                return file.base;
            }));
    /*
    return gulp.src(['dist/**.css','dist/css/ ** / **.css', '!dist/css/ **.min.css'], { base: 'dist' })
            .pipe(cached('cssmin'))
            .pipe(cssmin())
            .pipe(rename({ suffix: '.min'}))
            .on('error', outputError)
            .pipe(gulp.dest('dist'));
            */
});

gulp.task('watch', function () {    
    gulp.watch(less_files, ['less', 'cssmin']);
    gulp.watch(html_files, ['copy-html']);
    gulp.watch(js_files, ['scripts']);
});
/*
gulp.task('webserver', function () {
    gulp.src('dist')
        .pipe(webserver({
            livereload: true,
            port: 8080,
            open: true
        }))
});

gulp.task('webserver', function () {
    webserver.server({
        root: 'public',
        port: 3000,
        host: '192.168.1.200',
        fallback: 'index.html',
        livereload: true
    });
});*/


gulp.task('default', ['copy-html', 'scripts', 'bootstrap', 'less', 'cssmin', 'watch']);

function outputError (error) {
    console.log(error.toString());

    this.emit('end');
}
