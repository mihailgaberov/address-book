angular.module('address-book-controllers', []).controller('AddressListController', ['AddressEntryFactory', 'resolveData', '$scope', 'Events',
		function (AddressEntryFactory, resolveData, $scope, Events) {

			$scope.checkResolvedData = function () {
				if (_.isUndefined(resolveData)) {
					$scope.entries = [];
				} else {
					$scope.entries = resolveData;
				}
			};
			$scope.checkResolvedData();

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