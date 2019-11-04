module.exports.init = function(){
	$('#001').w2form({
		name     : '001',
		url      : 'server/post',
		// header   : 'Field Types',
		// formURL  : 'data/form.html',
		fields: [
			{ field: 'field_text', type: 'text', required: true },
			{ field: 'field_alpha', type: 'alphaNumeric', required: true },
			{ field: 'field_int', type: 'int', required: true },
			{ field: 'field_float', type: 'float', required: true },
			{ field: 'field_date', type: 'date' },
			{ field: 'field_list', type: 'list', required: true,
				options: { items: ['Adams, John', 'Johnson, Peter', 'Lewis, Frank', 'Cruz, Steve', 'Donnun, Nick'] } },
			{ field: 'field_enum', type: 'enum', required: true,
				options: { items: ['Adams, John', 'Johnson, Peter', 'Lewis, Frank', 'Cruz, Steve', 'Donnun, Nick'] } },
			{ field: 'field_textarea', type: 'text'},
			{ field: 'field_select', type: 'select', required: false, options: { items: ['fist', 'second'] } },
			{ field: 'field_check', type: 'checkbox', required: false },
			{ field: 'field_radio', type: 'radio', required: false }
		],
		toolbar: {
			items: [
				{ id: 'bt1', type: 'button', caption: 'Tool Button 1', img: 'icon-folder' },
				{ id: 'bt2', type: 'button', caption: 'Tool Button 2', img: 'icon-folder' },
				{ id: 'bt3', type: 'spacer' },
				{ id: 'bt4', type: 'button', caption: 'Reset', img: 'icon-page' },
				{ id: 'bt5', type: 'button', caption: 'Run', img: 'icon-page' }
			],
				onClick: function (event) {
				if (event.target == 'bt4') w2ui.form.clear();
				if (event.target == 'bt5') w2ui.form.save();
			}
		}
	});
};
