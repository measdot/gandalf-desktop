$(function () {
	var config = {
		tabs: {
			name: 'tabs',
			active: 'tab0',
			tabs: [
				{id: 'tab0', caption: 'Dashboard' }
				],
			onClick: function (event) {
				console.log(this);
				// w2ui.layout.html('main', 'Active tab: '+ sel_record.recid);
				},
			onClose: function (event) {
				this.click('tab0');
			}
		}
	}

	$(function () {
		$('#tabs').w2tabs(config.tabs);
	});
});