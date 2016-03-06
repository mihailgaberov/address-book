var abApp = angular.module('address-book', ['LocalStorageModule']);

abApp.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
	localStorageServiceProvider.setPrefix('address-book');
}]);

abApp.run(['CountryListFactory', function(CountryListFactory){
	// Get the counties data
	var cl = require('country-list')();
	CountryListFactory.setCountryList(cl.getData());
}]);

angular.module('address-book').factory('CountryListFactory', [function() {
	'use strict';

	var arrCountries = [];

	var setCountryList = function(countries) {
		arrCountries = countries;
	};

	var getCountryList = function() {
		return arrCountries;
	};

	return {
		getCountryList: getCountryList,
		setCountryList: setCountryList
	};
}]);
angular.module('address-book').controller('FormController', ['$scope', 'CountryListFactory', function($scope, CountryListFactory) {

	$scope.countriesData = CountryListFactory.getCountryList();

	}])
	.directive('form', function() {
		return {
			restrict: 'E',
			scope: {
				countries: "="
			},
			templateUrl: 'views/form/form.html'
		};
	});
angular.module('address-book').controller('ResultsController', ['$scope', function($scope) {

	}])
	.directive('results', function() {
		return {
			restrict: 'E',
			scope: {},
			templateUrl: 'views/results/results.html'
		};
	});