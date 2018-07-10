const pug = require('pug');

const grid = require('./grid')
const mainToolbar = require('./toolbar')
const dashboard = require('./tabs')
const preferences = require('./preferences')

const tabsTemplate = pug.compileFile('src/templates/tabs.pug');
const preferencesTemplate = pug.compileFile('src/templates/preferences.pug');
var mainLayoutStyle = '';
export const config = {
	name: 'layout-home',
	panels: [
		{ type: 'left', size: 250, minSize:250, style:mainLayoutStyle,
			resizable: true},
		{ type: 'main', content: tabsTemplate(), style:mainLayoutStyle
			,resizable: true
		},
		{ type: 'right', size: 250, minSize:250, style:mainLayoutStyle, hidden:true,
			resizable: true,
			title:'Preferences',
			content:preferencesTemplate()
		},
		{ type: 'bottom', size: 35,
			resizable: false,
			toolbar: mainToolbar
		}
	]
};

//init app layout
$('#'+config.name).w2layout(config);

//init toolbar tools
$('#search-service').w2field('text');

// init left panel content
w2ui[config.name].content('left', grid);

// init main panel content
dashboard.init();

// init right panel content
preferences.init();
