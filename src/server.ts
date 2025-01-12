import { app } from './app'
//import { config } from 'dotenv'
app
	.listen({
		port: 3333,
	})
	.then(() => {
		console.log('⚓🚀HTTP Server Running!🚀⚓')
	})
