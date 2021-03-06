angular.module('addressBookControllers')
	.controller('FormController', ['$scope', 'CountryListFactory', 'AddressEntryFactory', 'Utils', 'Events',
		function ($scope, CountryListFactory, AddressEntryFactory, Utils, Events) {

			this.countriesData = CountryListFactory.getCountryList();

			this.submitForm = function () {
				if (Utils.validateEmail($scope.email)) {
					var entry = {
					'firstName': $scope.firstName,
					'lastName': $scope.lastName,
						'email': $scope.email,
						'country': CountryListFactory.getNameByCode($scope.country)
					};


				if ($scope.recordId.value === 0) {
					AddressEntryFactory.addEntry(entry);
				} else {
					AddressEntryFactory.updateEntry($scope.recordId.value, entry);
				}

				$scope.recordId.value = 0;
				this.resetForm();
				} else {
					alert('Please enter valid email');
				}

				
			};

			this.resetForm = function() {
				$scope.firstName = '';
				$scope.lastName = '';
				$scope.email = '';
				$scope.country = '';
			};

			$scope.$on(Events.EDIT, function (e, entry) {
				$scope.firstName = entry.firstName;
				$scope.lastName = entry.lastName;
				$scope.email = entry.email;
				$scope.country = CountryListFactory.getCodeByName(entry.country);
				$scope.recordId.value = entry.id;
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