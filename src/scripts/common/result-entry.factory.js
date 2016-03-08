angular.module('address-book').factory('ResultEntryFactory', ['localStorageService', '$q', '$rootScope', function (localStorageService, $q, $rootScope) {
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

		$rootScope.$broadcast('addNewEntry', entry);
	};

	var deleteEntry = function (id, idx) {
		if (confirm('Are you sure?')) {
			var key = 'entry:' + id;
			localStorageService.remove(key);
			$rootScope.$broadcast('removeEntry', idx);
		}
	};

	var editEntry = function (id, idx) {
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