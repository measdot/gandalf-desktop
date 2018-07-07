
// With ES5
var JiraApi = require('jira-client');

// Initialize
var jira = new JiraApi({
	protocol: 'https',
	host: 'pipingrock.atlassian.net',
	username: 'kgaurav@pipingrock.com',
	password: 'Pipin#123',
	apiVersion: '2'
});
jira.findIssue("ECI-38")
	.then(function(issue) {
		w2ui['layoutdashboard'].content('main', '<div><p>Jira Issue Number: '+issue.key+'</p><p>Jira Issue Summary: '+issue.fields.summary+'</p><p>Jira Issue Status: '+issue.fields.status.name+'</p></div>');
		console.log(issue);
	})
	.catch(function(err) {
		console.error(err);
	});