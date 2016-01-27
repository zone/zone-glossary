'use strict';

var config    = require('../config');
var gulp      = require('gulp');
var join      = require('path').join;
var modernizr = require('gulp-modernizr');
var uglify    = require('gulp-uglify');

module.exports = function() {

    if (config.production) {
        return gulp.src([
                join(config.styles.dist, '**', '*.css'),
                join(config.scripts.dist, '**', '*.js'),
                '!' + join(config.scripts.dist, 'modernizr.js') // Just incase
            ])
            .pipe(modernizr())
            .pipe(uglify())
            .pipe(gulp.dest(config.scripts.dist));
    }
    else {
        return gulp.src(join(config.scripts.src, 'modernizr.js'))
            .pipe(gulp.dest(config.scripts.dist));
    }

};
