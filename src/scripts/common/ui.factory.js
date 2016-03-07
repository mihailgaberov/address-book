angular.module('address-book').factory('UiFactory', [function () {
	'use strict';

	var addEntryToUI = function (entry) {
		var $tr = document.createElement("tr"), $td, key;

		for (key in entry) {
			if (entry.hasOwnProperty(key)) {
				$td = document.createElement("td");
				$td.appendChild(document.createTextNode(entry[key]));
				$tr.appendChild($td);
			}
		}

		$td = document.createElement("td");
		$td.innerHTML = '<a data-option="edit" data-id="' + entry.id + '">Edit</a> | <a data-option="delete" data-id="' + entry.id + '">Delete</a>';
		$tr.appendChild($td);
		$tr.setAttribute("id", "address-book-entry-" + entry.id);

		document.querySelectorAll('#address-book-table')[0].appendChild($tr);
	};

	var showAll = function (records) {
		if (!_.isUndefined(records) && records.length > 0) {
			_.forEach(records, function (rec) {
				addEntryToUI(rec);
			});
		}
	};

	return {
		addEntryToUI: addEntryToUI,
		showAll: showAll
	};
}]);