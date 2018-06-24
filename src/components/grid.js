$(function () {
	$('#grid').w2grid({
		name: 'grid',
		show: {
			footer        : true,
			// lineNumbers    : true,
		},
		sortData: [ { field: 'lname', direction: 'asc' } ],
		columns: [
			{ field: 'service', caption: 'Services tagged #prt-works, double click on any to open', size: '30%', sortable: true },
		],
		records: [
			{ recid: 1, service: 'Create a merge request'},
			{ recid: 2, service: 'Create a sprint ticket'},
			{ recid: 3, service: 'Create a migration'},
			{ recid: 4, service: 'Create a hotfix ticket'},
		],
		onDblClick: function(event) {
			var grid = this;
			event.onComplete = function() {
				var sel_rec_ids = grid.getSelection();

				if (sel_rec_ids.length) {
					var sel_record = grid.get(sel_rec_ids[0]);
					var tabs = w2ui.tabs;

					if (tabs.get(sel_record.recid)) {
						tabs.select(sel_record.recid);
					} else {
						tabs.add(
							{ id: 'tab' + sel_record.recid, caption: sel_record.service, closable: true });
						tabs.select(sel_record.recid);
					}

				} else {
					console.log("Nothing selected!");
				}
			}
		}
	});
});