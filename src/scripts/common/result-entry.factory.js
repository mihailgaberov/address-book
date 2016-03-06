angular.module('address-book').factory('ResultEntryFactory', ['localStorageService', function(localStorageService) {
	'use strict';

	var entryId = localStorageService.get("index");

	var addEntry = function(entry) {
		if (!entryId) {
			localStorageService.set("index", entryId = 1);
		}
		if (localStorageService.isSupported) {
			entry.id = entryId;
			localStorageService.set('entry:' + entryId, entry);
			localStorageService.set("index", ++entryId);
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