angular.module('address-book').controller('FormController', ['$scope', 'CountryListFactory', function($scope, CountryListFactory) {

	$scope.countriesData = CountryListFactory.getCountryList();

	}])
	.directive('form', function() {
		return {
			restrict: 'E',
			scope: {
				countries: "="
			},
			templateUrl: 'views/form/form.html'
		};
	});