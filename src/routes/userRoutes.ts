import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import bcrypt from 'bcrypt'
import { AuthMiddlewares } from '../middlewares/auth'
import { sign } from 'jsonwebtoken'

export async function usersRoutes(app: FastifyInstance) {
	app.get(
		'/users',
		{
			preHandler: [AuthMiddlewares],
		},
		async () => {
			console.log('passou')

			const users = await prisma.user.findMany()

			return users.map((users) => {
				return {
					id: users.id,
					name: users.name,
					position: users.position,
				}
			})
		},
	)

	app.get(
		'/users/:id',
		{
			preHandler: [AuthMiddlewares],
		},
		async (request) => {
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
		},
	)

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

		const hashPassword = await bcrypt.hash(senha, 8)

		const user = await prisma.user.create({
			data: {
				name,
				login,
				senha: hashPassword,
				email,
				position,
			},
		})
		const token = sign({ id: user.id }, 'secret', { expiresIn: '1d' })
		await prisma.user.update({
			where: {
				id: user.id,
			},
			data: {
				token,
			},
		})
		return { name, login, senha, email, position }
	})
	app.put(
		'/users/:id',
		{
			preHandler: [AuthMiddlewares],
		},
		async (request) => {
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
			const hashPassword = await bcrypt.hash(senha, 8)
			const user = await prisma.user.update({
				where: {
					id,
				},
				data: {
					name,
					login,
					senha: hashPassword,
					email,
					position,
				},
			})

			return user
		},
	)
	app.delete(
		'/users/:id',
		{
			preHandler: [AuthMiddlewares],
		},
		async (request) => {
			const paramsSchema = z.object({
				id: z.string().uuid(),
			})

			const { id } = paramsSchema.parse(request.params)

			await prisma.user.delete({
				where: {
					id,
				},
			})
		},
	)
}
