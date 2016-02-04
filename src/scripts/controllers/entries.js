'use strict';

var angular = require('angular');

module.exports = function($scope, $http, $window, filterFilter, History, $lazyBind) {

	var loader = document.querySelector('.app__loader');

	// Pagination
	$scope.currentPage = 1;
	$scope.entryLimit = 12;
	$scope.search = {};
	$scope.entries = [];
	$scope.tags = [];
	//Lazy bind
	$scope.cacheTime = 5000;
	$scope.lazyFn = $lazyBind($scope, $scope.cacheTime);

	$http.get('data.json').success(function(data) {
		loader.style.display = 'none';

		data.forEach(function(item) {
			// Push unique tags
			item.Tags.forEach(function(tag) {
				if ($scope.tags.indexOf(tag) === -1) {
					$scope.tags.push(tag);
				}
			});

			// Add item
			$scope.entries.push(item);
		});

		// Sort
		$scope.tags = $scope.tags.sort();
		$scope.totalItems = $scope.entries.length;
		$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

		// $watch search to update pagination
		$scope.$watch('search', function(newVal) {
			$scope.filtered = filterFilter($scope.filteredEntries, newVal);
			$scope.totalItems = $scope.filtered.length;
			$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
			$scope.currentPage = 1;
		}, true);

		$scope.loadSearchTerm = function(event) {
			event.preventDefault();
			var thisHashArr = event.target.hash.split('#');
			var thisHash = thisHashArr[1];
			$scope.search.Term = thisHash;
		};

		History.watch('search', $scope, 'Search Changed', {timeout: 1000})
			.addChangeHandler('myChangeHandler', function() {
				history.pushState(null, 'search update', '');
				console.log('search got changed');
			})
			.addUndoHandler('myUndoHandler', function() {
				console.log('undid');
			});
		window.addEventListener('popstate', function() {
			console.log('back');
			History.undo('search', $scope);
		});

	});

	$scope.visit = function($event, path) {
		$event.preventDefault();
		$window.open(path, '_blank');
	};

	$scope.resetFilters = function() {
		// needs to be a function or it won't trigger a $watch
		$scope.search = {};
	};

	$scope.exactOrEmpty = function(actual, expected) {
		if (!expected) {
			return true;
		}
		return angular.equals(expected, actual);
	};

};