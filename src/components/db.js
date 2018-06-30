// Initialize the database
const DataStore = require('nedb');
const db = new DataStore({ filename:"db/config.db", autoload: true });

// Adds a key value pair
exports.add = function(key, value) {

	// Create the person object
	var person = {
		"key": key,
		"value": value
	};

	// Save the person to the database
	db.insert(person, function(err, newDoc) {
		// Do nothing
	});
};

// Returns all key value pairs
exports.get = function(fnc) {

	// Get all persons from the database
	db.find({}, function(err, docs) {

		// Execute the parameter function
		fnc(docs);
	});
}

// Deletes a key value pair
exports.delete = function(id) {

	db.remove({ _id: id }, {}, function(err, numRemoved) {
		// Do nothing
	});
}