angular.module('addressBookControllers', []).controller('AddressListController', ['$scope', 'AddressEntryFactory', 'Events', 'addresses',
		function ($scope, AddressEntryFactory, Events, addresses) {

			$scope.checkAddressesData = function () {
				if (_.isUndefined(addresses)) {
					$scope.entries = [];
				} else {
					$scope.entries = addresses;
				}
			};
			$scope.checkAddressesData();

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