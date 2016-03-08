angular.module('address-book').factory('CountryListFactory', [function() {
	'use strict';

	var objCountryList = {};

	var setCountryListService = function(countries) {
		objCountryList = countries;
	};

	var getCountryList = function() {
		return objCountryList.getData();
	};

	var getNameByCode = function(code) {
		return objCountryList.getName(code);
	};

	var getCodeByName = function (name) {
		return objCountryList.getCode(name);
	};

	return {
		getCountryList: getCountryList,
		setCountryListService: setCountryListService,
		getNameByCode: getNameByCode,
		getCodeByName: getCodeByName
	};
}]);