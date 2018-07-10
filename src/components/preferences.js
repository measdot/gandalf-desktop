const db = require('./db');

$(function () {
	// db.add('dev_full_name','kumar gaurav');
	console.log(db.get(function (docs) {
		console.log(docs[0]);
	}));
});

const style = "font-size:12px";
module.exports = {
	init:function () {
		$(function () {
			$('#fullname').w2field('text');
			$('#email').w2field('email');
			$('#bitbucket-user-name').w2field('text');
			$('#bitbucket-password').w2field('password');
			$('#default-user').w2field('text');
		});
		$('#preferences-form').w2form({
			name: 'form',
			fields: [
				{name: 'type', type:'radio', options: {
						items: [{ id: 1, text: 'Top' }, { id: 2, text: 'Down' }] },
					html:{
						caption: 'Toolbar Position',style:style}},
				{name: 'type', type:'radio', options: {
						items: [{ id: 1, text: 'Dark' }, { id: 2, text: 'Light' }] },
					html:{
						caption: 'Select Theme',style:style}},
			]
		});
	}
};