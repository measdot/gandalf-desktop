
const BitBucket = require('bitbucket')

const bitbucket = new BitBucket()

bitbucket.authenticate({
	type: 'basic',
	username: 'pr-kgaurav',
	password: 'Pipin#123'
})

bitbucket.repositories
	.list({ username: 'pr-kgaurav' })
	.then(({ data, headers }) => console.log(data))
	.catch(err => console.error(err))