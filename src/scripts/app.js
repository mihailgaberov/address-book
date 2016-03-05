var abApp = angular.module('address-book', ['LocalStorageModule']);

abApp.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
	localStorageServiceProvider.setPrefix('address-book');
}]).run(['countryFactory']);


abApp.controller('MainController', ['$scope', 'CountryListFactory', function($scope, CountryListFactory) {

	var countries = CountryListFactory.getCountryList();

	console.log(countries);

}]);