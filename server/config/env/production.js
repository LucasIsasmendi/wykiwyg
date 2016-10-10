export default {
	env: 'development',
	fb:{
		clientID: 'Your-Facebook-Client-Id',
		clientSecret: 'Your-Facebook-Client-Secret',
		callback: 'callback-URL like domain/auth/facebook/callback'
	},
	mongo:{
		uri: process.env.MONGO_URI || 'localhost',
		port: process.env.MONGO_PORT || 2701,
		db: process.env.MONGO_DB || 'wykiwyg'
	}
	tokensecret: process.env.TOKEN_SECRET || 'Your-Secret'
}