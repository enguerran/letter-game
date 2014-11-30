'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');

var livereload = require('gulp-livereload');
var connect = require('connect');

var del = require('del');
var rename = require('gulp-rename');
var browserify = require('browserify');
var watchify = require('watchify');
var es6ify = require('es6ify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');


/** Config variables */
var serverPort = 8888;
var lrPort = 35731;


/** File paths */
var dist = 'build';
var src = 'src';

var htmlFiles = src + '/**/*.html';
var buildPath = dist;

var cssFiles = src + '/**/*.css';

var jsxFiles = src + '/jsx/**/*.jsx';

var vendorFiles = [
    // 'bower_components/react/react-with-addons.js',
    'node_modules/es6ify/node_modules/traceur/bin/traceur-runtime.js'];
var vendorBuild = dist + '/vendor';
var requireFiles = './node_modules/react/react.js';


gulp.task('clean', function(done) {
    del([dist], done);
});


gulp.task('vendor', function () {
    return gulp.src(vendorFiles).
        pipe(gulp.dest(vendorBuild));
});


gulp.task('html', function () {
    return gulp.src(htmlFiles).
        pipe(gulp.dest(buildPath));
});


gulp.task('css', function () {
    return gulp.src(cssFiles).
        pipe(gulp.dest(buildPath));
});


function compileScripts(watch) {
    gutil.log('Starting browserify');

    var entryFile = './' + src + '/jsx/app.jsx';
    es6ify.traceurOverrides = {experimental: true};

    var bundler;
    if (watch) {
        bundler = watchify(entryFile);
    } else {
        bundler = browserify(entryFile);
    }

    bundler.require(requireFiles);
    bundler.transform(reactify);
    bundler.transform(es6ify.configure(/.jsx/));

    var rebundle = function () {
        var stream = bundler.bundle({ debug: true});

        stream.on('error', function (err) { console.error(err) });
        stream = stream.pipe(source(entryFile));
        stream.pipe(rename('app.js'));

        stream.pipe(gulp.dest( dist + '/bundle'));
    }

    bundler.on('update', rebundle);
    return rebundle();
}


gulp.task('server', function (next) {
    var server = connect();
    gutil.log(gutil.colors.yellow('Http server listening on: ' + serverPort));
    server.use(connect.static(dist)).listen(serverPort, next);
});


function initWatch(files, task) {
    if (typeof task === "string") {
        gulp.start(task);
        gulp.watch(files, [task]);
    } else {
        task.map(function (t) { gulp.start(t) });
        gulp.watch(files, task);
    }
}


/**
 * Run default task
 */
gulp.task('default', ['vendor', 'server'], function () {
    var lrServer = livereload(lrPort);
    var reloadPage = function (evt) {
        lrServer.changed(evt.path);
    };

    function initWatch(files, task) {
        gulp.start(task);
        gulp.watch(files, [task]);
    }

    compileScripts(true);
    initWatch(htmlFiles, 'html');
    initWatch(cssFiles, 'css');

    gulp.watch([dist + '/**/*'], reloadPage);
});
