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

angular.module('address-book').factory('CountryListFactory', [function() {
	'use strict';

	var objCountryList = {};

	var setCountryList = function(countries) {
		objCountryList = countries;
	};

	var getCountryList = function() {
		return objCountryList.getData();
	};

	var getNameByCode = function(code) {
		return objCountryList.getName(code);
	};

	return {
		getCountryList: getCountryList,
		setCountryList: setCountryList,
		getNameByCode: getNameByCode
	};
}]);
angular.module('address-book').factory('ResultEntryFactory', ['localStorageService', '$q', function (localStorageService, $q) {
	'use strict';

	var entryId = localStorageService.get("index");

	var addEntry = function (entry) {
		if (localStorageService.isSupported) {
			if (!entryId) {
				localStorageService.set("index", entryId = 1);
			}

			entry.id = entryId;
			localStorageService.set('entry:' + entryId, entry);
			localStorageService.set("index", ++entryId);
		}
	};

	var getEntry = function (id) {

	};

	var getAllEntries = function () {
		var lcLength = localStorageService.length();
		if (lcLength - 1) {
			var arrAddressBookList = [], i, keys = localStorageService.keys();

			for (i = 0; i < keys.length; i++) {
				if (/entry.\d+/.test(keys[i])) {
					arrAddressBookList.push(localStorageService.get(keys[i]));
				}
			}
		}
		return $q.when(arrAddressBookList);
	};

	return {
		addEntry: addEntry,
		getAllEntries: getAllEntries
	};
}]);
angular.module('address-book')
	.controller('ResultsController', ['ResultEntryFactory', 'resolveData', '$scope',
		function (ResultEntryFactory, resolveData, $scope) {

			$scope.entries = resolveData;
			console.log('>>> resolveData: ', resolveData);


			/*this.getAllEntries = function () {
				UiFactory.showAll(ResultEntryFactory.getAllEntries());
			};*/

		}]);
	/*.directive('results', function () {
		return {
			controller: 'ResultsController',
			controllerAs: 'rc',
			restrict: 'E',
			//scope: {},
			templateUrl: 'views/results/results.html',
			link: function (scope, element, attrs, controller) {
				controller.getAllEntries();
			}
		};
	});*/
angular.module('address-book')
	.controller('FormController', ['$scope', 'CountryListFactory', 'ResultEntryFactory',
		function ($scope, CountryListFactory, ResultEntryFactory) {

			this.countriesData = CountryListFactory.getCountryList();

			this.submitForm = function () {
				var entry = {
					'firstName': $scope.firstName,
					'lastName': $scope.lastName,
					'email': $scope.email,
					'country': CountryListFactory.getNameByCode($scope.country)
				};


				if ($scope.recordId.value === 0) {
					ResultEntryFactory.addEntry(entry);
				} else {
					console.log(">>>>> edit");
				}
			}

		}])
	.directive('addressBookForm', function () {
		return {
			controller: 'FormController',
			controllerAs: 'fc',
			restrict: 'E',
			scope: {},
			templateUrl: 'views/form/address-book-form.html',
			link: function (scope, element, attrs, controller) {
				scope.countries = controller.countriesData;
			}
		};
	});