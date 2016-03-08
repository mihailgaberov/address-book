angular.module('address-book')
	.controller('ResultsController', ['ResultEntryFactory', 'resolveData', '$scope',
		function (ResultEntryFactory, resolveData, $scope) {

			$scope.entries = resolveData;
			console.log('>>> resolveData: ', resolveData);


			$scope.editEntry = function (entryId) {
				console.log('>>> edit entry', entryId);
			};
			$scope.deleteEntry = function (entryId) {
				console.log('>>> detele entry', entryId);
			};

		}
	]);