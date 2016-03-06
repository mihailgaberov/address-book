abApp.controller('FormController', ['$scope', 'CountryListFactory', function($scope, CountryListFactory) {

	}])
	.directive('form', function() {
		return {
			scope: {},
			templateUrl: 'views/form/form.html'
		};
	});