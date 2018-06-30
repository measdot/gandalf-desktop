import tabby from "Tabby";
const pug = require('pug');


let pStyle = 'border: 1px solid #dfdfdf; padding: 5px;';
const config = {
	tabs: {
		name: 'tabs',
		active: 'dashboard',
		onClick: function (event) {
			module.exports.select(event.target,true);
		},
		onClose: function (event) {
			module.exports.closeTab(event.target);
		}
	},
	layout:{
		padding: 2,
		panels: [
			{ type: 'main', size: '300', resizable: true, minSize: 200, style: pStyle, title:'Action' },
			{ type: 'preview', size: '150', resizable: true,minSize: 50,style: pStyle, title:'Logs', hidden:false }
		]
	},
	dashboard:{
		id:"dashboard",caption:"Dashboard",closable:false, content:{action:'Dashboard action form',logs:'Dashboard log window'}
	}
};
const serviceTemplate = pug.compileFile('src/templates/service.pug');


module.exports = {

	init: function(){
		$('#tabs').w2tabs(config.tabs);
		module.exports.add(config.dashboard);
	},

	select: function(tabId, isClicked=false) {
		/***
		 * this is our go to method for making selecting a tab
		 * this gets called even when we click on the tab
		 * to avoid circular calling between events  onclick -> selctTab -> onclick -> ...
		 * the isClicked param is introduced
		 */
		if(isClicked){
			w2ui[config.tabs.name].select(tabId);
		}else {
			w2ui[config.tabs.name].click(tabId);
		}
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
		w2ui['tabs'].remove(tabId);
		let prevTabId = ($('#tab'+tabId).prev().attr('id')).replace('tab','');
		module.exports.select(prevTabId);
	}
};