angular.module('address-book')
	.controller('ResultsController', ['ResultEntryFactory', 'resolveData', '$scope', 'Events',
		function (ResultEntryFactory, resolveData, $scope, Events) {

			if (_.isUndefined(resolveData)) {
				$scope.entries = [];
			} else {
				$scope.entries = resolveData;
			}
			
			$scope.$on(Events.ADD, function(e, arg) {
				$scope.entries.push(arg);
			});

			$scope.$on(Events.UPDATE, function(e, arg) {
				arg.then(function (value) {
					$scope.entries = value;
				});
			});

			$scope.$on(Events.REMOVE, function(e, arg) {
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