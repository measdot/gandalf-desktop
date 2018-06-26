import tabby from "Tabby";

/**
 *
 * @param newTab
 */
function addTab(newTab) {

	const closable = (typeof newTab.closable !== 'undefined') ? newTab.closable : true;
	var tabContent = (typeof newTab.content !== 'undefined') ? newTab.content : false;

	// add new tab to tab strip
	instance.add({id: newTab.id, caption: newTab.caption, closable: closable});

	// add new tab content panel
	if(! tabContent){
		tabContent = '<div data-tabs-pane class="tabs-pane" id="tab'+ newTab.id +'" >'+ newTab.caption +'</div>';
	}
	$('[data-tabs-content]').append(tabContent);

	//select the newly added tab
	selectTab(newTab.id);

	tabby.init();
}

/**
 *
 * @param tabId
 */
function selectTab(tabId) {
	instance.select(tabId);
	tabby.toggleTab( '#tab'+tabId );
}


/**
 *
 * @type {{name: string, active: string, onClick: config.onClick, onClose: config.onClose}}
 */
const config = {
	name: 'tabs',
	active: 'dashboard',
	onClick: function (event) {
		tabby.toggleTab("#tab"+event.target);
	},
	onClose: function (event) {
		$('#tab'+event.target).remove();
		selectTab("dash");
	}
};

/**
 *
 * @type {jQuery}
 */
const instance = $('#tabs').w2tabs(config);
addTab({id:"dash",caption:"Dashboard",closable:false,
	// content:' <p>Testing screenshots in Electron :3</p>\n' +
	// '        <img id="my-preview"/>\n' +
	// '        <input id="trigger" value="Fullscreen screenshot" type="button"/>\n'
});

/**
 *
 * @type {{select: selectTab, add: addTab, tabExists: (function(*=): *)}}
 */
module.exports = {
	select: selectTab,
	add: addTab,
	tabExists: function (tabId) {
		return instance.get(tabId);
	},
	closeTab: function (tabIds) {
		instance.remove(tabIds);
	}
};