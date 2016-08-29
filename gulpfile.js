'use strict';

//Main gulp pointer
var gulp = require('gulp');

//watch
var newer = require('gulp-newer');
var del = require('del');
var path = require('path');

//Plugins
var less = require('gulp-less');
var cssmin = require('gulp-minify-css');
var rename = require('gulp-rename');

var paths = {
    assets:  'build/assets/**',
    algolia: 'build/src/**',
    fonts:   'build/fonts/**',
    scripts: 'build/js/**.js',
    images:  ['build/img/**.{jpg,gif,svg,png}', 'build/img/**/**.{jpg,gif,svg,png}', '!build/img/**.db', '!build/img/**/**.db'],
    cfm:     'build/**.cfm', 
    less:    ['build/**.less', 'build/themes/**.less', '!build/**/helpers.less'],
    css:     ['build/css/**.css', '!build/css/**.less']  
}

var base = { base: 'build' };
var dest = 'dist';

gulp.task('cfm', function () {
    return gulp.src(paths.cfm, base)
               .pipe(newer(dest))
               .pipe(gulp.dest(dest))
               .on('error', outputError);
});

gulp.task('images', function (done) {
    return gulp.src(paths.images, base)
               .pipe(newer(dest))
               .pipe(gulp.dest(dest))
               .on('error', outputError);
});

gulp.task('scripts', function () {
    return gulp.src(paths.scripts, base)
               .pipe(newer(dest))
               .pipe(gulp.dest(dest))
               .on('error', outputError);
});

gulp.task('css', function () {
    return gulp.src(paths.css, base)
               .pipe(newer(dest))
               .pipe(gulp.dest(dest))
               .on('error', outputError);
});

gulp.task('less', function () {
    return gulp.src(paths.less, base)
               .pipe(newer(dest))
               .pipe(less())               
               .pipe(gulp.dest(dest))
               .on('error', outputError)
               .pipe(cssmin())               
               .pipe(rename( { suffix: '.min' }))
               .pipe(gulp.dest(dest))
               .on('error', outputError);
});

//Process external assets task. 
//Basically downloaded plugins / frameworks should be processed here
//In this case I'm processing an algolia folder as well
gulp.task('external', function () {
    return gulp.src([paths.assets, paths.algolia, paths.fonts], base)
               .pipe(newer(dest))
               .pipe(gulp.dest(dest))
               .on('error', outputError);
});

//Watch task
gulp.task('watch', function () {
    
    //Watchers for basic assets. This will sync the build folder 
    //with the dist folder. 
    var watchHtml    = gulp.watch(paths.cfm, ['cfm']);
    var watchImages  = gulp.watch(paths.images, ['images']);    
    var watchCss     = gulp.watch(paths.css, ['css']);    
    var watchScripts = gulp.watch(paths.scripts, ['scripts']);
    var watchExt     = gulp.watch([paths.assets, paths.algolia, paths.fonts], ['external']);

    //@TODO: Less file is a little more complex, and doesn't do 
    //       a simple glob > src > dest. 
    gulp.watch(paths.less, ['less']);           

    
    watchExt.on('change', function (ev) {
        if(ev.type === 'deleted') {
            del(path.relative('./', ev.path).replace('build', 'dist'));
        }
    }).on('error', outputError);    

    watchHtml.on('change', function (ev) {
        if(ev.type === 'deleted') {
            del(path.relative('./', ev.path).replace('build', 'dist'));
        }
    }).on('error', outputError);

    watchImages.on('change', function (ev) {
        if(ev.type === 'deleted') {
            del(path.relative('./', ev.path).replace('build', 'dist'));
        }
    }).on('error', outputError);

    watchCss.on('change', function (ev) {
        if(ev.type === 'deleted') {
            del(path.relative('./', ev.path).replace('build', 'dist'));
        }
    }).on('error', outputError);      

    watchScripts.on('change', function (ev) {
        if(ev.type === 'deleted') {
            del(path.relative('./', ev.path).replace('build', 'dist'));
        }
    }).on('error', outputError);
});

//Main gulp task definitions
gulp.task('build', ['external','cfm', 'images', 'css', 'scripts', 'less']);
gulp.task('dev', ['watch']);

gulp.task('default', ['build', 'watch']);

//Output Error catch
function outputError (error) {
    console.log(error.toString());
    this.emit('end');
}
