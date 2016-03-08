angular.module('address-book')
	.controller('ResultsController', ['ResultEntryFactory', 'resolveData', '$scope',
		function (ResultEntryFactory, resolveData, $scope) {

			$scope.entries = resolveData;

			$scope.$on('addNewEntry', function(e, arg) {
				$scope.entries.push(arg);
			});

			$scope.editEntry = function (entryId) {
				ResultEntryFactory.editEntry(entryId);
			};

			$scope.deleteEntry = function (entryId) {
				ResultEntryFactory.deleteEntry(entryId);
			};

		}
	]);