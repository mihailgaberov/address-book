describe('AddressEntryFactory:', function () {

	var $factory;

	beforeEach(function () {
		module('address-book-factories');
		module(function($provide) {
			$provide.service('localStorageService', function () {
				return {
					set: function () {
						console.log('>>> set local storage');
					},
					get: function () {
						console.log('>>> get local storage');
					}
				};
			});
		});
		module(function ($provide) {
			$provide.constant('Events', function () {
				return {
					'ADD': 'addNewEntry',
					'REMOVE': 'removeEntry',
					'EDIT': 'editEntry',
					'UPDATE':'updateEntry'
				}
			});
		});
	});

	beforeEach(inject(function(_AddressEntryFactory_){
		$factory = _AddressEntryFactory_;
	}));

	it('getKey() should return a key used in the local storage by given id', function () {
		var key = $factory.getKey(1);
		expect(key).toEqual('entry:1');
	});


});