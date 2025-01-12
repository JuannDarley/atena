import type { FastifyInstance } from 'fastify'

export async function equipamentRoutes(app: FastifyInstance) {
	app.get('/equipament', () => {
		return 'Ola mundo!'
	})
}
