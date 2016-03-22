angular.module('addressBookServices', []).service('stogare', ['LocalStorageModule', function (localStorageService) {

	var stogare = new localStorageService();

	return storage;

}]);