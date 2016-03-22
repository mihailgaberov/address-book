angular.module('addressBookControllers', []).controller('AddressListController', ['AddressEntryFactory', 'addressBookListResolvedData', '$scope', 'Events',
		function (AddressEntryFactory, addressBookListResolvedData, $scope, Events) {

			$scope.checkAddressBookListData = function () {
				if (_.isUndefined(addressBookListResolvedData)) {
					$scope.entries = [];
				} else {
					$scope.entries = addressBookListResolvedData;
				}
			};
			$scope.checkAddressBookListData();

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