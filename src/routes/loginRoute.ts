import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function loginRoutes(app: FastifyInstance) {
	app.post('/login', async (request, reply) => {
		const bodySchema = z.object({
			login: z.string(),
			senha: z.string(),
		})
		const { login, senha } = bodySchema.parse(request.body)
		const user = await prisma.user.findFirst({
			where: {
				login,
				senha,
			},
		})

		if (!user) {
			return reply
				.status(401)
				.send({ error: '⚠ Login ou senha inválidos! ❌' })
		}
		const token = user.token
		return reply.status(201).send({ message: 'Login Bem-Sucedido ✔', token })
	})
}
