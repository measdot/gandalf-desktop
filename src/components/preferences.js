const db = require('./db');

$(function () {
	// db.add('dev_full_name','kumar gaurav');
	console.log(db.get(function (docs) {
		console.log(docs[0]);
	}));
});

module.exports = {
	init:function () {
		$('#preferences-form').w2form({
			name   : 'preferences-user',
			url    : 'server/post',
			fields : [
				{ field: 'full_name', type: 'text', required: true, html: { caption: 'Full Name' } },
				{ field: 'email', type: 'text', required: true, html: { caption: 'Email' } },
				{ field: 'user', type: 'text', required: true, html: { caption: 'Bitbucket User' } },
				{ field: 'password', type: 'password', required: true, html: { caption: 'Bitbucket Password'} },
				{ field: 'default_user', type: 'text', required: false, html: { caption: 'Default User'} },
			],
			actions: {
				'Save': function (event) {
					console.log('save', event);
					this.save();
				},
				'Clear': function (event) {
					console.log('clear', event);
					this.clear();
				}
			}
		});
	}
};