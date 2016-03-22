angular.module('addressBookFactories', []).factory('AddressEntryFactory', ['storage', '$q', '$rootScope', 'Events',
	function (storage, $q, $rootScope, Events) {
	'use strict';

	var entryId = storage.get("index");

	var getKey = function(id) {
		return 'entry:' + id;
	};

	var addEntry = function (entry) {
		if (storage.isSupported) {
			if (!entryId) {
				storage.set("index", entryId = 1);
			}

			entry.id = entryId;
			storage.set('entry:' + entryId, entry);
			storage.set("index", ++entryId);
		}

		$rootScope.$broadcast(Events.ADD, entry);
	};

	var deleteEntry = function (id, idx) {
		if (confirm('Are you sure?')) {
			storage.remove(getKey(id));
			$rootScope.$broadcast(Events.REMOVE, idx);
		}
	};

	var editEntry = function (id, idx) {
		var entry = storage.get(getKey(id));
		$rootScope.$broadcast(Events.EDIT, entry);
	};

	var updateEntry = function(id, entry) {
		entry.id = id;
		storage.set(getKey(id), entry);
		getAllEntries().then(function(entries) {
			$rootScope.$broadcast(Events.UPDATE, entries);
		});
	};

	var getAllEntries = function () {
		var lcLength = storage.length();
		if (lcLength - 1) {
			var arrAddressBookList = [], i, keys = storage.keys();

			for (i = 0; i < keys.length; i++) {
				if (/entry.\d+/.test(keys[i])) {
					arrAddressBookList.push(storage.get(keys[i]));
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