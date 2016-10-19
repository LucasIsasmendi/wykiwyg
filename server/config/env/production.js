export default {
	env: 'production',
	fb:{
		clientID: process.env.FBID ||  'Your-Facebook-Client-Id',
		clientSecret: process.env.FBSECRET || 'Your-Facebook-Client-Secret',
		callback: process.env.FBCBURL || 'callback-URL' // example: domain/auth/facebook/callback
	},
	mongo:{
		uri: process.env.MONGO_URI || 'url-database-cloud',
		port: process.env.MONGO_PORT || 2701, // port number
		db: process.env.MONGO_DB || 'wykiwyg' // database name
	},
	tokensecret: process.env.TOKEN_SECRET || 'Your-Secret',
	paths: {
		views:'../public/releases/production/www',
		favicon:'../public/releases/production/www/favicon.png',
		static:'../public/releases/production'
	},
	port: process.env.PORT || 3301,
	sslport: process.env.SSLPORT || 4301
}