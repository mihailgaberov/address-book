angular.module('address-book').factory('UiFactory', [function () {
	'use strict';

	var addEntryToUI = function (entry) {
		console.log('>>> add entry', entry);
		var $tr = document.createElement("tr"), $td, key;

		for (key in entry) {
			if (entry.hasOwnProperty(key)) {
				$td = document.createElement("td");
				$td.appendChild(document.createTextNode(entry[key]));
				$tr.appendChild($td);
			}
		}

		$td = document.createElement("td");
		$td.innerHTML = '<a data-op="edit" data-id="' + entry.id + '">Edit</a> | <a data-op="delete" data-id="' + entry.id + '">Delete</a>';
		$tr.appendChild($td);
		$tr.setAttribute("id", "address-book-entry-" + entry.id);

		document.querySelectorAll('#address-book-table')[0].appendChild($tr);
	};

	var showAll = function (records) {
		console.log('>>> show all records: ', records);
		//addEntryToUI(records[0]);
		//if (records !== undefined) {
		//	for (var i = 0; i < records.length; i++) {
		//		this.addEntryToUI(records[i]);
		//	}
		//}
	};

	return {
		addEntryToUI: addEntryToUI,
		showAll: showAll
	};
}]);