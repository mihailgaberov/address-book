var abApp = angular.module('address-book', ['LocalStorageModule']);

abApp.config(['localStorageServiceProvider', function (localStorageServiceProvider) {

	localStorageServiceProvider.setPrefix('address-book');
}]);
