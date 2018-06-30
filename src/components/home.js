
const grid = require('./grid')
const mainToolbar = require('./toolbar')
const serviceTabs = require('./tabs')
const serviceList = require('./services.json')
const db = require('./db')

$(function () {
	var pstyle = 'border: 1px solid #dfdfdf; padding: 5px;';
	$('#layout-home').w2layout({
		name: 'layout-home',
		padding: 1,
		panels: [
			{ type: 'left', size: 300, minSize:250,resizable: true, style: pstyle, content: 'left' },
			{ type: 'main', style: pstyle, content: 'main'},
			{ type: 'right', size: 300, resizable: true, style: pstyle},
			// { type: 'bottom', size: 40, resizable: true, style: pstyle, content: 'bottom' }
		]
	});
	//preferences panel layout
	$().w2layout({
		name: 'preferences',
		panels: [
			{ type: 'main', size: '70', resizable: true, style: pstyle },
			{ type: 'bottom', size: '200', resizable: true,style: pstyle, content: '<div id="preferences-app" style="width: 100%;"></div>' }
		]
	});

	//preferences-user form
	$().w2form({
		name   : 'preferences-user',
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
					w2ui['preferences-user'].clear();

				}
				if (event.target == 'bt5') {
					w2ui['preferences-user'].save();
					console.log('save', event);
				}
			}
		}
	});

	//preferences-app form
	$().w2form({
		name   : 'preferences-app',
		header : 'Personalize Gandalf App',
		url    : 'server/post',
		fields : [
			{ field: 'select_theme', type: 'radio', required: false,
				html: {
					caption: 'Select theme',  items: [
						{ id: 'theme-light', text: 'Light'},
						{ id: 'theme-dark', text: 'Dark' }
					]
				}
			}
		],
		toolbar: {
			items: [
				{ id: 'bt3', type: 'spacer' },
				{ id: 'bt4', type: 'button', caption: 'Reset', img: 'icon-page' },
				{ id: 'bt5', type: 'button', caption: 'Save', img: 'icon-page' }
			],
			onClick: function (event) {
				if (event.target == 'bt4') {
					w2ui['preferences-app'].clear();
				}
				if (event.target == 'bt5') {
					w2ui['preferences-app'].save();
					console.log('save', event);
				}
			}
		}
	});

	w2ui['layout-home'].content('left', grid.init());
	w2ui['layout-home'].content('right', w2ui['preferences']);
	w2ui['preferences'].content('main', w2ui['preferences-user']);
	w2ui['preferences'].content('bottom', w2ui['preferences-app']);

	$('#theme-light').prop('checked',true);
	w2ui['grid'].add(serviceList);

	w2ui['layout-home'].assignToolbar('main', mainToolbar.init())

	w2ui['layout-home'].content('main', '<div id="tabs" style="width: 100%;"></div><div data-tabs-content></div>');

	serviceTabs.init();

});
