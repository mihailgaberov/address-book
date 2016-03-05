var abApp = angular.module('address-book', ['LocalStorageModule']);

abApp.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
	localStorageServiceProvider.setPrefix('address-book');
}]).run(['countryFactory']);


abApp.controller('MainController', ['$scope', 'CountryListFactory', function($scope, CountryListFactory) {

	$scope.greeting = 'Hola!';

	var countries = CountryListFactory.getCountryList();

	console.log(countries);

}]);
angular.module('address-book').factory('CountryListFactory', ['lodash', 'country-list' , function(lodash, countryListService) {
	'use strict';


	var getCountryList = function() {
		return [
			{ score: 10, name: 'Bandit Marie'},
			{ score: 9, name: 'Olivia Spencer'},
			{ score: 8, name: 'Jonathan Williams'},
			{ score: 7, name: 'Albert Moran'},
			{ score: 6, name: 'Chester Eskew'},
			{ score: 5, name: 'Donald Rich'},
			{ score: 4, name: 'James Paul'},
			{ score: 3, name: 'Anthony Drennen'},
			{ score: 2, name: 'Leslie Hairston'},
			{ score: 1, name: 'Darrell Blume'}
		];
	};



	return {
		getCountryList: getCountryList()
	};
}]);