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

	app.post('/users', async (request) => {
		const bodySchema = z.object({
			name: z.string(),
			login: z.string(),
			senha: z.string(),
			email: z.string(),
			position: z.string().toUpperCase(),
		})

		const { name, login, senha, email, position } = bodySchema.parse(
			request.body,
		)

		const user = await prisma.user.create({
			data: {
				name,
				login,
				senha,
				email,
				position,
			},
		})

		return user
	})
	app.put('/users/:id', async (request) => {
		const paramsSchema = z.object({
			id: z.string().uuid(),
		})

		const { id } = paramsSchema.parse(request.params)

		const bodySchema = z.object({
			name: z.string(),
			login: z.string(),
			senha: z.string(),
			email: z.string(),
			position: z.string().toUpperCase(),
		})

		const { name, login, senha, email, position } = bodySchema.parse(
			request.body,
		)

		const user = await prisma.user.update({
			where: {
				id,
			},
			data: {
				name,
				login,
				senha,
				email,
				position,
			},
		})

		return user
	})
	app.delete('/users/:id', async (request) => {
		const paramsSchema = z.object({
			id: z.string().uuid(),
		})

		const { id } = paramsSchema.parse(request.params)

		await prisma.user.delete({
			where: {
				id,
			},
		})
	})
}
