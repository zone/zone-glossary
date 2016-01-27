'use strict';

var config  = require('./config');
var gulp    = require('gulp');
var util    = require('gulp-util');

// What mode?
util.log('Running in', (config.production ? util.colors.red.bold('production') : util.colors.green.bold('development')), 'mode');

// Load tasks
var clean       = require('./tasks/clean');
var jscs        = require('./tasks/jscs');
var jshint      = require('./tasks/jshint');
var modernizr   = require('./tasks/modernizr');
var scripts     = require('./tasks/scripts');
var styles      = require('./tasks/styles');
var watch       = require('./tasks/watch');

// Define tasks and dependencies
gulp.task('clean:scripts', clean.scripts);
gulp.task('clean:styles', clean.styles);
gulp.task('default', (config.production ? ['modernizr', 'scripts', 'styles'] : ['modernizr', 'scripts', 'styles', 'watch']));
gulp.task('jscs', jscs);
gulp.task('jshint', jshint);
gulp.task('modernizr', ['scripts', 'styles'], modernizr);
gulp.task('scripts', ['clean:scripts', 'jshint', 'jscs'], scripts);
gulp.task('styles', ['clean:styles'], styles);
gulp.task('watch', ['modernizr', 'scripts', 'styles'], watch);
