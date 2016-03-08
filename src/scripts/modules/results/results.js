angular.module('address-book')
	.controller('ResultsController', ['ResultEntryFactory', 'resolveData', '$scope',
		function (ResultEntryFactory, resolveData, $scope) {

			$scope.entries = resolveData;

			$scope.$on('addNewEntry', function(e, arg) {
				$scope.entries.push(arg);
			});


			$scope.editEntry = function (entryId) {
				console.log('>>> edit entry', entryId);
			};
			$scope.deleteEntry = function (entryId) {
				console.log('>>> detele entry', entryId);
			};

		}
	]);