export default {
	env: 'development',
	fb:{
		clientID: process.env.FBID ||  'Your-Facebook-Client-Id',
		clientSecret: process.env.FBSECRET || 'Your-Facebook-Client-Secret',
		callback: process.env.FBCBURL || 'http://localhost:3000/auth/facebook/callback'
	},
	mongo:{
		uri: process.env.MONGO_URI || 'localhost',
		port: process.env.MONGO_PORT || 2701,
		db: process.env.MONGO_DB || 'wykiwyg'
	},
	tokensecret: process.env.TOKEN_SECRET || 'Your-Secret',
	paths: {
		views:'../client/www',
		favicon:'../client/www/favicon.ico',
		static:'../client'
	},
	port: process.env.PORT || 3301,
	sslport: process.env.SSLPORT || 4301
}