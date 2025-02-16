import type { FastifyReply, FastifyRequest } from 'fastify'
import { verify } from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

type TokenPayload = {
	id: string
	iat: number
	exp: number
}

export async function AuthMiddlewaresAdm(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { authorization } = request.headers

	if (!authorization) {
		return reply.status(401).send({ error: '⚠ usuário não autorizado ❌' })
	}

	const [, token] = authorization.split(' ')

	let secretKeys: string = process.env.SECRET_KEYS_ONE || 'teste'

	try {
		const decoded = verify(token, secretKeys) as TokenPayload
		const { id } = decoded
		request.userId = id
	} catch (error) {
		console.error('Erro de autenticação:', error)
		return reply.status(401).send({ error: '⚠ token não autorizado ❌' })
	}
}
