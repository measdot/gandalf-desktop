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
			name: 'preferences-form',
			fields: [

				{name: 'toolbar', type:'radio', options: {
						items: [{ id: 1, text: 'Down' }, { id: 2, text: 'Up' }] },
					html:{
						caption: 'Toolbar Position',style:style}},

				{name: 'theme', type:'radio', options: {
						items: [{ id: 1, text: 'Light' }, { id: 2, text: 'Dark' }] },
					html:{
						caption: 'Select Theme',style:style}},
			]
		});
		$('input[name="theme"]').attr('disabled', 'disabled');
		$('input[name="toolbar"]').attr('disabled', 'disabled');
		$('#theme, #toolbar:radio').prop('checked', true);
	}
};