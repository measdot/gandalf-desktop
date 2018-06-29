const tabs = require("./tabs");


const config ={
	grid:{
		name: 'grid',
		show: {
			footer        : true,
			lineNumbers    : true,
			toolbar:true
		},
		sortData: [ { field: 'service', direction: 'asc' } ],
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
			const grid = this;

			event.onComplete = function() {

				const sel_rec_ids = grid.getSelection();
				if (sel_rec_ids.length) {

					const sel_record = grid.get(sel_rec_ids[0]);
					if (tabs.tabExists(sel_record.recid)) {
						tabs.select(
							sel_record.recid
						);
					} else {
						tabs.add({
							id:sel_record.recid,
							caption:sel_record.service,
							closable:true
						});
					}

				} else {
					console.log("Nothing selected!");
				}

			}
		}
	}
};

module.exports = {
	init: function () {
		// tabs.init();
		return $().w2grid(config.grid);
	}
}