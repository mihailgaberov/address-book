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
    'EDIT': 'editEntry',
    'UPDATE':'updateEntry'
})
angular.module('address-book').factory('ResultEntryFactory', ['localStorageService', '$q', '$rootScope', 'Events',
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
		var allEntries = getAllEntries();
		$rootScope.$broadcast(Events.UPDATE, allEntries);
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
angular.module('address-book')
	.controller('ResultsController', ['ResultEntryFactory', 'resolveData', '$scope', 'Events',
		function (ResultEntryFactory, resolveData, $scope, Events) {

			if (_.isUndefined(resolveData)) {
				$scope.entries = [];
			} else {
				$scope.entries = resolveData;
			}
			
			$scope.$on(Events.ADD, function(e, arg) {
				$scope.entries.push(arg);
			});

			$scope.$on(Events.UPDATE, function(e, arg) {
				arg.then(function (value) {
					$scope.entries = value;
				});
			});

			$scope.$on(Events.REMOVE, function(e, arg) {
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
angular.module('address-book')
	.controller('FormController', ['$scope', 'CountryListFactory', 'ResultEntryFactory', 'Events',
		function ($scope, CountryListFactory, ResultEntryFactory, Events) {

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
					ResultEntryFactory.updateEntry($scope.recordId.value, entry);
				}

				$scope.recordId.value = 0;
				$scope.resetForm();
			};

			$scope.resetForm = function() {
				$scope.firstName = '';
				$scope.lastName = '';
				$scope.email = '';
				$scope.country = '';
			};

			$scope.$on(Events.EDIT, function (e, arg) {
				$scope.firstName = arg.firstName;
				$scope.lastName = arg.lastName;
				$scope.email = arg.email;
				$scope.country = CountryListFactory.getCodeByName(arg.country);
				$scope.recordId.value = arg.id;
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