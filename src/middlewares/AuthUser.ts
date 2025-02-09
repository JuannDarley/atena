import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken'

export class userAuthenticator {
	authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
		const bodySchema = z.object({
			login: z.string(),
			senha: z.string(),
		})
		const { login, senha } = bodySchema.parse(request.body)
		const user = await prisma.user.findUnique({
			where: {
				login,
			},
		})

		if (!user) {
			return reply.status(401).send({ error: '⚠ Usuário inválido ❌' })
		}

		const verifyPassword = await bcrypt.compare(senha, user.senha)

		if (!verifyPassword) {
			return reply.status(401).send({ error: '⚠ Senha inválidos! ❌' })
		}
		const token = sign({ id: user.id }, 'secret', { expiresIn: '1d' })

		const id = user.id
		await prisma.user.update({
			where: {
				id,
			},
			data: {
				token,
			},
		})

		return reply.status(201).send({ message: 'Login Bem-Sucedido ✔', token })
	}
}
