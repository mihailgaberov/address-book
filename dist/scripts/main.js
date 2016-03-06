var abApp = angular.module('address-book', ['LocalStorageModule']);

abApp.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
	localStorageServiceProvider.setPrefix('address-book');
}]);


abApp.controller('MainController', ['$scope', function($scope) {

	//var countries = CountryListFactory.getCountryList();

	console.log(countries);

}]);
angular.module('address-book').factory('CountryListFactory', ['country-list', function(countryListService) {
	'use strict';


	var getCountryList = function() {
		return [
			{ code: 'bg', name: 'Bulgaria'},
			{ code: 'sw', name: 'Sweden'}
		];
	};



	return {
		getCountryList: getCountryList()
	};
}]);
abApp.controller('FormController', ['$scope', function($scope) {
		$scope.customer = {

		};
	}])
	.directive('form', function() {
		return {
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