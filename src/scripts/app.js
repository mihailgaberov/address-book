var abApp = angular.module('address-book', ['LocalStorageModule']);

abApp.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
	localStorageServiceProvider.setPrefix('address-book');
}]);

abApp.run(['CountryListFactory', function(CountryListFactory){
	// Get the counties data
	var cl = require('country-list')();
	//CountryListFactory.setCountryList(cl.getData());
	CountryListFactory.setCountryList(cl);
}]);
