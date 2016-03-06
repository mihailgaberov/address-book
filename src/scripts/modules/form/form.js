abApp.controller('FormController', ['$scope', function($scope) {
		$scope.customer = {

		};
	}])
	.directive('form', function() {
		return {
			templateUrl: 'views/form/form.html'
		};
	});