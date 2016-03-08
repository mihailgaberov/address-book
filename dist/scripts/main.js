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

angular.module('address-book').constant( 'Events', {
    'ADD': 'addNewEntry',
    'REMOVE': 'removeEntry',
    'EDIT': 'editEntry',
    'UPDATE':'updateEntry'
});
angular.module('address-book')
	.controller('AddressesListController', ['AddressEntryFactory', 'resolveData', '$scope', 'Events',
		function (AddressEntryFactory, resolveData, $scope, Events) {

			if (_.isUndefined(resolveData)) {
				$scope.entries = [];
			} else {
				$scope.entries = resolveData;
			}

			$scope.$on(Events.ADD, function (e, newEntry) {
				$scope.entries.push(newEntry);
			});

			$scope.$on(Events.UPDATE, function (e, arrNewEntries) {
				$scope.entries = arrNewEntries;
			});

			$scope.$on(Events.REMOVE, function (e, entryIdx) {
				$scope.entries.splice(entryIdx, 1);
			});

			$scope.editEntry = function (entryId, idx) {
				AddressEntryFactory.editEntry(entryId, idx);
			};

			$scope.deleteEntry = function (entryId, idx) {
				AddressEntryFactory.deleteEntry(entryId, idx);
			};
		}
	]);
angular.module('address-book')
	.controller('FormController', ['$scope', 'CountryListFactory', 'AddressEntryFactory', 'Events',
		function ($scope, CountryListFactory, AddressEntryFactory, Events) {

			this.countriesData = CountryListFactory.getCountryList();

			this.submitForm = function () {
				var entry = {
					'firstName': $scope.firstName,
					'lastName': $scope.lastName,
					'email': $scope.email,
					'country': CountryListFactory.getNameByCode($scope.country)
				};


				if ($scope.recordId.value === 0) {
					AddressEntryFactory.addEntry(entry);
				} else {
					AddressEntryFactory.updateEntry($scope.recordId.value, entry);
				}

				$scope.recordId.value = 0;
				this.resetForm();
			};

			this.resetForm = function() {
				$scope.firstName = '';
				$scope.lastName = '';
				$scope.email = '';
				$scope.country = '';
			};

			$scope.$on(Events.EDIT, function (e, entry) {
				$scope.firstName = entry.firstName;
				$scope.lastName = entry.lastName;
				$scope.email = entry.email;
				$scope.country = CountryListFactory.getCodeByName(entry.country);
				$scope.recordId.value = entry.id;
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
angular.module('address-book').factory('AddressEntryFactory', ['localStorageService', '$q', '$rootScope', 'Events',
	function (localStorageService, $q, $rootScope, Events) {
	'use strict';

	var entryId = localStorageService.get("index");

	var getKey = function(id) {
		return 'entry:' + id;
	};

	var addEntry = function (entry) {
		if (localStorageService.isSupported) {
			if (!entryId) {
				localStorageService.set("index", entryId = 1);
			}

			entry.id = entryId;
			localStorageService.set('entry:' + entryId, entry);
			localStorageService.set("index", ++entryId);
		}

		$rootScope.$broadcast(Events.ADD, entry);
	};

	var deleteEntry = function (id, idx) {
		if (confirm('Are you sure?')) {
			localStorageService.remove(getKey(id));
			$rootScope.$broadcast(Events.REMOVE, idx);
		}
	};

	var editEntry = function (id, idx) {
		var entry = localStorageService.get(getKey(id));
		$rootScope.$broadcast(Events.EDIT, entry);
	};

	var updateEntry = function(id, entry) {
		entry.id = id;
		localStorageService.set(getKey(id), entry);
		getAllEntries().then(function(entries) {
			$rootScope.$broadcast(Events.UPDATE, entries);
		});
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
		updateEntry: updateEntry,
		deleteEntry: deleteEntry
	};
}]);
angular.module('address-book').factory('CountryListFactory', [function() {
	'use strict';

	var objCountryList = {};

	var setCountryListService = function(countries) {
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
		setCountryListService: setCountryListService,
		getNameByCode: getNameByCode,
		getCodeByName: getCodeByName
	};
}]);