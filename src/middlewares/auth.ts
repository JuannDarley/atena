import type { FastifyReply, FastifyRequest } from 'fastify'
import { verify } from 'jsonwebtoken'

type TokenPayload = {
	id: string
	iat: number
	exp: number
}

export async function AuthMiddlewares(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { authorization } = request.headers

	if (!authorization) {
		return reply.status(401).send({ error: '⚠ usuário não autorizado ❌' })
	}

	const [, token] = authorization.split(' ')

	try {
		const decoded = verify(token, 'secret') as TokenPayload
		const { id } = decoded
		request.userId = id
	} catch (error) {
		console.error('Erro de autenticação:', error)
		return reply.status(401).send({ error: '⚠ token não autorizado ❌' })
	}
}
