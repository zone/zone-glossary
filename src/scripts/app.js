'use strict';

// Fire up angular
var angular = require('angular');
require('./libs/history');
require('./libs/ngLazyBind');
var app = angular.module('glossaryApp', ['decipher.history', 'lazyBind']);

// Load controllers
app.controller('EntriesCtrl', ['$scope', '$http', '$window', 'filterFilter', 'History', '$lazyBind', require('./controllers/entries')]);

// Load filters
app.filter('highlight', ['$sce', require('./filters/highlight')]);
app.filter('startFrom', require('./filters/startForm'));
