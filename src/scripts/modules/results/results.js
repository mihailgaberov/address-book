angular.module('address-book')
	.controller('ResultsController', ['UiFactory', 'ResultEntryFactory',
		function (UiFactory, ResultEntryFactory) {

			this.getAllEntries = function () {
				UiFactory.showAll(ResultEntryFactory.getAllEntries());
			};

		}])
	.directive('results', function () {
		return {
			controller: 'ResultsController',
			controllerAs: 'rc',
			restrict: 'E',
			scope: {},
			templateUrl: 'views/results/results.html',
			link: function (scope, element, attrs, controller) {
				controller.getAllEntries();
			}
		};
	});