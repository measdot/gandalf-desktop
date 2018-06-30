const db = require('./db');

$(function () {
	// db.add('dev_full_name','kumar gaurav');
	console.log(db.get(function (docs) {
		console.log(docs[0]);
	}));
});