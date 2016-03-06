angular.module('address-book')
	.controller('ResultsController', ['$scope', '$rootScope', 'UiFactory', 'ResultEntryFactory',
		function ($scope, $rootScope, UiFactory, ResultEntryFactory) {

			UiFactory.showAll(ResultEntryFactory.getAllEntries());

			$rootScope.$on('entryAdded', function (e, arg) {
				UiFactory.addEntryToUI(arg);
			});

		}])
	.directive('results', function () {
		return {
			restrict: 'E',
			scope: {},
			templateUrl: 'views/results/results.html'
		};
	});