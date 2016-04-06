describe('AddressEntryFactory:', function () {

	var addressEntryFactory;

	var mockedRecord = {
		'id': '1',
		'firstName': 'Mihail',
		'lastName': 'Gaberov',
		'email': 'me@mihail-gaberov.eu',
		'country': 'Bulgaria'
	};

	beforeEach(function () {
		module('addressBookFactories');
		
		module(function ($provide) {
			$provide.service('storage', function () {
				return {
					getLocalStorageService: function () {
						return {
							set: function () {},
							get: function () {},
							remove: function () {}
						};
					}
				};
			});
		});
	});

	beforeEach(function () {
		module(function ($provide) {
			$provide.constant('Events', {
					'ADD': 'addNewEntry',
					'REMOVE': 'removeEntry',
					'EDIT': 'editEntry',
					'UPDATE':'updateEntry'
			});
		});
	});

	beforeEach(inject(function(_AddressEntryFactory_){
		addressEntryFactory = _AddressEntryFactory_;
	}));

	beforeEach(inject(function($injector){
		rootScope = $injector.get('$rootScope');
		spyOn(rootScope, '$broadcast');
	}));

	it('getKey() should return a key used in the local storage by given id', function () {
		var key = addressEntryFactory.getKey(1);
		expect(key).toEqual('entry:1');
	});

	it('should broadcast ADD event when adding new record', function () {
		addressEntryFactory.addEntry(mockedRecord);
		expect(rootScope.$broadcast).toHaveBeenCalledWith('addNewEntry', mockedRecord);
	});

	it('should broadcast EDIT event when editEntry is called', function () {
		addressEntryFactory.editEntry(1, 1);
		expect(rootScope.$broadcast).toHaveBeenCalledWith('editEntry', undefined);
	});

	it('should broadcast REMOVE event when deleting a record is confirmed', function () {
		addressEntryFactory.deleteEntry(1, 1);
		expect(rootScope.$broadcast).toHaveBeenCalledWith('removeEntry', 1);
	});
});