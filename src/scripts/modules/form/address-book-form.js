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
					ResultEntryFactory.updateEntry($scope.recordId.value, entry);
				}

				$scope.recordId.value = 0;
				this.resetForm();
			};

			this.resetForm = function() {
				$scope.firstName = '';
				$scope.lastName = '';
				$scope.email = '';
				$scope.country = '';
			};

			$scope.$on(Events.EDIT, function (e, arg) {
				$scope.firstName = arg.firstName;
				$scope.lastName = arg.lastName;
				$scope.email = arg.email;
				$scope.country = CountryListFactory.getCodeByName(arg.country);
				$scope.recordId.value = arg.id;
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