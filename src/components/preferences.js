$(function () {
	$('#layout2').w2form({
		name   : 'form',
		header : 'Developer credentials for Gandalf',
		url    : 'server/post',
		fields : [
			{ field: 'full_name', type: 'text', required: true, html: { caption: 'Full Name', attr: 'style="width: 100px"' } },
			{ field: 'email', type: 'text', required: true, html: { caption: 'Email', attr: 'style="width: 100px"' } },
			{ field: 'user', type: 'text', required: true, html: { caption: 'Bitbucket User', attr: 'style="width: 100px"' } },
			{ field: 'password', type: 'password', required: true, html: { caption: 'Bitbucket Password', attr: 'style="width: 100px"' } },
			{ field: 'default_user', type: 'text', required: false, html: { caption: 'Default User', attr: 'style="width: 100px"' } },
		],
		toolbar: {
			items: [
				{ id: 'bt3', type: 'spacer' },
				{ id: 'bt4', type: 'button', caption: 'Reset', img: 'icon-page' },
				{ id: 'bt5', type: 'button', caption: 'Save', img: 'icon-page' }
			],
			onClick: function (event) {
				if (event.target == 'bt4') {
					w2ui.form.clear();
				}
				if (event.target == 'bt5') {
					w2ui.form.save();
					console.log('save', event);
				}
			}
		}
	});
});