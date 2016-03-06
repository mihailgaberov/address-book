angular.module('address-book').controller('ResultsController', ['$scope', function($scope) {

	}])
	.directive('results', function() {
		return {
			restrict: 'E',
			scope: {},
			templateUrl: 'views/results/results.html'
		};
	});