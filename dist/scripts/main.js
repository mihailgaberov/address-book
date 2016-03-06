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
angular.module('address-book').factory('ResultEntryFactory', ['localStorageService', function(localStorageService) {
	'use strict';

	var entryId;
	/**
	 * Initialize the local stogare index in
	 */
	var init = function () {
			// initialize the storage index
			if (!entryId) {
				localStorageService.set("address-book:id", entryId = 1);
			}
	};

	var addEntry = function(entry) {
		init();

		if(localStorageService.isSupported) {
				localStorageService.set('address-book-entry:' + entryId, entry);
				localStorageService.set("address-book:index", ++entryId);
		}
	};

	var getEntry = function(id) {

	};

	var getAllEntries = function() {
		console.log('>>> getAllEntries');
	};

	return {
		addEntry: addEntry,
		getAllEntries: getAllEntries
	};
}]);
angular.module('address-book')
	.controller('FormController', ['$scope', 'CountryListFactory', 'ResultEntryFactory',
		function($scope, CountryListFactory, ResultEntryFactory) {

	this.countriesData = CountryListFactory.getCountryList();

	this.submitForm = function () {

		console.log(">>>>>>entry.id: ", $scope.recordId);
		var entry = {
			'id': $scope.recordId,
			'firstName': $scope.firstName,
			'lastName': $scope.lastName,
			'email': $scope.email,
			'country': CountryListFactory.getNameByCode($scope.country)
		};


		if (entry.id === 0) {
			ResultEntryFactory.addEntry(entry);
		} else {
			console.log(">>>>> edit");
		}
	}

	}])
	.directive('addressBookForm', function() {
		return {
			controller: 'FormController',
			controllerAs: 'fc',
			restrict: 'E',
			scope: {},
			templateUrl: 'views/form/address-book-form.html',
			link: function(scope, element, attrs, controller) {
				scope.countries = controller.countriesData;
			}
		};
	});
angular.module('address-book').controller('ResultsController', ['$scope', 'ResultEntryFactory', function($scope, ResultEntryFactory) {
	$scope.entries = ResultEntryFactory.getAllEntries();

	}])
	.directive('results', function() {
		return {
			restrict: 'E',
			scope: {},
			templateUrl: 'views/results/results.html'
		};
	});