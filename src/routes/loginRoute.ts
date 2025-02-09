import type { FastifyInstance } from 'fastify'
import { userAuthenticator as UserAuthMiddleware } from '../middlewares/AuthUser'

const userAuthenticator = new UserAuthMiddleware()

export async function loginRoutes(app: FastifyInstance) {
	app.post('/login', userAuthenticator.authenticate)
}
