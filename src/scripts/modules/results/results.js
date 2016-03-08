angular.module('address-book')
	.controller('ResultsController', ['ResultEntryFactory', 'resolveData', '$scope', 'Events',
		function (ResultEntryFactory, resolveData, $scope, Events) {

			if (_.isUndefined(resolveData)) {
				$scope.entries = [];
			} else {
				$scope.entries = resolveData;
			}
			
			$scope.$on(Events.ADD, function(e, newEntry) {
				$scope.entries.push(newEntry);
			});

			$scope.$on(Events.UPDATE, function(e, arrNewEntries) {
				$scope.entries = arrNewEntries;
			});

			$scope.$on(Events.REMOVE, function(e, entryIdx) {
				$scope.entries.splice(entryIdx, 1);
			});

			$scope.editEntry = function (entryId, idx) {
				ResultEntryFactory.editEntry(entryId, idx);
			};

			$scope.deleteEntry = function (entryId, idx) {
				ResultEntryFactory.deleteEntry(entryId, idx);
			};

		}
	]);