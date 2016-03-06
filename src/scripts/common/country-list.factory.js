angular.module('address-book').factory('CountryListFactory', [function() {
	'use strict';

	var getCountryList = function() {
		return [
			{ code: 'bg', name: 'Bulgaria'},
			{ code: 'sw', name: 'Sweden'}
		];
	};



	return {
		getCountryList: getCountryList
	};
}]);