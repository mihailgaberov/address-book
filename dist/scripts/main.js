var abApp = angular.module('address-book', ['LocalStorageModule']);

abApp.config(['localStorageServiceProvider', function (localStorageServiceProvider) {

	localStorageServiceProvider.setPrefix('address-book');
}]);

angular.module('address-book').factory('CountryListFactory', [function() {
	'use strict';

	var getCountryList = function() {
		return [
			{ code: 'bg', name: 'Bulgaria'},
			{ code: 'sw', name: 'Sweden'}
		];
	};



	return {
		getCountryList: getCountryList
	};
}]);
abApp.controller('FormController', ['$scope', 'CountryListFactory', function($scope, CountryListFactory) {

	}])
	.directive('form', function() {
		return {
			scope: {},
			templateUrl: 'views/form/form.html'
		};
	});
abApp.controller('ResultsController', ['$scope', function($scope) {
		$scope.customer = {

		};
	}])
	.directive('results', function() {
		return {
			templateUrl: 'views/results/results.html'
		};
	});