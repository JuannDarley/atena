import bcrypt from 'bcrypt'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { sign } from 'jsonwebtoken'
import { z } from 'zod'
import { env } from '../env'
import { prisma } from '../lib/prisma'

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
		let secretKeys: string = ''

		if (user.position === 'SUPERIOR') {
			secretKeys = env.SECRET_KEYS_ONE
		}

		if (user.position === 'TECNICOJR') {
			secretKeys = env.SECRET_KEYS_TWO
		}
		console.log(secretKeys)

		const verifyPassword = await bcrypt.compare(senha, user.senha)

		if (!verifyPassword) {
			return reply.status(401).send({ error: '⚠ Senha inválidos! ❌' })
		}
		const token = sign({ id: user.id }, secretKeys, { expiresIn: '1d' })

		return reply.status(201).send({ message: 'Login Bem-Sucedido ✔', token })
	}
}
