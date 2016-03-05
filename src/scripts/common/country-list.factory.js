angular.module('address-book').factory('CountryListFactory', ['country-list', function(countryListService) {
	'use strict';


	var getCountryList = function() {
		return [
			{ code: 'bg', name: 'Bulgaria'},
			{ code: 'sw', name: 'Sweden'}
		];
	};



	return {
		getCountryList: getCountryList()
	};
}]);