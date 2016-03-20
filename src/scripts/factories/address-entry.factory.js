angular.module('address-book-factories', []).factory('AddressEntryFactory', ['localStorageService', '$q', '$rootScope', 'Events',
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
		deleteEntry: deleteEntry,
		getKey: getKey
	};
}]);