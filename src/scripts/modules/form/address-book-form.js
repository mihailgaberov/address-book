angular.module('address-book')
	.controller('FormController', ['$scope', 'CountryListFactory', 'ResultEntryFactory', 'Events',
		function ($scope, CountryListFactory, ResultEntryFactory, Events) {

			this.countriesData = CountryListFactory.getCountryList();

			this.submitForm = function () {
				var entry = {
					'firstName': $scope.firstName,
					'lastName': $scope.lastName,
					'email': $scope.email,
					'country': CountryListFactory.getNameByCode($scope.country)
				};


				if ($scope.recordId.value === 0) {
					ResultEntryFactory.addEntry(entry);
				} else {
					console.log(">>>>> update entry");
				}
			}

			$scope.$on(Events.UPDATE, function (e, arg) {
				$scope.firstName = arg.firstName;
				$scope.lastName = arg.lastName;
				$scope.email = arg.email;
				$scope.country = CountryListFactory.getCodeByName(arg.country);
			});

		}])
	.directive('addressBookForm', function () {
		return {
			controller: 'FormController',
			controllerAs: 'fc',
			restrict: 'E',
			scope: {},
			templateUrl: 'views/form/address-book-form.html',
			link: function (scope, element, attrs, controller) {
				scope.countries = controller.countriesData;
			}
		};
	});