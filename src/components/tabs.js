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
			w2ui['tabs'].remove(event.target);
			w2ui['layout'+event.target].destroy();
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
		id:"dashboard",caption:"Dashboard",closable:false, content:{action:'Dashboard action form',logs:'Dashboard log window'}
	}
};
const serviceTemplate = pug.compileFile("src/templates/service.pug");


module.exports = {

	init: function(){
		$('#tabs').w2tabs(config.tabs);
		module.exports.add(config.dashboard);
	},

	select: function(tabId) {
		w2ui[config.tabs.name].select(tabId);
		console.log($('#tab'+tabId));
		tabby.toggleTab( '#tab'+tabId );
	},

	add: function (newTab) {

		// add new tab to tab strip
		w2ui[config.tabs.name].add(newTab);

		// add new tab content panel
		$('[data-tabs-content]').append(serviceTemplate(newTab));

		/**
		 * by initializing we get to  programmatically toggle the single tab contents in tabs content panel
		 * by method toggleTab(tabId)
		 * This would link the w2ui tabs to their corresponding tabs content
		 */
		tabby.init();

		//select the newly added tab
		module.exports.select(newTab.id);

		// initialize the action and logs panels for the tab
		config.layout.name = 'layout' + newTab.id;
		$('#'+config.layout.name).w2layout(config.layout);

		// put the tab action panel contents
		w2ui[config.layout.name].content('main', newTab.content.action)
		w2ui[config.layout.name].content('preview', newTab.content.logs)

	},

	tabExists: function (tabId) {
		if ( config.tabs.name in w2ui){
			return w2ui[config.tabs.name].get(tabId);
		}
		return false;
	},

	closeTab: function (tabId) {
		w2ui[config.tabs.name].remove(tabId);
	}
};