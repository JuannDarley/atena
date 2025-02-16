import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

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
		const envSchema = z.object({
			SECRET_KEYS_ONE: z.string().default('teste'),
			SECRET_KEYS_TWO: z.string().default('teste'),
		})

		const parsedEnv = envSchema.safeParse(process.env)

		if (!parsedEnv.success) {
			console.error('Invalid environment variables:', parsedEnv.error.errors)
			return reply
				.status(401)
				.send({ error: 'Environment variables not defined' })
		}
		let secretKeys: string = 'teste'
		if (user.position === 'SUPERIOR') {
			secretKeys = parsedEnv.data.SECRET_KEYS_ONE
		}

		if (user.position === 'TECNICOJR') {
			secretKeys = parsedEnv.data.SECRET_KEYS_TWO
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
