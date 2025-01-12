import type { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

export async function equipamentRoutes(app: FastifyInstance) {
	app.get('/equipament', async () => {
		const equipaments = await prisma.equipament.findMany()

		return equipaments.map((equipamet) => {
			return {
				id: equipamet.id,
				series: equipamet.series,
			}
		})
	})
}
