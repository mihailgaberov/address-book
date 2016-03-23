angular.module('addressBookFactories', []).factory('AddressEntryFactory', ['$rootScope', '$q', 'storage', 'Events', 
	function ($rootScope, $q, storage, Events) {
	'use strict';

	var	ls = storage.getLocalStorageService();

	var entryId = ls.get("index");

	var getKey = function(id) {
		return 'entry:' + id;
	};

	var addEntry = function (entry) {
		if (ls.isSupported) {
			if (!entryId) {
				ls.set("index", entryId = 1);
			}

			entry.id = entryId;
			ls.set('entry:' + entryId, entry);
			ls.set("index", ++entryId);
		}

		$rootScope.$broadcast(Events.ADD, entry);
	};

	var deleteEntry = function (id, idx) {
		if (confirm('Are you sure?')) {
			ls.remove(getKey(id));
			$rootScope.$broadcast(Events.REMOVE, idx);
		}
	};

	var editEntry = function (id, idx) {
		var entry = ls.get(getKey(id));
		$rootScope.$broadcast(Events.EDIT, entry);
	};

	var updateEntry = function(id, entry) {
		entry.id = id;
		ls.set(getKey(id), entry);
		getAllEntries().then(function(entries) {
			$rootScope.$broadcast(Events.UPDATE, entries);
		});
	};

	var getAllEntries = function () {
		var lcLength = ls.length();
		if (lcLength - 1) {
			var arrAddressBookList = [], i, keys = ls.keys();

			for (i = 0; i < keys.length; i++) {
				if (/entry.\d+/.test(keys[i])) {
					arrAddressBookList.push(ls.get(keys[i]));
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