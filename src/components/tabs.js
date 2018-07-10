const tabby = require("Tabby") ;
const pug = require('pug');
const home = require("./home");

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
			{ type: 'main', size: '300', resizable: true, minSize: 200},
			{ type: 'preview', size: '150', resizable: true,minSize: 50,hidden:true,
				// style:'background-color: #363F5D;',
				title:'Logs'}
		]
	},
	dashboard:{
		id:"dashboard",caption:"Dashboard",closable:false,content:{action:'Dashboard action form',logs:''}
	}
};
const serviceTemplate = pug.compileFile('src/templates/tab.pug');


module.exports = {

	init: function(){
		$('#'+config.tabs.name).w2tabs(config.tabs);
		module.exports.add(config.dashboard);
	},

	select: function(tabId, isClicked=false) {
		/***
		 * this is our go to method for selecting a tab
		 * this gets called even when we click on the tab
		 * to avoid circular calling between events  onclick -> selctTab -> onclick -> ...
		 * the isClicked param is introduced
		 */
		if(isClicked){
			w2ui[config.tabs.name].select(tabId);
		}else {
			w2ui[config.tabs.name].click(tabId);
		}
		w2ui[home.config.name].resize();
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