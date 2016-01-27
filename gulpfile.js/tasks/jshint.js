'use strict';

var config = require('../config');
var gulp   = require('gulp');
var join   = require('path').join;
var jshint = require('gulp-jshint');

module.exports = function() {

    return gulp.src([
            join('gulpfile.js', '**', '*.js'),
            join(config.scripts.src, '**', '*.js'),
            '!' + join(config.scripts.src, 'libs', '*.js'),
            '!' + join(config.scripts.src, 'plugins', '*.js'),
            '!' + join(config.scripts.src, '*.min.js'),
            '!' + join(config.scripts.src, 'modernizr.js')
        ])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));

};
