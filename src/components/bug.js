module.exports = screenshot

function screenshot (opt, cb) {
	cb = cb || function () {}
	var remote
	try {
		remote = require('' + 'electron').remote
	} catch (e) {
		remote = require('' + 'remote')
	}
	setTimeout(function () {
		remote.getCurrentWindow().capturePage(function handleCapture (img) {
			remote.require('fs').writeFile(opt.filename, img.toPNG(), cb)
		})
	}, opt.delay)
}

document.getElementById("bug").addEventListener("click", function(){
	var filename = '/Users/kumar/gandalf_app_capture_'+Date.now()+'.png';
	screenshot(
		{
			filename:filename,
			delay:'1'
		},
		function(data){
			alert('Screenshot Saved to  file: '+ filename);
		}
	);
},false);



//on click of bugs
// open a popup containing a report bug confirmation form with following inputs
// the screen shot attached
// the logs file attached
// a text area for issues.
// send as anonymous not checked