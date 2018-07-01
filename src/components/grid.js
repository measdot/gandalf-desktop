const tabs = require("./tabs");
const serviceList = require('./services.json')


const config ={
	grid:{
		name: 'grid',
		show: {
			footer : true,
			// toolbar: true
		},
		sortData: [ { field: 'service', direction: 'asc' } ],
		columns: [
			{ field: 'service', caption: 'Services ', size: '30%', sortable: true },
		],
		onDblClick: function(event) {
			const grid = this;

			event.onComplete = function(event) {
				if(! isNaN(event.recid)) {
					const sel_rec_ids = grid.getSelection();
					if (sel_rec_ids.length) {

						const sel_record = grid.get(sel_rec_ids[0]);
						if (tabs.tabExists(sel_record.recid)) {
							tabs.select(
								sel_record.recid
							);
						} else {
							tabs.add({
								id: sel_record.recid,
								caption: sel_record.service,
								closable: true,
								content: {
									action: sel_record.service + ' action form',
									logs: sel_record.service + ' log window'
								},
							});
						}

					} else {
						console.log("Nothing selected!");
					}
				}
			}
		}
	}
};
$().w2grid(config.grid);
w2ui['grid'].add(serviceList);
module.exports =  w2ui['grid'];