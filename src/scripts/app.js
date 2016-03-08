var abApp = angular.module('address-book', ['LocalStorageModule', 'ngRoute']);

abApp.config(['localStorageServiceProvider', '$routeProvider', function (localStorageServiceProvider, $routeProvider) {
	localStorageServiceProvider.setPrefix('address-book');

	$routeProvider
		.when('/', {
			templateUrl: 'views/results/results.html',
			controller: 'ResultsController',
			resolve: {
				resolveData: ['ResultEntryFactory', function (ResultEntryFactory) {
					return ResultEntryFactory.getAllEntries();
				}]
			}
		})
		.otherwise({redirectTo: '/'});

}]).constant('_', window._)
	.run(['CountryListFactory', function (CountryListFactory) {
		// Get the counties data
		var cl = require('country-list')();
		CountryListFactory.setCountryList(cl);
	}]);
