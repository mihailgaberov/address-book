abApp.controller('FormController', ['$scope', 'CountryListFactory', function($scope, CountryListFactory) {

	var countries = CountryListFactory.getCountryList();

	console.log(">>>> ", countries);


	}])
	.directive('form', function() {
		return {
			scope: {},
			templateUrl: 'views/form/form.html'
		};
	});