var abApp = angular.module('address-book', ['LocalStorageModule']);

abApp.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
	localStorageServiceProvider.setPrefix('address-book');
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
angular.module('address-book').factory('ResultEntryFactory', ['localStorageService', function (localStorageService) {
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
		return arrAddressBookList;
	};

	return {
		addEntry: addEntry,
		getAllEntries: getAllEntries
	};
}]);
angular.module('address-book').factory('UiFactory', [function () {
	'use strict';

	var addEntryToUI = function (entry) {
		var $tr = document.createElement("tr"), $td, key;

		for (key in entry) {
			if (entry.hasOwnProperty(key)) {
				$td = document.createElement("td");
				$td.appendChild(document.createTextNode(entry[key]));
				$tr.appendChild($td);
			}
		}

		$td = document.createElement("td");
		$td.innerHTML = '<a data-option="edit" data-id="' + entry.id + '">Edit</a> | <a data-option="delete" data-id="' + entry.id + '">Delete</a>';
		$tr.appendChild($td);
		$tr.setAttribute("id", "address-book-entry-" + entry.id);

		document.querySelectorAll('#address-book-table')[0].appendChild($tr);
	};

	var showAll = function (records) {
		if (!_.isUndefined(records) && records.length > 0) {
			_.forEach(records, function (rec) {
				addEntryToUI(rec);
			});
		}
	};

	return {
		addEntryToUI: addEntryToUI,
		showAll: showAll
	};
}]);
angular.module('address-book')
	.controller('FormController', ['$scope', 'CountryListFactory', 'ResultEntryFactory', 'UiFactory',
		function ($scope, CountryListFactory, ResultEntryFactory, UiFactory) {

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
					UiFactory.addEntryToUI(entry);
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
angular.module('address-book')
	.controller('ResultsController', ['UiFactory', 'ResultEntryFactory',
		function (UiFactory, ResultEntryFactory) {

			this.getAllEntries = function () {
				UiFactory.showAll(ResultEntryFactory.getAllEntries());
			};

		}])
	.directive('results', function () {
		return {
			controller: 'ResultsController',
			controllerAs: 'rc',
			restrict: 'E',
			scope: {},
			templateUrl: 'views/results/results.html',
			link: function (scope, element, attrs, controller) {
				controller.getAllEntries();
			}
		};
	});