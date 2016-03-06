abApp.controller('ResultsController', ['$scope', function($scope) {
		$scope.customer = {

		};
	}])
	.directive('results', function() {
		return {
			templateUrl: 'views/results/results.html'
		};
	});