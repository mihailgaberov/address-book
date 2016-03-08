angular.module('address-book')
	.controller('ResultsController', ['ResultEntryFactory', 'resolveData', '$scope',
		function (ResultEntryFactory, resolveData, $scope) {

			if (_.isUndefined(resolveData)) {
				$scope.entries = [];
			} else {
				$scope.entries = resolveData;
			}
			
			$scope.$on('addNewEntry', function(e, arg) {
				$scope.entries.push(arg);
			});

			$scope.$on('removeEntry', function(e, arg) {
				$scope.entries.splice(arg, 1);
			});

			$scope.editEntry = function (entryId, idx) {
				ResultEntryFactory.editEntry(entryId, idx);
			};

			$scope.deleteEntry = function (entryId, idx) {
				ResultEntryFactory.deleteEntry(entryId, idx);
			};

		}
	]);