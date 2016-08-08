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

//File Paths

//site_files only used for the build task.
var site_files = ['build/**/**.*', '!build/**/helpers.less'];

//These are used for all the other tasks.
var html_files = ['build/**/**.html', 'build/**/**.cfm', 'build/**.cfm'];
var less_files = ['build/css/**.less', 'build/**.less', 'build/themes/**.less', '!build/themes/helpers.less'];
var js_files   = ['build/js/**.js'];
var image_files = ['build/img/**/**.{jpg,gif,png,svg}', 'build/img/**.{jpg,gif,png,svg}'];

//Copy all site files over into the /dist/ directory.
gulp.task('copy-build', function() {
    return gulp.src(site_files)
            .pipe(cached('build'))
            .pipe(copy('dist', { prefix: 1 }))
            .on('error', outputError);
});

//Copy over bootstrap.min.css file (enforcing standards)
gulp.task('bootstrap', function () {
    return gulp.src(['build/css/bootstrap.min.css'])
            .pipe(cached('bootstrap'))
            .pipe(copy('dist', { prefix: 1 }))
            .on('error', outputError);
});

//Copy over /img/ directory. 
gulp.task('copy-img', function () {
    return gulp.src(image_files)
            .pipe(cached('copy-img'))
            .pipe(copy('dist', { prefix: 1 }))
            .on('error', outputError);
});

//Copy over any .html/.cfm type file over. 
gulp.task('copy-html', function () {
    return gulp.src(html_files)
            .pipe(cached('copy'))
            .pipe(copy('dist', { prefix: 1 }))
            .on('error', outputError);
});

//Copy scripts/js over to /dist/
gulp.task('scripts', function () {
    return gulp.src(js_files)
            .pipe(cached('scripts'))
            .pipe(copy('dist', { prefix: 1 }))
            .on('error', outputError);
});

//Process .LESS files into .css 
gulp.task('less', function () {
    return gulp.src(less_files, { base: 'build' })
            .pipe(cached('less'))
            .pipe(less())
            .on('error', outputError)
            .pipe(gulp.dest('dist'));
});

//Process .CSS files in /dist/ into .min.css
gulp.task('cssmin', function () {
    return gulp.src(['dist/**.css', 'dist/themes/**.css', '!dist/*.min.css', '!dist/themes/*.min.css'])            
            .pipe(cssmin())
            .pipe(rename({ suffix: '.min' }))
            .on('error', outputError)
            .pipe(gulp.dest(function(file) {
                return file.base;
            }));   
});

//Current watch task.
gulp.task('watch', function () {    
    gulp.watch(less_files, ['less', 'cssmin']);
    gulp.watch(html_files, ['copy-html']);
    gulp.watch(js_files, ['scripts']);
    gulp.watch(image_files, ['copy-img']);
});

//Current build task.
gulp.task('build', ['copy-build', 'scripts', 'less', 'cssmin']);

gulp.task('default', ['watch']);

function outputError (error) {
    console.log(error.toString());

    this.emit('end');
}
