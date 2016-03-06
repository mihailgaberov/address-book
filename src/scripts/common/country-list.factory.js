angular.module('address-book').factory('CountryListFactory', [function() {
	'use strict';

	var arrCountries = [];

	var setCountryList = function(countries) {
		arrCountries = countries;
	};

	var getCountryList = function() {
		return arrCountries;
	};

	return {
		getCountryList: getCountryList,
		setCountryList: setCountryList
	};
}]);