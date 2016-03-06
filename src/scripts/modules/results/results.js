angular.module('address-book').controller('ResultsController', ['$scope', 'ResultEntryFactory', function($scope, ResultEntryFactory) {
	$scope.entries = ResultEntryFactory.getAllEntries();

	}])
	.directive('results', function() {
		return {
			restrict: 'E',
			scope: {},
			templateUrl: 'views/results/results.html'
		};
	});