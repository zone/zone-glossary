'use strict';

var angular = require('angular');

module.exports = function($scope, $http, $window, filterFilter) {
	var loader = document.querySelector('.app__loader');

	//variables for debouncing history saves of search input
	var typingTimer;               //timer identifier
	var doneTypingInterval = 500;  //time in ms, 5 second for example

	// Pagination
	$scope.currentPage = 1;
	$scope.entryLimit = 12;
	$scope.search = {};
	$scope.entries = [];
	$scope.tags = [];
	$scope.oldTime = 0;

	$http.get('data.json').success(function(data) {
		loader.style.display = 'none';

		var pushSearchState = function() {
			history.pushState($scope.search, '');
		};

		pushSearchState();
		
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

		//on keyup, start the countdown
		document.querySelector('[data-ng-model="search.Term"]').addEventListener('keyup', function(){
		    clearTimeout(typingTimer);
		    if (document.querySelector('[data-ng-model="search.Term"]').value) {
		    	typingTimer = setTimeout(pushSearchState, doneTypingInterval);
		    }
		});

		document.querySelector('[data-ng-model="search.Tags"]').addEventListener('change', function(){
			pushSearchState();
		});

		//Move the scope back to the last state
		//when user clicks back
		window.addEventListener('popstate', function() {
			$scope.$apply(function(){
				$scope.search = history.state;
			});
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