'use strict';

var del = require('del');

module.exports = {
    scripts: function(cb) {
        return del('dist/scripts', cb);
    },
    styles: function(cb) {
        return del('dist/styles', cb);
    }
};
