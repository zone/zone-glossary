'use strict';

var browserify  = require('browserify');
var config      = require('../config');
var join        = require('path').join;
var watchify    = require('watchify');

var bundle = browserify({
    entries: join(config.scripts.src, config.browserify.entry),
    debug: !config.production,
    cache: {},
    packageCache: {},
    fullPaths: true
});

if (!config.production) {
    bundle = watchify(bundle);
}

module.exports = bundle;
