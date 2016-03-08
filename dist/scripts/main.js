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

	var getCodeByName = function (name) {
		return objCountryList.getCode(name);
	};

	return {
		getCountryList: getCountryList,
		setCountryList: setCountryList,
		getNameByCode: getNameByCode,
		getCodeByName: getCodeByName
	};
}]);
angular.module('address-book').constant( 'Events', {
    'ADD': 'addNewEntry',
    'REMOVE': 'removeEntry',
    'UPDATE': 'updateEntry'
})
angular.module('address-book').factory('ResultEntryFactory', ['localStorageService', '$q', '$rootScope', 'Events'
	function (localStorageService, $q, $rootScope, Events) {
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

		// $rootScope.$broadcast('addNewEntry', entry);
		$rootScope.$broadcast(Events.ADD, entry);
	};

	var deleteEntry = function (id, idx) {
		if (confirm('Are you sure?')) {
			var key = 'entry:' + id;
			localStorageService.remove(key);
			// $rootScope.$broadcast('removeEntry', idx);
			$rootScope.$broadcast(Events.REMOVE, idx);
		}
	};

	var editEntry = function (id, idx) {
		// $rootScope.$broadcast('updateEntry', { 'firstName': 'Gosho',
		$rootScope.$broadcast(Events.UPDATE, { 'firstName': 'Gosho',
												'lastName': 'Gaddev',
												'email': 'biocniam@abvfd.com',
												'country':'Bulgaria'});
		console.log('>>> edit entryId: ', id);
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
		getAllEntries: getAllEntries,
		editEntry: editEntry,
		deleteEntry: deleteEntry
	};
}]);
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
					console.log(">>>>> update entry");
				}
			}

			// $scope.$on('updateEntry', function (e, arg) {
			$scope.$on(Events.UPDATE, function (e, arg) {
				$scope.firstName = arg.firstName;
				$scope.lastName = arg.lastName;
				$scope.email = arg.email;
				$scope.country = CountryListFactory.getCodeByName(arg.country);
			});

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
angular.module('address-book')
	.controller('ResultsController', ['ResultEntryFactory', 'resolveData', '$scope',
		function (ResultEntryFactory, resolveData, $scope) {

			if (_.isUndefined(resolveData)) {
				$scope.entries = [];
			} else {
				$scope.entries = resolveData;
			}
			
			$scope.$on('addNewEntry', function(e, arg) {
				$scope.entries.push(arg);
			});

			$scope.$on('removeEntry', function(e, arg) {
				$scope.entries.splice(arg, 1);
			});

			$scope.editEntry = function (entryId, idx) {
				ResultEntryFactory.editEntry(entryId, idx);
			};

			$scope.deleteEntry = function (entryId, idx) {
				ResultEntryFactory.deleteEntry(entryId, idx);
			};

		}
	]);