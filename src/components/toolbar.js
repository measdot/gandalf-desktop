const bug = require('./bug')


module.exports = {
		name: 'toolbar',
		items: [
			{
				type: 'html', id: 'item1',
				html: function (item) {
					var html =
						'<div style="padding: 3px 10px;">' +
						'    <input size="35" placeholder="Search by service name" onchange="var el = w2ui.toolbar.set(\'item5\', { value: this.value });" ' +
						'         style="padding: 3px; border-radius: 2px; border: 1px solid silver" value="' + (item.value || '') + '"/>' +
						'</div>';
					return html;
				}
			},
			{type: 'break', id: 'break3'},
			{type: 'button', id: 'item8', caption: 'Add', hint: 'register a service of your own'},
			{type: 'break', id: 'break0'},
			{type: 'button', id: 'item7', caption: 'Logs', hint: 'toggle logs panel for current service'},
			{type: 'break', id: 'break2'},
			{
				type: 'html', id: 'item2',
				html: function (item) {
					var html =
						'<span>Built with &hearts; for PR&trade; associates</span>';
					return html;
				}
			},
			{type: 'spacer'},
			{type: 'button', id: 'item3', caption: 'Report Bug'},
			{type: 'break', id: 'break1'},
			{type: 'button', id: 'item6', caption: 'Preferences', hint: 'toggle preferences panel'},
		],
		onClick: function (event) {

			switch (event.target) {
				case 'item3':
					var filename = '/Users/kumar/gandalf_app_capture_' + Date.now() + '.png';
					bug(
						{
							filename: filename,
							delay: '1'
						},
						function (data) {
							alert('Screenshot Saved to  file: ' + filename);
						}
					);
					break;
				case 'item7':
					w2ui['layout' + w2ui['tabs'].active].toggle('preview');
					break;
				case 'item6':
					w2ui['layout-home'].toggle('right');
					break;
			}
		}
	};