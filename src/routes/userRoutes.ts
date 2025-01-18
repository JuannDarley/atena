import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function usersRoutes(app: FastifyInstance) {
	app.get('/users', async () => {
		const users = await prisma.user.findMany()

		return users.map((users) => {
			return {
				id: users.id,
				name: users.name,
				position: users.position,
			}
		})
	})

	app.get('/users/:id', async (request) => {
		const paramsSchema = z.object({
			id: z.string().uuid(),
		})

		const { id } = paramsSchema.parse(request.params)

		const users = await prisma.user.findUniqueOrThrow({
			where: {
				id,
			},
		})

		return users
	})
}
