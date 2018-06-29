import tabby from "Tabby";
const pug = require('pug');


let pStyle = 'border: 1px solid #dfdfdf; padding: 5px;';

const config = {
	tabs: {
		name: 'tabs',
		active: 'dashboard',
		onClick: function (event) {
			module.exports.select(event.target);
		},
		onClose: function (event) {
			$('#tab'+event.target).remove();
			module.exports.select('dashboard');
		}
	},
	layout:{
		padding: 2,
		panels: [
			{ type: 'main', size: '300', resizable: true, minSize: 200, style: pStyle, title:'Action' },
			{ type: 'preview', size: '150', resizable: true,minSize: 50,style: pStyle, title:'Logs', hidden:true }
		]
	},
	dashboard:{
		id:"dashboard",caption:"Dashboard",closable:false,
	}
};
// Compile the source code
const serviceTemplate = pug.compileFile('src/templates/service.pug');
module.exports = {
	init: function(){
		$('#tabs').w2tabs(config.tabs);
		module.exports.add(config.dashboard);
	},
	select: function(tabId) {
		w2ui[config.tabs.name].select(tabId);
		tabby.toggleTab( '#tab'+tabId );
	},
	add: function (newTab) {

		const closable = (typeof newTab.closable !== 'undefined') ? newTab.closable : true;
		let tabContent = (typeof newTab.content !== 'undefined') ? newTab.content : false;

		// add new tab to tab strip
		w2ui[config.tabs.name].add({id: newTab.id, caption: newTab.caption, closable: closable});

		// add new tab content panel
		$('[data-tabs-content]').append(serviceTemplate(newTab));

		//select the newly added tab
		module.exports.select(newTab.id);

		// initialize the action and logs panels for the tab
		config.layout.name= 'layout'+newTab.id;
		$('#'+config.layout.name).w2layout(config.layout);

		tabby.init();
	},
	tabExists: function (tabId) {
		if ( config.tabs.name in w2ui){
			return w2ui[config.tabs.name].get(tabId);
		}
		return false;
	},
	closeTab: function (tabIds) {
		w2ui[config.tabs.name].remove(tabIds);
	}
};