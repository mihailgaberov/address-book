var abApp = angular.module('address-book', ['LocalStorageModule']);

abApp.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
	localStorageServiceProvider.setPrefix('address-book');
}]);


abApp.controller('MainController', ['$scope', function($scope) {

	//var countries = CountryListFactory.getCountryList();

	console.log(countries);

}]);