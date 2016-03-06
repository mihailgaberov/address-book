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
angular.module('address-book').factory('ResultEntryFactory', ['localStorageService', '$rootScope', function (localStorageService, $rootScope) {
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

			$rootScope.$broadcast('entryAdded', entry);
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
		console.log('>>> add entry', entry);
		var $tr = document.createElement("tr"), $td, key;

		for (key in entry) {
			if (entry.hasOwnProperty(key)) {
				$td = document.createElement("td");
				$td.appendChild(document.createTextNode(entry[key]));
				$tr.appendChild($td);
			}
		}

		$td = document.createElement("td");
		$td.innerHTML = '<a data-op="edit" data-id="' + entry.id + '">Edit</a> | <a data-op="delete" data-id="' + entry.id + '">Delete</a>';
		$tr.appendChild($td);
		$tr.setAttribute("id", "address-book-entry-" + entry.id);

		document.querySelectorAll('#address-book-table')[0].appendChild($tr);
	};

	var showAll = function (records) {
		console.log('>>> show all records: ', records);
		//addEntryToUI(records[0]);
		console.log(document.querySelectorAll('#address-book-table'));
		//if (records !== undefined) {
		//	for (var i = 0; i < records.length; i++) {
		//		this.addEntryToUI(records[i]);
		//	}
		//}
	};

	return {
		addEntryToUI: addEntryToUI,
		showAll: showAll
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
	.controller('ResultsController', ['$scope', '$rootScope', 'UiFactory', 'ResultEntryFactory',
		function ($scope, $rootScope, UiFactory, ResultEntryFactory) {

			UiFactory.showAll(ResultEntryFactory.getAllEntries());

			$rootScope.$on('entryAdded', function (e, arg) {
				UiFactory.addEntryToUI(arg);
			});

		}])
	.directive('results', function () {
		return {
			restrict: 'E',
			scope: {},
			templateUrl: 'views/results/results.html'
		};
	});