describe('AddressEntryFactory:', function () {

	var $factory;

	var mockedRecord = {
		'id': '1',
		'firstName': 'Mihail',
		'lastName': 'Gaberov',
		'email': 'me@mihail-gaberov.eu',
		'country': 'Bulgaria'
	};

	beforeEach(function () {
		module('addressBookFactories');
		module(function($provide) {
			$provide.service('storage', function () {
				return {
					length: function() {
						return 1;
					},
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

		spyOn($factory, 'addEntry');

		$factory.addEntry(mockedRecord);
	}));

	it("creates spies for each requested function", function() {
		expect($factory.getKey).toBeDefined();
		expect($factory.addEntry).toBeDefined();
		expect($factory.deleteEntry).toBeDefined();
		expect($factory.editEntry).toBeDefined();
		expect($factory.updateEntry).toBeDefined();
		expect($factory.getAllEntries).toBeDefined();
	});

	it('getKey() should return a key used in the local storage by given id', function () {
		var key = $factory.getKey(1);
		expect(key).toEqual('entry:1');
	});

	it('addEntry() should be called with a record object', function () {
		expect($factory.addEntry).toHaveBeenCalledWith(mockedRecord);
	});
});