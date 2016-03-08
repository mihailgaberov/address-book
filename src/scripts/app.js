/* Project architecture can be changed if the project grows - instead of using 'type' oriented
 * architecture, i.e. to have directories such as 'controllers', 'services' etc.,
 * we can use 'feature' oriented structure, where each feature has its own
 * directory with all the needed components, e.g. feature for 'login' form can
 * have its controller, service, directive and etc in one folder called 'login'
 * which can be placed under a common folder in /scripts/ called for example
 * 'modules' or 'components'.
 * */
var abApp = angular.module('address-book', ['LocalStorageModule', 'ngRoute']);

abApp.config(['localStorageServiceProvider', '$routeProvider', function (localStorageServiceProvider, $routeProvider) {
	localStorageServiceProvider.setPrefix('address-book');

	$routeProvider
		.when('/', {
			templateUrl: 'views/address-list/address-list.html',
			controller: 'AddressesListController',
			resolve: {
				resolveData: ['AddressEntryFactory', function (AddressEntryFactory) {
					return AddressEntryFactory.getAllEntries();
				}]
			}
		})
		.otherwise({redirectTo: '/'});

}]).constant('_', window._)
	.run(['CountryListFactory', function (CountryListFactory) {
		// Get the counties data
		var cl = require('country-list')();
		CountryListFactory.setCountryListService(cl);
	}]);
