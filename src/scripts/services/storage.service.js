angular.module('addressBookServices', []).service('storage', ['localStorageService', function (localStorageService) {
	'use strict';

	this.getLocalStorageService = function () {
		return localStorageService;
	}
}]);